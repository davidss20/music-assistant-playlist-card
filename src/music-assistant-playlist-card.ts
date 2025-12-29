/**
 * Music Assistant Playlist Card
 * A custom Home Assistant card for displaying Music Assistant playlists
 * with speaker selection and playback functionality.
 */

import { LitElement, html, TemplateResult, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './styles';
import { localize, setLanguage, isRTL, getLanguage } from './localize/localize';
import type {
  HomeAssistant,
  MusicAssistantPlaylistCardConfig,
  MusicAssistantPlaylist,
  TabId,
  MediaPlayerState,
  SortOption,
  ViewMode,
  SearchMediaType,
  MusicAssistantSearchResult,
} from './types';
import { TABS } from './types';

// Card information for HACS
const CARD_VERSION = '1.2.2';

// Log card info on load
console.info(
  `%c MUSIC-ASSISTANT-PLAYLIST-CARD %c v${CARD_VERSION} `,
  'color: white; background: #7c3aed; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;',
  'color: #7c3aed; background: #e9d5ff; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0;'
);

@customElement('music-assistant-playlist-card')
export class MusicAssistantPlaylistCard extends LitElement {
  // Home Assistant instance
  @property({ attribute: false }) public hass!: HomeAssistant;

  // Card configuration
  @state() private _config!: MusicAssistantPlaylistCardConfig;

  // Playlists data
  @state() private _playlists: MusicAssistantPlaylist[] = [];

  // Loading state
  @state() private _loading = true;

  // Error state
  @state() private _error: string | null = null;

  // Selected speaker
  @state() private _selectedSpeaker: string = '';

  // Active tab - default to now-playing
  @state() private _activeTab: TabId = 'now-playing';

  // Current language (for triggering re-render)
  @state() private _currentLanguage = 'en';

  // Playlist filtering and display
  @state() private _searchQuery = '';
  @state() private _showFavoritesOnly = false;
  @state() private _sortOption: SortOption = 'name';
  @state() private _viewMode: ViewMode = 'grid';
  @state() private _showSortMenu = false;

  // Global search state
  @state() private _globalSearchQuery = '';
  @state() private _searchResults: MusicAssistantSearchResult[] = [];
  @state() private _searchLoading = false;
  @state() private _searchMediaType: SearchMediaType = 'track';

  // Apply styles
  static styles = cardStyles;

  /**
   * Set card configuration
   */
  public setConfig(config: MusicAssistantPlaylistCardConfig): void {
    this._config = {
      limit: 50,
      columns: 'auto',
      ...config,
    };

    // Set default selected speaker
    if (!this._selectedSpeaker && this._config.speakers && this._config.speakers.length > 0) {
      this._selectedSpeaker = this._config.speakers[0];
    }
  }

  /**
   * Get card configuration for editor
   */
  public getCardConfig(): MusicAssistantPlaylistCardConfig {
    return this._config;
  }

  /**
   * Card size for grid - returns a larger default size
   */
  public getCardSize(): number {
    return 8;
  }

  /**
   * Get layout options - allows the card to be resized
   */
  public getLayoutOptions() {
    return {
      grid_rows: 8,
      grid_min_rows: 3,
      grid_columns: 4,
      grid_min_columns: 2,
    };
  }

  /**
   * Get editor element
   */
  public static getConfigElement(): HTMLElement {
    return document.createElement('music-assistant-playlist-card-editor');
  }

  /**
   * Get stub config for new cards
   */
  public static getStubConfig(): Partial<MusicAssistantPlaylistCardConfig> {
    return {
      config_entry_id: '',
      speakers: [],
      limit: 50,
    };
  }

  /**
   * Called when properties change
   */
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass) {
      // Update language based on HA settings
      const configLang = this._config?.language;
      if (configLang && configLang !== 'auto') {
        setLanguage(configLang);
      } else {
        setLanguage(this.hass.language);
      }

      // Update internal language state to trigger re-render
      const newLang = getLanguage();
      if (this._currentLanguage !== newLang) {
        this._currentLanguage = newLang;
      }

      // Update RTL direction
      this._updateDirection();

      // Load playlists if config is ready
      if (this._config && changedProps.get('hass') === undefined) {
        this._loadPlaylists();
      }
    }
  }

  /**
   * Update text direction based on language
   */
  private _updateDirection(): void {
    if (isRTL()) {
      this.setAttribute('dir', 'rtl');
    } else {
      this.setAttribute('dir', 'ltr');
    }
  }

  /**
   * Load playlists from Music Assistant
   */
  private async _loadPlaylists(): Promise<void> {
    if (!this.hass || !this._config?.config_entry_id) return;

    this._loading = true;
    this._error = null;

    try {
      // Use the call_service WebSocket API with return_response
      // Response format: { response: { playlists: [...] } } where playlists key is media_type + 's'
      const response = await this.hass.callWS<{ 
        response: { 
          playlists?: MusicAssistantPlaylist[];
          items?: MusicAssistantPlaylist[];
        } 
      }>({
        type: 'call_service',
        domain: 'music_assistant',
        service: 'get_library',
        service_data: {
          config_entry_id: this._config.config_entry_id,
          media_type: 'playlist',
          // Don't pass favorite parameter - it filters results!
          // favorite: false means "only non-favorites"
          // favorite: true means "only favorites"  
          // No parameter = all playlists
          limit: 1000,
          offset: 0,
          order_by: 'name',
        },
        return_response: true,
      });

      console.info('[music-assistant-playlist-card] Raw response:', response);
      console.info('[music-assistant-playlist-card] Response keys:', response?.response ? Object.keys(response.response) : 'no response');
      
      // Log full response structure for debugging
      if (response?.response) {
        for (const [key, value] of Object.entries(response.response)) {
          if (Array.isArray(value)) {
            console.info(`[music-assistant-playlist-card] Key "${key}" has ${value.length} items`);
          } else {
            console.info(`[music-assistant-playlist-card] Key "${key}":`, value);
          }
        }
      }

      // Extract playlists from response - check both 'playlists' and 'items' keys
      if (response?.response?.playlists) {
        this._playlists = response.response.playlists;
        console.info('[music-assistant-playlist-card] Found in playlists key:', this._playlists.length);
      } else if (response?.response?.items) {
        this._playlists = response.response.items;
        console.info('[music-assistant-playlist-card] Found in items key:', this._playlists.length);
      } else if (response?.response && typeof response.response === 'object') {
        // Try to find any array in the response
        const keys = Object.keys(response.response);
        for (const key of keys) {
          const value = (response.response as Record<string, unknown>)[key];
          if (Array.isArray(value) && value.length > 0) {
            this._playlists = value as MusicAssistantPlaylist[];
            console.info('[music-assistant-playlist-card] Found playlists in key:', key);
            break;
          }
        }
      } else {
        this._playlists = [];
      }
      
      console.info('[music-assistant-playlist-card] Loaded playlists:', this._playlists.length);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to load playlists:', error);
      this._error = localize('error.load_failed');
    } finally {
      this._loading = false;
    }
  }

  /**
   * Play a playlist on the selected speaker
   */
  private async _playPlaylist(playlist: MusicAssistantPlaylist): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) {
      console.warn('[music-assistant-playlist-card] No speaker selected');
      return;
    }

    try {
      // Use uri or item_id for media_id
      const mediaId = playlist.uri || playlist.item_id;
      
      await this.hass.callService('music_assistant', 'play_media', {
        media_id: mediaId,
        media_type: 'playlist',
        enqueue: 'replace',
      }, { entity_id: this._selectedSpeaker });
      
      console.info('[music-assistant-playlist-card] Playing playlist:', playlist.name);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to play playlist:', error);
    }
  }

  /**
   * Handle tab change
   */
  private _handleTabChange(tabId: TabId): void {
    this._activeTab = tabId;
  }

  /**
   * Handle speaker button click (in speakers tab)
   */
  private _handleSpeakerSelect(entityId: string): void {
    this._selectedSpeaker = entityId;
  }

  /**
   * Get media player state for selected speaker
   */
  private _getMediaPlayerState(): MediaPlayerState | null {
    if (!this.hass || !this._selectedSpeaker) return null;
    
    const entity = this.hass.states[this._selectedSpeaker];
    if (!entity) return null;

    return {
      state: entity.state as MediaPlayerState['state'],
      media_title: entity.attributes.media_title as string | undefined,
      media_artist: entity.attributes.media_artist as string | undefined,
      media_album_name: entity.attributes.media_album_name as string | undefined,
      entity_picture: entity.attributes.entity_picture as string | undefined,
      media_duration: entity.attributes.media_duration as number | undefined,
      media_position: entity.attributes.media_position as number | undefined,
      media_position_updated_at: entity.attributes.media_position_updated_at as string | undefined,
      volume_level: entity.attributes.volume_level as number | undefined,
      is_volume_muted: entity.attributes.is_volume_muted as boolean | undefined,
      shuffle: entity.attributes.shuffle as boolean | undefined,
      repeat: entity.attributes.repeat as MediaPlayerState['repeat'] | undefined,
    };
  }

  /**
   * Media player controls
   */
  private async _mediaPlayPause(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    await this.hass.callService('media_player', 'media_play_pause', {}, 
      { entity_id: this._selectedSpeaker });
  }

  private async _mediaNext(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    await this.hass.callService('media_player', 'media_next_track', {}, 
      { entity_id: this._selectedSpeaker });
  }

  private async _mediaPrevious(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    await this.hass.callService('media_player', 'media_previous_track', {}, 
      { entity_id: this._selectedSpeaker });
  }

  private async _toggleShuffle(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    const state = this._getMediaPlayerState();
    await this.hass.callService('media_player', 'shuffle_set', {
      shuffle: !(state?.shuffle ?? false),
    }, { entity_id: this._selectedSpeaker });
  }

  private async _toggleRepeat(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    const state = this._getMediaPlayerState();
    const modes: Array<'off' | 'one' | 'all'> = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(state?.repeat ?? 'off');
    const nextMode = modes[(currentIndex + 1) % modes.length];
    await this.hass.callService('media_player', 'repeat_set', {
      repeat: nextMode,
    }, { entity_id: this._selectedSpeaker });
  }

  private async _setVolume(event: Event): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    const input = event.target as HTMLInputElement;
    const volume = parseFloat(input.value);
    await this.hass.callService('media_player', 'volume_set', {
      volume_level: volume,
    }, { entity_id: this._selectedSpeaker });
  }

  // ==========================================================================
  // Playlist Filtering & Sorting
  // ==========================================================================

  /**
   * Handle search input
   */
  private _handleSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._searchQuery = input.value;
  }

  /**
   * Toggle favorites filter
   */
  private _toggleFavorites(): void {
    this._showFavoritesOnly = !this._showFavoritesOnly;
  }

  /**
   * Set sort option
   */
  private _setSortOption(option: SortOption): void {
    this._sortOption = option;
    this._showSortMenu = false;
  }

  /**
   * Toggle sort menu
   */
  private _toggleSortMenu(): void {
    this._showSortMenu = !this._showSortMenu;
  }

  /**
   * Close sort menu when clicking outside
   */
  private _closeSortMenu(): void {
    this._showSortMenu = false;
  }

  /**
   * Toggle view mode
   */
  private _setViewMode(mode: ViewMode): void {
    this._viewMode = mode;
  }

  /**
   * Get filtered and sorted playlists
   */
  private _getFilteredPlaylists(): MusicAssistantPlaylist[] {
    let playlists = [...this._playlists];

    // Filter by favorites
    if (this._showFavoritesOnly) {
      playlists = playlists.filter(p => p.favorite === true);
    }

    // Filter by search query
    if (this._searchQuery.trim()) {
      const query = this._searchQuery.toLowerCase().trim();
      playlists = playlists.filter(p => 
        p.name.toLowerCase().includes(query)
      );
    }

    // Sort playlists
    switch (this._sortOption) {
      case 'name':
        playlists.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        playlists.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'tracks':
        playlists.sort((a, b) => (b.track_count || 0) - (a.track_count || 0));
        break;
      case 'recent':
        // Keep original order (usually most recent first from API)
        break;
    }

    return playlists;
  }

  /**
   * Get image URL for a playlist
   */
  private _getPlaylistImage(playlist: MusicAssistantPlaylist): string | null {
    // Handle both string and object image formats
    if (!playlist.image) return null;
    
    // If image is a string (direct URL)
    if (typeof playlist.image === 'string') {
      return playlist.image;
    }
    
    // If image is an object with path property
    if (typeof playlist.image === 'object' && playlist.image.path) {
      return playlist.image.path;
    }
    
    return null;
  }

  /**
   * Render loading state
   */
  private _renderLoading(): TemplateResult {
    return html`
      <div class="loading-container">
        <div class="loading-spinner"></div>
        <span class="loading-text">${localize('common.loading')}</span>
      </div>
    `;
  }

  /**
   * Render error state
   */
  private _renderError(): TemplateResult {
    return html`
      <div class="error-container">
        <ha-icon icon="mdi:alert-circle"></ha-icon>
        <span class="error-message">${this._error}</span>
      </div>
    `;
  }

  /**
   * Render empty state
   */
  private _renderEmpty(): TemplateResult {
    return html`
      <div class="empty-container">
        <ha-icon icon="mdi:playlist-music"></ha-icon>
        <span class="empty-message">${localize('common.no_playlists')}</span>
      </div>
    `;
  }

  /**
   * Render no results state (after filtering)
   */
  private _renderNoResults(): TemplateResult {
    return html`
      <div class="empty-container">
        <ha-icon icon="mdi:magnify"></ha-icon>
        <span class="empty-message">${localize('common.no_results')}</span>
      </div>
    `;
  }

  /**
   * Render playlist toolbar
   */
  private _renderPlaylistToolbar(): TemplateResult {
    return html`
      <div class="playlist-toolbar">
        <div class="search-container">
          <ha-icon class="search-icon" icon="mdi:magnify"></ha-icon>
          <input
            type="text"
            class="search-input"
            placeholder="${localize('common.search_playlists')}"
            .value=${this._searchQuery}
            @input=${this._handleSearchInput}
          />
        </div>
        <div class="toolbar-actions">
          <button
            class="filter-button ${this._showFavoritesOnly ? 'active' : ''}"
            @click=${this._toggleFavorites}
            title="${localize('common.favorites')}"
          >
            <ha-icon icon="${this._showFavoritesOnly ? 'mdi:star' : 'mdi:star-outline'}"></ha-icon>
            <span>${this._showFavoritesOnly ? localize('common.favorites') : localize('common.all')}</span>
          </button>
          
          <div class="sort-dropdown">
            <button
              class="filter-button"
              @click=${this._toggleSortMenu}
              title="${localize('common.sort')}"
            >
              <ha-icon icon="mdi:sort"></ha-icon>
              <span>${localize('common.sort')}</span>
            </button>
            ${this._showSortMenu
              ? html`
                  <div class="sort-menu" @mouseleave=${this._closeSortMenu}>
                    <button
                      class="sort-option ${this._sortOption === 'name' ? 'active' : ''}"
                      @click=${() => this._setSortOption('name')}
                    >
                      <ha-icon icon="mdi:sort-alphabetical-ascending"></ha-icon>
                      ${localize('common.sort_name')}
                    </button>
                    <button
                      class="sort-option ${this._sortOption === 'name_desc' ? 'active' : ''}"
                      @click=${() => this._setSortOption('name_desc')}
                    >
                      <ha-icon icon="mdi:sort-alphabetical-descending"></ha-icon>
                      ${localize('common.sort_name_desc')}
                    </button>
                    <button
                      class="sort-option ${this._sortOption === 'tracks' ? 'active' : ''}"
                      @click=${() => this._setSortOption('tracks')}
                    >
                      <ha-icon icon="mdi:music-note-outline"></ha-icon>
                      ${localize('common.sort_tracks')}
                    </button>
                    <button
                      class="sort-option ${this._sortOption === 'recent' ? 'active' : ''}"
                      @click=${() => this._setSortOption('recent')}
                    >
                      <ha-icon icon="mdi:clock-outline"></ha-icon>
                      ${localize('common.sort_recent')}
                    </button>
                  </div>
                `
              : nothing}
          </div>

          <div class="toolbar-spacer"></div>

          <div class="view-toggle">
            <button
              class="view-button ${this._viewMode === 'grid' ? 'active' : ''}"
              @click=${() => this._setViewMode('grid')}
              title="${localize('common.view_grid')}"
            >
              <ha-icon icon="mdi:view-grid"></ha-icon>
            </button>
            <button
              class="view-button ${this._viewMode === 'list' ? 'active' : ''}"
              @click=${() => this._setViewMode('list')}
              title="${localize('common.view_list')}"
            >
              <ha-icon icon="mdi:view-list"></ha-icon>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render tab bar
   */
  private _renderTabBar(): TemplateResult {
    return html`
      <div class="tab-bar">
        ${TABS.map(
          (tab) => html`
            <button
              class="tab-button ${this._activeTab === tab.id ? 'active' : ''}"
              @click=${() => this._handleTabChange(tab.id)}
              title="${tab.label}"
            >
              <ha-icon icon="${tab.icon}"></ha-icon>
              <span class="tab-label">${tab.label}</span>
            </button>
          `
        )}
      </div>
    `;
  }

  /**
   * Format time in mm:ss
   */
  private _formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Render Now Playing view
   */
  private _renderNowPlaying(): TemplateResult {
    const state = this._getMediaPlayerState();
    
    if (!state || !this._selectedSpeaker) {
      return html`
        <div class="now-playing">
          <div class="now-playing-idle">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="now-playing-idle-text">${localize('common.no_speaker_selected')}</span>
          </div>
        </div>
      `;
    }

    const isPlaying = state.state === 'playing';
    const isIdle = state.state === 'idle' || state.state === 'off' || !state.media_title;
    
    if (isIdle) {
      return html`
        <div class="now-playing">
          <div class="now-playing-idle">
            <ha-icon icon="mdi:music-note-off"></ha-icon>
            <span class="now-playing-idle-text">${localize('common.nothing_playing')}</span>
          </div>
        </div>
      `;
    }

    const progress = state.media_duration && state.media_position 
      ? (state.media_position / state.media_duration) * 100 
      : 0;

    return html`
      <div class="now-playing">
        <div class="now-playing-artwork">
          ${state.entity_picture
            ? html`<img src="${state.entity_picture}" alt="Album art" />`
            : html`
                <div class="now-playing-artwork-placeholder">
                  <ha-icon icon="mdi:music"></ha-icon>
                </div>
              `}
        </div>

        <div class="now-playing-info">
          <h3 class="now-playing-title">${state.media_title || 'Unknown'}</h3>
          <p class="now-playing-artist">${state.media_artist || 'Unknown artist'}</p>
        </div>

        ${state.media_duration
          ? html`
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-time">
                  <span>${this._formatTime(state.media_position || 0)}</span>
                  <span>${this._formatTime(state.media_duration)}</span>
                </div>
              </div>
            `
          : nothing}

        <div class="player-controls">
          <button class="control-button" @click=${this._mediaPrevious} title="Previous">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="control-button play-pause" @click=${this._mediaPlayPause} title="${isPlaying ? 'Pause' : 'Play'}">
            <ha-icon icon="${isPlaying ? 'mdi:pause' : 'mdi:play'}"></ha-icon>
          </button>
          <button class="control-button" @click=${this._mediaNext} title="Next">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>

        <div class="secondary-controls">
          <div class="secondary-controls-left">
            <button 
              class="control-button small ${state.shuffle ? 'active' : ''}" 
              @click=${this._toggleShuffle}
              title="Shuffle"
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>
          </div>
          <div class="secondary-controls-right">
            <button 
              class="control-button small ${state.repeat !== 'off' ? 'active' : ''}" 
              @click=${this._toggleRepeat}
              title="Repeat: ${state.repeat || 'off'}"
            >
              <ha-icon icon="${state.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}"></ha-icon>
            </button>
          </div>
        </div>

        <div class="volume-full-width">
          <ha-icon icon="mdi:volume-low"></ha-icon>
          <input
            type="range"
            class="volume-slider-full"
            min="0"
            max="1"
            step="0.01"
            .value=${String(state.volume_level || 0)}
            @change=${this._setVolume}
          />
          <ha-icon icon="mdi:volume-high"></ha-icon>
        </div>
      </div>
    `;
  }

  /**
   * Render Speakers view
   */
  private _renderSpeakers(): TemplateResult {
    return html`
      <div class="speakers-grid">
        ${this._config.speakers.map((speaker) => {
          const entity = this.hass?.states[speaker];
          const isActive = speaker === this._selectedSpeaker;
          const state = entity?.state || 'unavailable';
          const friendlyName = entity?.attributes?.friendly_name || speaker;
          
          return html`
            <button
              class="speaker-button ${isActive ? 'active' : ''}"
              @click=${() => this._handleSpeakerSelect(speaker)}
            >
              <ha-icon icon="mdi:speaker"></ha-icon>
              <div class="speaker-button-info">
                <div class="speaker-button-name">${friendlyName}</div>
                <div class="speaker-button-state">${state}</div>
              </div>
              <ha-icon class="speaker-button-check" icon="mdi:check-circle"></ha-icon>
            </button>
          `;
        })}
      </div>
    `;
  }

  // ==========================================================================
  // Search Functions
  // ==========================================================================

  /**
   * Handle global search input
   */
  private _handleGlobalSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._globalSearchQuery = input.value;
  }

  /**
   * Handle search form submit
   */
  private _handleSearchSubmit(event: Event): void {
    event.preventDefault();
    if (this._globalSearchQuery.trim()) {
      this._performSearch();
    }
  }

  /**
   * Set search media type filter
   */
  private _setSearchMediaType(type: SearchMediaType): void {
    this._searchMediaType = type;
    if (this._globalSearchQuery.trim()) {
      this._performSearch();
    }
  }

  /**
   * Perform search using Music Assistant API
   */
  private async _performSearch(): Promise<void> {
    if (!this.hass || !this._config?.config_entry_id || !this._globalSearchQuery.trim()) {
      return;
    }

    this._searchLoading = true;
    this._searchResults = [];

    try {
      const response = await this.hass.callWS<{
        response: {
          tracks?: MusicAssistantSearchResult[];
          albums?: MusicAssistantSearchResult[];
          artists?: MusicAssistantSearchResult[];
        };
      }>({
        type: 'call_service',
        domain: 'music_assistant',
        service: 'search',
        service_data: {
          config_entry_id: this._config.config_entry_id,
          name: this._globalSearchQuery,
          media_type: [this._searchMediaType],
          library_only: false,
          limit: 25,
        },
        return_response: true,
      });

      console.info('[music-assistant-playlist-card] Search response:', response);

      // Extract results based on media type
      const results = response?.response;
      if (results) {
        if (this._searchMediaType === 'track' && results.tracks) {
          this._searchResults = results.tracks;
        } else if (this._searchMediaType === 'album' && results.albums) {
          this._searchResults = results.albums;
        } else if (this._searchMediaType === 'artist' && results.artists) {
          this._searchResults = results.artists;
        }
      }

      console.info('[music-assistant-playlist-card] Search results:', this._searchResults.length);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Search failed:', error);
      this._searchResults = [];
    } finally {
      this._searchLoading = false;
    }
  }

  /**
   * Play a search result
   */
  private async _playSearchResult(result: MusicAssistantSearchResult): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) {
      console.warn('[music-assistant-playlist-card] No speaker selected');
      return;
    }

    try {
      const mediaId = result.uri || result.item_id;
      
      await this.hass.callService('music_assistant', 'play_media', {
        media_id: mediaId,
        media_type: result.media_type,
        enqueue: 'replace',
      }, { entity_id: this._selectedSpeaker });
      
      console.info('[music-assistant-playlist-card] Playing:', result.name);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to play:', error);
    }
  }

  /**
   * Get image URL for a search result
   */
  private _getSearchResultImage(result: MusicAssistantSearchResult): string | null {
    if (!result.image) return null;
    
    if (typeof result.image === 'string') {
      return result.image;
    }
    
    if (typeof result.image === 'object' && result.image.path) {
      return result.image.path;
    }
    
    return null;
  }

  /**
   * Get artist name from search result
   */
  private _getSearchResultArtist(result: MusicAssistantSearchResult): string | null {
    if (result.artist) return result.artist;
    if (result.artists && result.artists.length > 0) {
      return result.artists.map(a => a.name).join(', ');
    }
    return null;
  }

  /**
   * Render Search view
   */
  private _renderSearch(): TemplateResult {
    return html`
      <div class="search-view">
        <form class="global-search-form" @submit=${this._handleSearchSubmit}>
          <div class="global-search-container">
            <ha-icon class="search-icon" icon="mdi:magnify"></ha-icon>
            <input
              type="text"
              class="global-search-input"
              placeholder="${localize('common.search_placeholder')}"
              .value=${this._globalSearchQuery}
              @input=${this._handleGlobalSearchInput}
            />
            ${this._globalSearchQuery ? html`
              <button 
                type="button" 
                class="search-clear-button"
                @click=${() => { this._globalSearchQuery = ''; this._searchResults = []; }}
              >
                <ha-icon icon="mdi:close"></ha-icon>
              </button>
            ` : nothing}
          </div>
        </form>

        <div class="search-type-filters">
          <button
            class="search-type-button ${this._searchMediaType === 'track' ? 'active' : ''}"
            @click=${() => this._setSearchMediaType('track')}
          >
            <ha-icon icon="mdi:music-note"></ha-icon>
            <span>${localize('common.tracks')}</span>
          </button>
          <button
            class="search-type-button ${this._searchMediaType === 'album' ? 'active' : ''}"
            @click=${() => this._setSearchMediaType('album')}
          >
            <ha-icon icon="mdi:album"></ha-icon>
            <span>${localize('common.albums')}</span>
          </button>
          <button
            class="search-type-button ${this._searchMediaType === 'artist' ? 'active' : ''}"
            @click=${() => this._setSearchMediaType('artist')}
          >
            <ha-icon icon="mdi:account-music"></ha-icon>
            <span>${localize('common.artists')}</span>
          </button>
        </div>

        ${this._searchLoading ? html`
          <div class="loading-container">
            <div class="loading-spinner"></div>
            <span class="loading-text">${localize('common.loading')}</span>
          </div>
        ` : this._searchResults.length > 0 ? html`
          <div class="search-results">
            ${this._searchResults.map(result => {
              const imageUrl = this._getSearchResultImage(result);
              const artist = this._getSearchResultArtist(result);
              
              return html`
                <div 
                  class="search-result-item"
                  @click=${() => this._playSearchResult(result)}
                >
                  <div class="search-result-image">
                    ${imageUrl
                      ? html`<img src="${imageUrl}" alt="${result.name}" />`
                      : html`<ha-icon icon="${this._searchMediaType === 'artist' ? 'mdi:account-music' : this._searchMediaType === 'album' ? 'mdi:album' : 'mdi:music-note'}"></ha-icon>`}
                  </div>
                  <div class="search-result-info">
                    <div class="search-result-title">${result.name}</div>
                    ${artist ? html`<div class="search-result-artist">${artist}</div>` : nothing}
                    ${result.album?.name ? html`<div class="search-result-album">${result.album.name}</div>` : nothing}
                  </div>
                  <button class="search-result-play" title="${localize('common.play')}">
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>
                </div>
              `;
            })}
          </div>
        ` : this._globalSearchQuery && !this._searchLoading ? html`
          <div class="search-empty">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <span>${localize('common.no_results')}</span>
          </div>
        ` : html`
          <div class="search-empty">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            <span>${localize('common.search_hint')}</span>
          </div>
        `}
      </div>
    `;
  }

  /**
   * Render tab content based on active tab
   */
  private _renderTabContent(): TemplateResult {
    switch (this._activeTab) {
      case 'now-playing':
        return this._renderNowPlaying();
      case 'playlists':
        return this._loading
          ? this._renderLoading()
          : this._error
            ? this._renderError()
            : this._renderPlaylistsView();
      case 'search':
        return this._renderSearch();
      case 'speakers':
        return this._renderSpeakers();
      default:
        return html``;
    }
  }

  /**
   * Render playlists view (with toolbar)
   */
  private _renderPlaylistsView(): TemplateResult {
    const filteredPlaylists = this._getFilteredPlaylists();

    return html`
      ${this._renderPlaylistToolbar()}
      ${filteredPlaylists.length === 0 && (this._searchQuery || this._showFavoritesOnly)
        ? this._renderNoResults()
        : filteredPlaylists.length === 0
          ? this._renderEmpty()
          : this._viewMode === 'grid'
            ? this._renderPlaylistGrid(filteredPlaylists)
            : this._renderPlaylistList(filteredPlaylists)}
    `;
  }

  /**
   * Render playlist grid
   */
  private _renderPlaylistGrid(playlists: MusicAssistantPlaylist[]): TemplateResult {
    const columnsClass =
      this._config.columns && this._config.columns !== 'auto'
        ? `columns-${this._config.columns}`
        : '';

    return html`
      <div class="playlist-grid ${columnsClass}">
        ${playlists.map((playlist) => this._renderPlaylistItem(playlist))}
      </div>
    `;
  }

  /**
   * Render playlist list
   */
  private _renderPlaylistList(playlists: MusicAssistantPlaylist[]): TemplateResult {
    return html`
      <div class="playlist-list">
        ${playlists.map((playlist) => this._renderPlaylistItem(playlist))}
      </div>
    `;
  }

  /**
   * Render a single playlist item
   */
  private _renderPlaylistItem(playlist: MusicAssistantPlaylist): TemplateResult {
    const imageUrl = this._getPlaylistImage(playlist);

    return html`
      <div
        class="playlist-item ripple"
        @click=${() => this._playPlaylist(playlist)}
        title="${playlist.name}"
      >
        <div class="playlist-image-container">
          ${imageUrl
            ? html`<img
                class="playlist-image"
                src=${imageUrl}
                alt=${playlist.name}
                loading="lazy"
              />`
            : html`
                <div class="playlist-placeholder">
                  <ha-icon icon="mdi:playlist-music"></ha-icon>
                </div>
              `}
          <div class="play-overlay">
            <button class="play-button" aria-label="${localize('common.play')}">
              <ha-icon icon="mdi:play"></ha-icon>
            </button>
          </div>
        </div>
        <div class="playlist-info">
          <p class="playlist-name">${playlist.name}</p>
          ${playlist.track_count
            ? html`<p class="playlist-meta">${playlist.track_count} ${localize('common.tracks')}</p>`
            : nothing}
        </div>
      </div>
    `;
  }

  /**
   * Check if configuration is valid
   */
  private _isConfigValid(): boolean {
    return !!(
      this._config?.config_entry_id &&
      this._config?.speakers &&
      this._config.speakers.length > 0
    );
  }

  /**
   * Render configuration warning
   */
  private _renderConfigWarning(): TemplateResult {
    const missingConfig = !this._config?.config_entry_id;
    const missingSpeakers = !this._config?.speakers || this._config.speakers.length === 0;

    let message = '';
    if (missingConfig && missingSpeakers) {
      message = localize('error.missing_config');
    } else if (missingSpeakers) {
      message = localize('error.missing_speakers');
    } else if (missingConfig) {
      message = 'Please configure Music Assistant Instance ID';
    }

    return html`
      <div class="config-warning">
        <ha-icon icon="mdi:alert"></ha-icon>
        <span class="config-warning-message">${message}</span>
      </div>
    `;
  }

  /**
   * Render the card
   */
  protected render(): TemplateResult {
    if (!this._config) {
      return html`
        <ha-card>
          <div class="config-warning">
            <ha-icon icon="mdi:alert"></ha-icon>
            <span class="config-warning-message">${localize('error.missing_config')}</span>
          </div>
        </ha-card>
      `;
    }

    const isValid = this._isConfigValid();

    return html`
      <ha-card>
        ${this._config.title
          ? html`
              <div class="card-header">
                <h2 class="card-title">${this._config.title}</h2>
              </div>
            `
          : nothing}
        <div class="tab-content">
          ${!isValid
            ? html`<div class="tab-view">${this._renderConfigWarning()}</div>`
            : html`<div class="tab-view">${this._renderTabContent()}</div>`}
        </div>
        ${this._renderTabBar()}
      </ha-card>
    `;
  }
}

// Import and register the editor
import './editor';

// Register the card with Home Assistant
declare global {
  interface HTMLElementTagNameMap {
    'music-assistant-playlist-card': MusicAssistantPlaylistCard;
  }

  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}

// Register card for picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'music-assistant-playlist-card',
  name: 'Music Assistant Playlist Card',
  description: 'Display Music Assistant playlists with speaker selection',
  preview: true,
  documentationURL: 'https://github.com/davidss20/music-assistant-playlist-card',
});

