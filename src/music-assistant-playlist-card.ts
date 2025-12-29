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
  QueueItem,
  SortOption,
  ViewMode,
} from './types';
import { TABS } from './types';

// Card information for HACS
const CARD_VERSION = '1.1.0';

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

  // Active tab
  @state() private _activeTab: TabId = 'playlists';

  // Queue items
  @state() private _queueItems: QueueItem[] = [];

  // Queue loading state
  @state() private _queueLoading = false;

  // Current queue item index
  @state() private _currentQueueIndex = -1;

  // Current language (for triggering re-render)
  @state() private _currentLanguage = 'en';

  // Playlist filtering and display
  @state() private _searchQuery = '';
  @state() private _showFavoritesOnly = false;
  @state() private _sortOption: SortOption = 'name';
  @state() private _viewMode: ViewMode = 'grid';
  @state() private _showSortMenu = false;

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
          favorite: false, // Always load all playlists, filter in UI
          limit: this._config.limit ?? 50,
          offset: 0,
        },
        return_response: true,
      });

      console.info('[music-assistant-playlist-card] Raw response:', response);

      // Extract playlists from response - check both 'playlists' and 'items' keys
      if (response?.response?.playlists) {
        this._playlists = response.response.playlists;
      } else if (response?.response?.items) {
        this._playlists = response.response.items;
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
    
    // Load queue when switching to queue tab
    if (tabId === 'queue') {
      this._loadQueue();
    }
  }

  /**
   * Load queue from Music Assistant
   */
  private async _loadQueue(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) {
      this._queueItems = [];
      return;
    }

    this._queueLoading = true;

    try {
      // Get the queue for the selected player
      const entity = this.hass.states[this._selectedSpeaker];
      if (!entity) {
        this._queueItems = [];
        return;
      }

      // Try to get queue items from entity attributes
      const queueItems = entity.attributes.queue_items as QueueItem[] | undefined;
      const currentIndex = entity.attributes.queue_position as number | undefined;

      if (queueItems && Array.isArray(queueItems)) {
        this._queueItems = queueItems;
        this._currentQueueIndex = currentIndex ?? -1;
      } else {
        // If no queue in attributes, try Music Assistant API
        try {
          const response = await this.hass.callWS<{
            response: {
              items?: QueueItem[];
              queue_items?: QueueItem[];
              current_index?: number;
            };
          }>({
            type: 'call_service',
            domain: 'music_assistant',
            service: 'get_queue',
            service_data: {
              entity_id: this._selectedSpeaker,
            },
            return_response: true,
          });

          if (response?.response?.items) {
            this._queueItems = response.response.items;
          } else if (response?.response?.queue_items) {
            this._queueItems = response.response.queue_items;
          } else {
            this._queueItems = [];
          }
          this._currentQueueIndex = response?.response?.current_index ?? -1;
        } catch {
          // Music Assistant get_queue might not exist, that's ok
          this._queueItems = [];
        }
      }
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to load queue:', error);
      this._queueItems = [];
    } finally {
      this._queueLoading = false;
    }
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
            <button 
              class="control-button small ${state.repeat !== 'off' ? 'active' : ''}" 
              @click=${this._toggleRepeat}
              title="Repeat: ${state.repeat || 'off'}"
            >
              <ha-icon icon="${state.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}"></ha-icon>
            </button>
          </div>
          <div class="secondary-controls-right">
            <div class="volume-container">
              <ha-icon icon="mdi:volume-high"></ha-icon>
              <input
                type="range"
                class="volume-slider"
                min="0"
                max="1"
                step="0.01"
                .value=${String(state.volume_level || 0)}
                @change=${this._setVolume}
              />
            </div>
          </div>
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

  /**
   * Get image URL for a queue item
   */
  private _getQueueItemImage(item: QueueItem): string | null {
    if (!item.image) return null;
    
    if (typeof item.image === 'string') {
      return item.image;
    }
    
    if (typeof item.image === 'object' && item.image.path) {
      return item.image.path;
    }
    
    return null;
  }

  /**
   * Play a specific queue item
   */
  private async _playQueueItem(index: number): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;
    
    try {
      await this.hass.callService('music_assistant', 'play_index', {
        index: index,
      }, { entity_id: this._selectedSpeaker });
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to play queue item:', error);
    }
  }

  /**
   * Render Queue view
   */
  private _renderQueue(): TemplateResult {
    if (!this._selectedSpeaker) {
      return html`
        <div class="queue-empty">
          <ha-icon icon="mdi:speaker-off"></ha-icon>
          <span>${localize('common.no_speaker_selected')}</span>
        </div>
      `;
    }

    if (this._queueLoading) {
      return html`
        <div class="loading-container">
          <div class="loading-spinner"></div>
          <span class="loading-text">${localize('common.loading')}</span>
        </div>
      `;
    }

    if (this._queueItems.length === 0) {
      return html`
        <div class="queue-empty">
          <ha-icon icon="mdi:playlist-play"></ha-icon>
          <span>${localize('common.queue_empty')}</span>
        </div>
      `;
    }

    return html`
      <div class="queue-list">
        ${this._queueItems.map((item, index) => {
          const imageUrl = this._getQueueItemImage(item);
          const isPlaying = index === this._currentQueueIndex;
          
          return html`
            <div 
              class="queue-item ${isPlaying ? 'playing' : ''}"
              @click=${() => this._playQueueItem(index)}
            >
              <div class="queue-item-image">
                ${imageUrl
                  ? html`<img src="${imageUrl}" alt="${item.name}" />`
                  : html`<ha-icon icon="mdi:music-note"></ha-icon>`}
              </div>
              <div class="queue-item-info">
                <div class="queue-item-title">${item.name}</div>
                ${item.artist
                  ? html`<div class="queue-item-artist">${item.artist}</div>`
                  : nothing}
              </div>
              ${isPlaying
                ? html`<ha-icon class="queue-item-playing-icon" icon="mdi:volume-high"></ha-icon>`
                : nothing}
            </div>
          `;
        })}
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
      case 'queue':
        return this._renderQueue();
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

