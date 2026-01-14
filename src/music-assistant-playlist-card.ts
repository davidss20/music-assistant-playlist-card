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
  PlaylistTrack,
  MassQueueItem,
} from './types';
import { TABS } from './types';

// Card information for HACS
const CARD_VERSION = '1.12.1';

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

  // Library browsing state (for empty search)
  @state() private _libraryItems: MusicAssistantSearchResult[] = [];
  @state() private _libraryLoading = false;
  @state() private _libraryOffset = 0;
  @state() private _libraryHasMore = true;
  private _libraryLimit = 25;
  
  // Debounce timer for search
  private _searchDebounceTimer?: ReturnType<typeof setTimeout>;

  // Playlist detail view state
  @state() private _selectedPlaylist: MusicAssistantPlaylist | null = null;
  @state() private _playlistTracks: PlaylistTrack[] = [];
  @state() private _loadingTracks = false;

  // Queue state (requires mass_queue integration)
  @state() private _queueItems: MassQueueItem[] = [];
  @state() private _queueLoading = false;
  @state() private _queueError: string | null = null;
  @state() private _massQueueAvailable: boolean | null = null;
  @state() private _currentQueueItemId: string | null = null;

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
   * Open playlist detail view to see tracks
   */
  private async _openPlaylist(playlist: MusicAssistantPlaylist): Promise<void> {
    console.info('[music-assistant-playlist-card] Opening playlist:', playlist.name);
    this._selectedPlaylist = playlist;
    this._loadingTracks = true;
    this._playlistTracks = [];
    console.info('[music-assistant-playlist-card] Selected playlist set, loading tracks...');
    await this._loadPlaylistTracks(playlist);
  }

  /**
   * Close playlist detail view and go back to playlists list
   */
  private _closePlaylistDetail(): void {
    this._selectedPlaylist = null;
    this._playlistTracks = [];
    this._loadingTracks = false;
  }

  /**
   * Load tracks from a playlist using Music Assistant API
   * Uses browse_media as the primary method (standard HA API that works with playlist URI)
   */
  private async _loadPlaylistTracks(playlist: MusicAssistantPlaylist): Promise<void> {
    if (!this.hass || !this._config?.config_entry_id) return;

    console.info('[music-assistant-playlist-card] Loading tracks for playlist:', playlist.name, 'item_id:', playlist.item_id, 'uri:', playlist.uri);

    try {
      let tracks: PlaylistTrack[] = [];
      
      // Method 1: Try browse_media (standard HA API) - this is the correct way to get playlist tracks
      try {
        console.info('[music-assistant-playlist-card] Trying browse_media with playlist URI...');
        const browseUri = playlist.uri || `library://playlist/${playlist.item_id}`;
        const speakerEntity = this._selectedSpeaker || this._config.speakers?.[0];
        
        console.info('[music-assistant-playlist-card] browse_media params - entity:', speakerEntity, 'uri:', browseUri);
        
        const browseResponse = await this.hass.callWS<{
          children?: Array<Record<string, unknown>>;
          title?: string;
          media_content_id?: string;
          [key: string]: unknown;
        }>({
          type: 'media_player/browse_media',
          entity_id: speakerEntity,
          media_content_type: 'playlist',
          media_content_id: browseUri,
        });

        console.info('[music-assistant-playlist-card] browse_media response:', JSON.stringify(browseResponse, null, 2));

        if (browseResponse?.children && Array.isArray(browseResponse.children)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tracks = browseResponse.children.map((child: any) => ({
            item_id: child.media_content_id || child.item_id || '',
            uri: child.media_content_id || child.uri || '',
            name: child.title || child.name || '',
            artist: child.media_artist || child.artist || '',
            image: child.thumbnail || child.image,
            duration: child.duration,
            album: child.media_album_name ? { name: child.media_album_name } : undefined,
          })) as PlaylistTrack[];
          console.info('[music-assistant-playlist-card] browse_media found tracks:', tracks.length);
        }
      } catch (e) {
        console.info('[music-assistant-playlist-card] browse_media failed:', e);
      }

      // Method 2: Try get_item with playlist ID to get tracks array
      if (tracks.length === 0) {
        try {
          console.info('[music-assistant-playlist-card] Trying get_item...');
          const getItemResponse = await this.hass.callWS<{
            response: Record<string, unknown>;
          }>({
            type: 'call_service',
            domain: 'music_assistant',
            service: 'get_item',
            service_data: {
              config_entry_id: this._config.config_entry_id,
              media_type: 'playlist',
              item_id: playlist.item_id,
            },
            return_response: true,
          });

          console.info('[music-assistant-playlist-card] get_item full response:', JSON.stringify(getItemResponse, null, 2));

          // Search for tracks in any key of the response
          if (getItemResponse?.response) {
            for (const [key, value] of Object.entries(getItemResponse.response)) {
              if (Array.isArray(value) && value.length > 0) {
                const firstItem = value[0] as Record<string, unknown>;
                // Check if this looks like a track (has name/uri/item_id and possibly artist/duration)
                if (firstItem && (firstItem.name || firstItem.uri || firstItem.item_id)) {
                  tracks = value as PlaylistTrack[];
                  console.info('[music-assistant-playlist-card] Found tracks in key:', key, 'count:', tracks.length);
                  break;
                }
              }
            }
          }
        } catch (e) {
          console.info('[music-assistant-playlist-card] get_item failed:', e);
        }
      }

      // Method 3: Try Music Assistant specific playlist_tracks service (if available)
      if (tracks.length === 0) {
        try {
          console.info('[music-assistant-playlist-card] Trying playlist_tracks service...');
          const playlistTracksResponse = await this.hass.callWS<{
            response: PlaylistTrack[] | { items?: PlaylistTrack[]; tracks?: PlaylistTrack[] };
          }>({
            type: 'call_service',
            domain: 'music_assistant',
            service: 'get_library',
            service_data: {
              config_entry_id: this._config.config_entry_id,
              media_type: 'playlist_tracks',
              item_id: playlist.item_id,
              limit: 500,
            },
            return_response: true,
          });

          console.info('[music-assistant-playlist-card] playlist_tracks response:', playlistTracksResponse);

          if (playlistTracksResponse?.response) {
            if (Array.isArray(playlistTracksResponse.response)) {
              tracks = playlistTracksResponse.response as PlaylistTrack[];
            } else if (playlistTracksResponse.response.items) {
              tracks = playlistTracksResponse.response.items;
            } else if (playlistTracksResponse.response.tracks) {
              tracks = playlistTracksResponse.response.tracks;
            }
          }
        } catch (e) {
          console.info('[music-assistant-playlist-card] playlist_tracks failed:', e);
        }
      }

      this._playlistTracks = tracks;
      console.info('[music-assistant-playlist-card] Final loaded tracks:', this._playlistTracks.length);
      
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to load playlist tracks:', error);
      this._playlistTracks = [];
    } finally {
      this._loadingTracks = false;
    }
  }

  /**
   * Play a specific track from the playlist
   */
  private async _playTrack(track: PlaylistTrack): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) {
      console.warn('[music-assistant-playlist-card] No speaker selected');
      return;
    }

    try {
      const mediaId = track.uri || track.item_id;
      
      await this.hass.callService('music_assistant', 'play_media', {
        media_id: mediaId,
        media_type: 'track',
        enqueue: 'replace',
      }, { entity_id: this._selectedSpeaker });
      
      console.info('[music-assistant-playlist-card] Playing track:', track.name);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to play track:', error);
    }
  }

  /**
   * Get artist name from track
   */
  private _getTrackArtist(track: PlaylistTrack): string {
    if (track.artist) return track.artist;
    if (track.artists && track.artists.length > 0) {
      return track.artists.map(a => a.name).join(', ');
    }
    return '';
  }

  /**
   * Get image URL for a track
   */
  private _getTrackImage(track: PlaylistTrack): string | null {
    if (!track.image) return null;
    
    if (typeof track.image === 'string') {
      return track.image;
    }
    
    if (typeof track.image === 'object' && track.image.path) {
      return track.image.path;
    }
    
    return null;
  }

  /**
   * Format duration in mm:ss
   */
  private _formatDuration(seconds: number | undefined): string {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // ==========================================================================
  // Queue Functions (requires mass_queue integration)
  // ==========================================================================

  /**
   * Check if mass_queue integration is available
   * Based on https://github.com/droans/mass_queue
   */
  private _checkMassQueueAvailable(): boolean {
    // If already confirmed available, return cached value
    if (this._massQueueAvailable === true) {
      return true;
    }
    
    // Check if mass_queue service exists
    const available = !!(this.hass?.services?.mass_queue?.get_queue_items);
    
    // Only cache positive result - services may load after initial render
    if (available) {
      this._massQueueAvailable = true;
      console.info('[music-assistant-playlist-card] mass_queue integration detected');
    }
    
    return available;
  }

  /**
   * Load queue items using mass_queue.get_queue_items service
   * @see https://github.com/droans/mass_queue
   */
  private async _loadQueue(): Promise<void> {
    if (!this.hass || !this._selectedSpeaker || !this._checkMassQueueAvailable()) {
      return;
    }

    this._queueLoading = true;
    this._queueError = null;

    try {
      // Call mass_queue.get_queue_items service
      // Response format: { entity_id: [ { queue_item_id, media_title, ... }, ... ] }
      const response = await this.hass.callWS<{
        response: Record<string, MassQueueItem[]>;
      }>({
        type: 'call_service',
        domain: 'mass_queue',
        service: 'get_queue_items',
        service_data: {
          entity: this._selectedSpeaker,
          limit: 100,
          limit_before: 5,
          limit_after: 100,
        },
        return_response: true,
      });

      console.info('[music-assistant-playlist-card] Queue response:', response);

      // Extract queue items - response is keyed by entity_id
      if (response?.response) {
        const items = response.response[this._selectedSpeaker];
        if (Array.isArray(items)) {
          this._queueItems = items;
          
          // Try to find currently playing item
          const mediaState = this._getMediaPlayerState();
          if (mediaState?.media_title) {
            const currentItem = items.find(item => 
              item.media_title === mediaState.media_title
            );
            this._currentQueueItemId = currentItem?.queue_item_id || null;
          }
          
          console.info('[music-assistant-playlist-card] Loaded queue items:', this._queueItems.length);
        } else {
          this._queueItems = [];
        }
      } else {
        this._queueItems = [];
      }
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to load queue:', error);
      this._queueError = localize('common.queue_error');
      this._queueItems = [];
    } finally {
      this._queueLoading = false;
    }
  }

  /**
   * Play a specific queue item
   */
  private async _playQueueItem(item: MassQueueItem): Promise<void> {
    if (!this.hass || !this._selectedSpeaker) return;

    try {
      await this.hass.callService('mass_queue', 'play_queue_item', {
        entity: this._selectedSpeaker,
        queue_item_id: item.queue_item_id,
      });
      console.info('[music-assistant-playlist-card] Playing queue item:', item.media_title);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to play queue item:', error);
    }
  }

  /**
   * Remove an item from the queue
   */
  private async _removeQueueItem(item: MassQueueItem, event: Event): Promise<void> {
    event.stopPropagation();
    if (!this.hass || !this._selectedSpeaker) return;

    try {
      await this.hass.callService('mass_queue', 'remove_queue_item', {
        entity: this._selectedSpeaker,
        queue_item_id: item.queue_item_id,
      });
      console.info('[music-assistant-playlist-card] Removed queue item:', item.media_title);
      
      // Reload queue
      await this._loadQueue();
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to remove queue item:', error);
    }
  }

  /**
   * Move a queue item up
   */
  private async _moveQueueItemUp(item: MassQueueItem, event: Event): Promise<void> {
    event.stopPropagation();
    if (!this.hass || !this._selectedSpeaker) return;

    try {
      await this.hass.callService('mass_queue', 'move_queue_item_up', {
        entity: this._selectedSpeaker,
        queue_item_id: item.queue_item_id,
      });
      await this._loadQueue();
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to move queue item up:', error);
    }
  }

  /**
   * Move a queue item down
   */
  private async _moveQueueItemDown(item: MassQueueItem, event: Event): Promise<void> {
    event.stopPropagation();
    if (!this.hass || !this._selectedSpeaker) return;

    try {
      await this.hass.callService('mass_queue', 'move_queue_item_down', {
        entity: this._selectedSpeaker,
        queue_item_id: item.queue_item_id,
      });
      await this._loadQueue();
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to move queue item down:', error);
    }
  }

  /**
   * Move a queue item to play next
   */
  private async _moveQueueItemNext(item: MassQueueItem, event: Event): Promise<void> {
    event.stopPropagation();
    if (!this.hass || !this._selectedSpeaker) return;

    try {
      await this.hass.callService('mass_queue', 'move_queue_item_next', {
        entity: this._selectedSpeaker,
        queue_item_id: item.queue_item_id,
      });
      await this._loadQueue();
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to move queue item to next:', error);
    }
  }

  /**
   * Handle tab change
   */
  private _handleTabChange(tabId: TabId): void {
    this._activeTab = tabId;
    
    // Load library when switching to search tab if not already loaded
    if (tabId === 'search' && !this._globalSearchQuery.trim() && this._libraryItems.length === 0) {
      this._loadLibrary(true);
    }
    
    // Load queue when switching to queue tab
    if (tabId === 'queue' && this._checkMassQueueAvailable()) {
      this._loadQueue();
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

  private _updateVolumeSliderFill(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    const percentage = value * 100;
    input.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${percentage}%, var(--divider-color, rgba(0,0,0,0.1)) ${percentage}%, var(--divider-color, rgba(0,0,0,0.1)) 100%)`;
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
   * Filters tabs based on availability (e.g., queue tab only shows if mass_queue is installed)
   */
  private _renderTabBar(): TemplateResult {
    // Filter tabs - only show queue tab if mass_queue is available
    const visibleTabs = TABS.filter(tab => {
      if (tab.requiresMassQueue) {
        return this._checkMassQueueAvailable();
      }
      return true;
    });

    return html`
      <div class="tab-bar">
        ${visibleTabs.map(
          (tab) => html`
            <button
              class="tab-button ${this._activeTab === tab.id ? 'active' : ''}"
              @click=${() => this._handleTabChange(tab.id)}
              title="${localize(tab.labelKey)}"
            >
              <ha-icon icon="${tab.icon}"></ha-icon>
              <span class="tab-label">${localize(tab.labelKey)}</span>
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
    
    // If no speaker selected, show message
    if (!this._selectedSpeaker) {
      return html`
        <div class="now-playing">
          <div class="now-playing-idle">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="now-playing-idle-text">${localize('common.no_speaker_selected')}</span>
          </div>
        </div>
      `;
    }

    const isPlaying = state?.state === 'playing';
    const hasMedia = state?.media_title;
    
    const progress = state?.media_duration && state?.media_position 
      ? (state.media_position / state.media_duration) * 100 
      : 0;

    // Always show the player - with or without media
    return html`
      <div class="now-playing">
        <div class="now-playing-artwork">
          ${hasMedia && state?.entity_picture
            ? html`<img src="${state.entity_picture}" alt="Album art" />`
            : html`
                <div class="now-playing-artwork-placeholder">
                  <ha-icon icon="mdi:music"></ha-icon>
                </div>
              `}
        </div>

        <div class="now-playing-info">
          <h3 class="now-playing-title">${hasMedia ? state?.media_title : localize('common.nothing_playing')}</h3>
          <p class="now-playing-artist">${hasMedia ? (state?.media_artist || '') : ''}</p>
        </div>

        ${state?.media_duration
          ? html`
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-time">
                  <span>${this._formatTime(state?.media_position || 0)}</span>
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
              class="control-button small ${state?.shuffle ? 'active' : ''}" 
              @click=${this._toggleShuffle}
              title="Shuffle"
            >
              <ha-icon icon="mdi:shuffle"></ha-icon>
            </button>
          </div>
          <div class="secondary-controls-right">
            <button 
              class="control-button small ${state?.repeat !== 'off' ? 'active' : ''}" 
              @click=${this._toggleRepeat}
              title="Repeat: ${state?.repeat || 'off'}"
            >
              <ha-icon icon="${state?.repeat === 'one' ? 'mdi:repeat-once' : 'mdi:repeat'}"></ha-icon>
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
            .value=${String(state?.volume_level || 0)}
            @input=${this._updateVolumeSliderFill}
            @change=${this._setVolume}
            style="--volume-percent: ${(state?.volume_level || 0) * 100}%"
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
    this._debouncedSearch();
  }

  /**
   * Handle search form submit
   */
  private _handleSearchSubmit(event: Event): void {
    event.preventDefault();
    // Cancel debounce and search immediately
    if (this._searchDebounceTimer) {
      clearTimeout(this._searchDebounceTimer);
    }
    if (this._globalSearchQuery.trim()) {
      this._performSearch();
    }
  }

  /**
   * Set search media type filter
   */
  private _setSearchMediaType(type: SearchMediaType): void {
    const typeChanged = this._searchMediaType !== type;
    this._searchMediaType = type;
    
    if (typeChanged) {
      if (this._globalSearchQuery.trim()) {
        this._performSearch();
      } else {
        // Reload library with new type
        this._loadLibrary(true);
      }
    }
  }

  /**
   * Clear search and show library
   */
  private _clearSearch(): void {
    this._globalSearchQuery = '';
    this._searchResults = [];
    this._loadLibrary(true);
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

  // ==========================================================================
  // Library Browsing Functions (for empty search state)
  // ==========================================================================

  /**
   * Load library items based on current media type
   * Called when search is empty to show browsable content
   */
  private async _loadLibrary(reset = true): Promise<void> {
    if (!this.hass || !this._config?.config_entry_id) return;

    if (reset) {
      this._libraryItems = [];
      this._libraryOffset = 0;
      this._libraryHasMore = true;
    }

    if (!this._libraryHasMore || this._libraryLoading) return;

    this._libraryLoading = true;

    try {
      const response = await this.hass.callWS<{
        response: {
          tracks?: MusicAssistantSearchResult[];
          albums?: MusicAssistantSearchResult[];
          artists?: MusicAssistantSearchResult[];
          items?: MusicAssistantSearchResult[];
        };
      }>({
        type: 'call_service',
        domain: 'music_assistant',
        service: 'get_library',
        service_data: {
          config_entry_id: this._config.config_entry_id,
          media_type: this._searchMediaType,
          limit: this._libraryLimit,
          offset: this._libraryOffset,
          order_by: 'name',
        },
        return_response: true,
      });

      console.info('[music-assistant-playlist-card] Library response:', response);

      // Extract items from response based on media type
      let newItems: MusicAssistantSearchResult[] = [];
      const results = response?.response;
      
      if (results) {
        // Try different keys based on media type
        const typeKey = this._searchMediaType + 's'; // tracks, albums, artists
        if (results[typeKey as keyof typeof results]) {
          newItems = results[typeKey as keyof typeof results] as MusicAssistantSearchResult[];
        } else if (results.items) {
          newItems = results.items;
        } else {
          // Try to find any array in the response
          for (const value of Object.values(results)) {
            if (Array.isArray(value) && value.length > 0) {
              newItems = value as MusicAssistantSearchResult[];
              break;
            }
          }
        }
      }

      // Add media_type to items if missing
      newItems = newItems.map(item => ({
        ...item,
        media_type: item.media_type || this._searchMediaType,
      }));

      if (reset) {
        this._libraryItems = newItems;
      } else {
        this._libraryItems = [...this._libraryItems, ...newItems];
      }

      // Check if there are more items to load
      this._libraryHasMore = newItems.length >= this._libraryLimit;
      this._libraryOffset += newItems.length;

      console.info('[music-assistant-playlist-card] Library items loaded:', this._libraryItems.length, 'hasMore:', this._libraryHasMore);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to load library:', error);
      this._libraryHasMore = false;
    } finally {
      this._libraryLoading = false;
    }
  }

  /**
   * Load more library items (for infinite scroll)
   */
  private async _loadMoreLibrary(): Promise<void> {
    if (this._libraryLoading || !this._libraryHasMore) return;
    await this._loadLibrary(false);
  }

  /**
   * Handle scroll event for infinite scroll
   */
  private _handleSearchScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) return;

    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    // Load more when user scrolls to bottom (with 100px threshold)
    if (scrollHeight - scrollTop - clientHeight < 100) {
      // Only load library if search is empty
      if (!this._globalSearchQuery.trim()) {
        this._loadMoreLibrary();
      }
    }
  }

  /**
   * Debounced search - waits 300ms after user stops typing
   */
  private _debouncedSearch(): void {
    if (this._searchDebounceTimer) {
      clearTimeout(this._searchDebounceTimer);
    }

    this._searchDebounceTimer = setTimeout(() => {
      if (this._globalSearchQuery.trim()) {
        this._performSearch();
      } else {
        // If search is cleared, load library
        this._searchResults = [];
        this._loadLibrary(true);
      }
    }, 300);
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
   * Toggle favorite status for a search result
   */
  private async _toggleFavorite(result: MusicAssistantSearchResult, _event: Event): Promise<void> {
    if (!this.hass || !this._config?.config_entry_id) {
      console.warn('[music-assistant-playlist-card] Cannot toggle favorite: missing hass or config');
      return;
    }

    const currentFavorite = result.favorite === true;
    const newFavoriteStatus = !currentFavorite;
    const mediaType = result.media_type || this._searchMediaType;
    const mediaUri = result.uri || `library://${mediaType}/${result.item_id}`;
    
    // Extract item_id from URI if not available (e.g., "library://track/123" -> "123")
    let itemId = result.item_id;
    if (!itemId && result.uri) {
      const uriMatch = result.uri.match(/\/([^/]+)$/);
      if (uriMatch) {
        itemId = uriMatch[1];
      }
    }

    console.info('[music-assistant-playlist-card] Toggling favorite:', {
      name: result.name,
      item_id: itemId,
      uri: mediaUri,
      media_type: mediaType,
      current: currentFavorite,
      new: newFavoriteStatus
    });

    // Optimistically update UI first
    result.favorite = newFavoriteStatus;
    this._searchResults = [...this._searchResults];
    this._libraryItems = [...this._libraryItems];

    // Try multiple API approaches - Music Assistant uses different service names in different versions
    const approaches = [
      // Approach 1: play_media with enqueue "add" to library (some versions)
      async () => {
        if (newFavoriteStatus) {
          await this.hass!.callService('music_assistant', 'play_media', {
            media_id: mediaUri,
            media_type: mediaType,
            enqueue: 'add',
          }, { entity_id: this._selectedSpeaker || this._config.speakers?.[0] });
        } else {
          throw new Error('Cannot remove favorite with play_media');
        }
      },
      // Approach 2: add_to_library / remove_from_library
      async () => {
        await this.hass!.callService('music_assistant', newFavoriteStatus ? 'add_to_library' : 'remove_from_library', {
          config_entry_id: this._config.config_entry_id,
          uri: mediaUri,
        });
      },
      // Approach 3: add_item_to_library / remove_item_from_library
      async () => {
        await this.hass!.callService('music_assistant', newFavoriteStatus ? 'add_item_to_library' : 'remove_item_from_library', {
          config_entry_id: this._config.config_entry_id,
          uri: mediaUri,
        });
      },
      // Approach 4: favorite / unfavorite service
      async () => {
        await this.hass!.callService('music_assistant', newFavoriteStatus ? 'favorite' : 'unfavorite', {
          config_entry_id: this._config.config_entry_id,
          uri: mediaUri,
        });
      },
      // Approach 5: set_favorite service
      async () => {
        await this.hass!.callService('music_assistant', 'set_favorite', {
          config_entry_id: this._config.config_entry_id,
          uri: mediaUri,
          favorite: newFavoriteStatus,
        });
      },
      // Approach 6: WebSocket mass command
      async () => {
        await this.hass!.callWS({
          type: 'mass/favorites/' + (newFavoriteStatus ? 'add' : 'remove'),
          uri: mediaUri,
        });
      },
    ];

    for (let i = 0; i < approaches.length; i++) {
      try {
        await approaches[i]();
        console.info(`[music-assistant-playlist-card] Favorite toggled successfully (approach ${i + 1}):`, result.name, '->', newFavoriteStatus);
        return; // Success!
      } catch (error) {
        console.warn(`[music-assistant-playlist-card] Approach ${i + 1} failed:`, error);
      }
    }

    // All approaches failed - revert UI
    console.error('[music-assistant-playlist-card] All favorite toggle approaches failed. Please check Music Assistant services in Developer Tools.');
    result.favorite = currentFavorite;
    this._searchResults = [...this._searchResults];
    this._libraryItems = [...this._libraryItems];
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
    const hasSearchQuery = this._globalSearchQuery.trim().length > 0;
    const showLibrary = !hasSearchQuery;
    const items = hasSearchQuery ? this._searchResults : this._libraryItems;
    const isLoading = hasSearchQuery ? this._searchLoading : this._libraryLoading;
    
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
                @click=${this._clearSearch}
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

        ${showLibrary && !isLoading && items.length === 0 && this._libraryHasMore ? html`
          <!-- Initial library load -->
          ${this._loadLibrary(true), nothing}
        ` : nothing}

        ${isLoading && items.length === 0 ? html`
          <div class="loading-container">
            <div class="loading-spinner"></div>
            <span class="loading-text">${localize('common.loading')}</span>
          </div>
        ` : items.length > 0 ? html`
          <div class="search-results" @scroll=${this._handleSearchScroll}>
            ${items.map(result => {
              const imageUrl = this._getSearchResultImage(result);
              const artist = this._getSearchResultArtist(result);
              const mediaType = result.media_type || this._searchMediaType;
              const isFavorite = result.favorite === true;
              
              return html`
                <div 
                  class="search-result-item"
                  @click=${() => this._playSearchResult(result)}
                >
                  <div class="search-result-image ${mediaType === 'artist' ? 'artist-image' : ''}">
                    ${imageUrl
                      ? html`<img src="${imageUrl}" alt="${result.name}" />`
                      : html`<ha-icon icon="${mediaType === 'artist' ? 'mdi:account-music' : mediaType === 'album' ? 'mdi:album' : 'mdi:music-note'}"></ha-icon>`}
                  </div>
                  <div class="search-result-info">
                    <div class="search-result-title">${result.name}</div>
                    ${artist ? html`<div class="search-result-artist">${artist}</div>` : nothing}
                    ${result.album?.name ? html`<div class="search-result-album">${result.album.name}</div>` : nothing}
                  </div>
                  ${/* TODO: Enable favorite button when Music Assistant adds favorite service support
                  <button 
                    class="search-result-favorite ${isFavorite ? 'active' : ''}" 
                    title="${isFavorite ? localize('common.remove_favorite') : localize('common.add_favorite')}"
                    @click=${(e: Event) => { e.stopPropagation(); e.preventDefault(); this._toggleFavorite(result, e); }}
                  >
                    <ha-icon icon="${isFavorite ? 'mdi:heart' : 'mdi:heart-outline'}"></ha-icon>
                  </button>
                  */ ''}
                  <button 
                    class="search-result-play" 
                    title="${localize('common.play')}"
                    @click=${(e: Event) => { e.stopPropagation(); this._playSearchResult(result); }}
                  >
                    <ha-icon icon="mdi:play"></ha-icon>
                  </button>
                </div>
              `;
            })}
            ${showLibrary && this._libraryLoading ? html`
              <div class="load-more-indicator">
                <div class="loading-spinner small"></div>
              </div>
            ` : nothing}
            ${showLibrary && !this._libraryHasMore && items.length > 0 ? html`
              <div class="end-of-list">
                <span>${localize('common.end_of_list')}</span>
              </div>
            ` : nothing}
          </div>
        ` : hasSearchQuery && !isLoading ? html`
          <div class="search-empty">
            <ha-icon icon="mdi:magnify"></ha-icon>
            <span>${localize('common.no_results')}</span>
          </div>
        ` : !isLoading ? html`
          <div class="search-empty">
            <ha-icon icon="mdi:music-box-multiple"></ha-icon>
            <span>${localize('common.browse_library')}</span>
          </div>
        ` : nothing}
      </div>
    `;
  }

  /**
   * Render Queue view
   * Uses mass_queue integration: https://github.com/droans/mass_queue
   */
  private _renderQueue(): TemplateResult {
    // If no speaker selected, show message
    if (!this._selectedSpeaker) {
      return html`
        <div class="queue-view">
          <div class="empty-container">
            <ha-icon icon="mdi:speaker-off"></ha-icon>
            <span class="empty-message">${localize('common.no_speaker_selected')}</span>
          </div>
        </div>
      `;
    }

    // Loading state
    if (this._queueLoading) {
      return html`
        <div class="queue-view">
          ${this._renderLoading()}
        </div>
      `;
    }

    // Error state
    if (this._queueError) {
      return html`
        <div class="queue-view">
          <div class="error-container">
            <ha-icon icon="mdi:alert-circle"></ha-icon>
            <span class="error-message">${this._queueError}</span>
          </div>
        </div>
      `;
    }

    // Empty queue
    if (this._queueItems.length === 0) {
      return html`
        <div class="queue-view">
          <div class="empty-container">
            <ha-icon icon="mdi:playlist-play"></ha-icon>
            <span class="empty-message">${localize('common.queue_empty')}</span>
          </div>
        </div>
      `;
    }

    // Render queue items
    return html`
      <div class="queue-view">
        <div class="queue-header">
          <span class="queue-count">${this._queueItems.length} ${localize('common.tracks')}</span>
          <button class="refresh-button" @click=${() => this._loadQueue()} title="Refresh">
            <ha-icon icon="mdi:refresh"></ha-icon>
          </button>
        </div>
        <div class="queue-list">
          ${this._queueItems.map((item, index) => this._renderQueueItem(item, index))}
        </div>
      </div>
    `;
  }

  /**
   * Render a single queue item
   */
  private _renderQueueItem(item: MassQueueItem, index: number): TemplateResult {
    const isCurrentlyPlaying = item.queue_item_id === this._currentQueueItemId;
    // Use local_image_encoded if available (for local providers), fallback to media_image
    const imageUrl = item.media_image;

    return html`
      <div 
        class="queue-item ${isCurrentlyPlaying ? 'now-playing' : ''}"
        @click=${() => this._playQueueItem(item)}
      >
        <span class="queue-item-number">${index + 1}</span>
        <div class="queue-item-image">
          ${imageUrl
            ? html`<img src="${imageUrl}" alt="${item.media_title}" />`
            : html`<ha-icon icon="mdi:music-note"></ha-icon>`}
          ${isCurrentlyPlaying
            ? html`<div class="now-playing-indicator"><ha-icon icon="mdi:volume-high"></ha-icon></div>`
            : nothing}
        </div>
        <div class="queue-item-info">
          <span class="queue-item-title">${item.media_title}</span>
          ${item.media_artist ? html`<span class="queue-item-artist">${item.media_artist}</span>` : nothing}
          ${item.media_album_name ? html`<span class="queue-item-album">${item.media_album_name}</span>` : nothing}
        </div>
        <div class="queue-item-actions">
          <button 
            class="queue-action-btn"
            @click=${(e: Event) => this._moveQueueItemUp(item, e)}
            title="${localize('common.move_up')}"
          >
            <ha-icon icon="mdi:arrow-up"></ha-icon>
          </button>
          <button 
            class="queue-action-btn"
            @click=${(e: Event) => this._moveQueueItemDown(item, e)}
            title="${localize('common.move_down')}"
          >
            <ha-icon icon="mdi:arrow-down"></ha-icon>
          </button>
          <button 
            class="queue-action-btn"
            @click=${(e: Event) => this._moveQueueItemNext(item, e)}
            title="${localize('common.play_next')}"
          >
            <ha-icon icon="mdi:page-next"></ha-icon>
          </button>
          <button 
            class="queue-action-btn remove"
            @click=${(e: Event) => this._removeQueueItem(item, e)}
            title="${localize('common.remove_from_queue')}"
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>
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
    // If a playlist is selected, show detail view with tracks
    if (this._selectedPlaylist) {
      return this._renderPlaylistDetail();
    }

    // Otherwise show playlists grid/list
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
   * Render playlist detail view with tracks list
   */
  private _renderPlaylistDetail(): TemplateResult {
    if (!this._selectedPlaylist) return html``;

    const playlist = this._selectedPlaylist;
    const imageUrl = this._getPlaylistImage(playlist);

    return html`
      <div class="playlist-detail">
        <div class="playlist-detail-header">
          <button class="back-button" @click=${this._closePlaylistDetail} title="${localize('common.back')}">
            <ha-icon icon="${isRTL() ? 'mdi:arrow-left' : 'mdi:arrow-right'}"></ha-icon>
          </button>
          <div class="playlist-detail-image">
            ${imageUrl
              ? html`<img src="${imageUrl}" alt="${playlist.name}" />`
              : html`<ha-icon icon="mdi:playlist-music"></ha-icon>`}
          </div>
          <div class="playlist-detail-info">
            <h3 class="playlist-detail-title">${playlist.name}</h3>
            <span class="playlist-detail-meta">
              ${this._loadingTracks 
                ? localize('common.loading')
                : `${this._playlistTracks.length} ${localize('common.tracks')}`}
            </span>
          </div>
        </div>

        <div class="playlist-detail-actions">
          <button 
            class="play-all-button"
            @click=${() => this._playPlaylist(playlist)}
            ?disabled=${!this._selectedSpeaker}
          >
            <ha-icon icon="mdi:play"></ha-icon>
            <span>${localize('common.play_all')}</span>
          </button>
        </div>

        ${this._loadingTracks 
          ? this._renderLoading()
          : this._playlistTracks.length === 0
            ? html`
                <div class="empty-container">
                  <ha-icon icon="mdi:music-note-off"></ha-icon>
                  <span class="empty-message">${localize('common.no_tracks')}</span>
                </div>
              `
            : html`
                <div class="tracks-list">
                  ${this._playlistTracks.map((track, index) => this._renderTrackItem(track, index))}
                </div>
              `}
      </div>
    `;
  }

  /**
   * Render a single track item in the playlist detail view
   */
  private _renderTrackItem(track: PlaylistTrack, index: number): TemplateResult {
    const imageUrl = this._getTrackImage(track);
    const artist = this._getTrackArtist(track);
    const duration = this._formatDuration(track.duration);

    return html`
      <div 
        class="track-item"
        @click=${() => this._playTrack(track)}
      >
        <span class="track-number">${index + 1}</span>
        <div class="track-image">
          ${imageUrl
            ? html`<img src="${imageUrl}" alt="${track.name}" />`
            : html`<ha-icon icon="mdi:music-note"></ha-icon>`}
        </div>
        <div class="track-info">
          <span class="track-name">${track.name}</span>
          ${artist ? html`<span class="track-artist">${artist}</span>` : nothing}
        </div>
        ${duration ? html`<span class="track-duration">${duration}</span>` : nothing}
        <button 
          class="track-play-btn"
          @click=${(e: Event) => { e.stopPropagation(); this._playTrack(track); }}
          title="${localize('common.play')}"
        >
          <ha-icon icon="mdi:play"></ha-icon>
        </button>
      </div>
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
      <div class="playlists-scroll-container">
        <div class="playlist-grid ${columnsClass}">
          ${playlists.map((playlist) => this._renderPlaylistItem(playlist))}
        </div>
      </div>
    `;
  }

  /**
   * Render playlist list
   */
  private _renderPlaylistList(playlists: MusicAssistantPlaylist[]): TemplateResult {
    return html`
      <div class="playlists-scroll-container">
        <div class="playlist-list">
          ${playlists.map((playlist) => this._renderPlaylistItem(playlist))}
        </div>
      </div>
    `;
  }

  /**
   * Render a single playlist item
   * - Click anywhere except play button opens playlist detail view
   * - Click on play button (bottom right corner) starts playing immediately
   */
  private _renderPlaylistItem(playlist: MusicAssistantPlaylist): TemplateResult {
    const imageUrl = this._getPlaylistImage(playlist);

    return html`
      <div 
        class="playlist-item ripple" 
        title="${playlist.name}"
        @click=${() => this._openPlaylist(playlist)}
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
        </div>
        <div class="playlist-info">
          <p class="playlist-name">${playlist.name}</p>
          ${playlist.track_count
            ? html`<p class="playlist-meta">${playlist.track_count} ${localize('common.tracks')}</p>`
            : nothing}
        </div>
        <button 
          class="play-button-corner" 
          aria-label="${localize('common.play')}"
          @click=${(e: Event) => { e.stopPropagation(); this._playPlaylist(playlist); }}
        >
          <ha-icon icon="mdi:play"></ha-icon>
        </button>
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
   * Check if we're in preview/picker mode (no hass or stub config)
   */
  private _isPreviewMode(): boolean {
    return !this.hass || !this._config?.config_entry_id || this._config.config_entry_id === '';
  }

  /**
   * Render preview card for card picker
   */
  private _renderPreview(): TemplateResult {
    return html`
      <div class="now-playing">
        <div class="now-playing-artwork preview-artwork">
          <div class="preview-gradient">
            <ha-icon icon="mdi:music"></ha-icon>
          </div>
        </div>
        <div class="now-playing-info">
          <h3 class="now-playing-title">Music Assistant</h3>
          <p class="now-playing-artist">Player Card</p>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width: 35%"></div>
          </div>
          <div class="progress-time">
            <span>1:24</span>
            <span>4:02</span>
          </div>
        </div>
        <div class="player-controls">
          <button class="control-button">
            <ha-icon icon="mdi:skip-previous"></ha-icon>
          </button>
          <button class="control-button play-pause">
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
          <button class="control-button">
            <ha-icon icon="mdi:skip-next"></ha-icon>
          </button>
        </div>
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
    const isPreview = this._isPreviewMode() && !isValid;
    const cardHeight = this._config.card_height || 680;
    const artworkSize = Math.min(280, Math.max(120, cardHeight * 0.4));

    return html`
      <ha-card style="--card-height: ${cardHeight}px; --artwork-size: ${artworkSize}px;">
        ${this._config.title
          ? html`
              <div class="card-header">
                <h2 class="card-title">${this._config.title}</h2>
              </div>
            `
          : nothing}
        <div class="tab-content">
          ${isPreview
            ? html`<div class="tab-view">${this._renderPreview()}</div>`
            : !isValid
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

