/**
 * Music Assistant Playlist Card - TypeScript Type Definitions
 */

// Lovelace Card Types (defined locally to avoid external dependency)
export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number | Promise<number>;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

// ============================================================================
// Home Assistant Types
// ============================================================================

export interface HomeAssistant {
  language: string;
  states: { [entityId: string]: HassEntity };
  services: { [domain: string]: { [service: string]: HassService } };
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: HassServiceTarget
  ) => Promise<void>;
  callWS: <T>(message: HassWebSocketMessage) => Promise<T>;
  connection: {
    subscribeMessage: <T>(
      callback: (message: T) => void,
      subscribeMessage: HassWebSocketMessage
    ) => Promise<() => void>;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: HassEntityAttributes;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HassEntityAttributes {
  friendly_name?: string;
  icon?: string;
  entity_picture?: string;
  [key: string]: unknown;
}

export interface HassService {
  name?: string;
  description?: string;
  fields?: Record<string, unknown>;
}

export interface HassServiceTarget {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
}

export interface HassWebSocketMessage {
  type: string;
  [key: string]: unknown;
}

// ============================================================================
// Tab Navigation Types
// ============================================================================

export type TabId = 'now-playing' | 'playlists' | 'search' | 'speakers';

export type SortOption = 'name' | 'name_desc' | 'tracks' | 'recent';
export type ViewMode = 'grid' | 'list';
export type SearchMediaType = 'track' | 'album' | 'artist';

export interface Tab {
  id: TabId;
  icon: string;
  labelKey: string;  // Localization key
}

export const TABS: Tab[] = [
  { id: 'now-playing', icon: 'mdi:music-note', labelKey: 'tabs.now_playing' },
  { id: 'playlists', icon: 'mdi:playlist-music', labelKey: 'tabs.playlists' },
  { id: 'search', icon: 'mdi:magnify', labelKey: 'tabs.search' },
  { id: 'speakers', icon: 'mdi:speaker', labelKey: 'tabs.speakers' },
];

// ============================================================================
// Media Player Types
// ============================================================================

export interface MediaPlayerState {
  state: 'playing' | 'paused' | 'idle' | 'off' | 'unavailable';
  media_title?: string;
  media_artist?: string;
  media_album_name?: string;
  entity_picture?: string;
  media_duration?: number;
  media_position?: number;
  media_position_updated_at?: string;
  volume_level?: number;
  is_volume_muted?: boolean;
  shuffle?: boolean;
  repeat?: 'off' | 'one' | 'all';
}

export interface QueueItem {
  queue_item_id: string;
  item_id?: string;
  name: string;
  media_type: string;
  uri: string;
  image?: string | MusicAssistantImage;
  artist?: string;
  album?: string;
  duration?: number;
}

/**
 * Queue item format returned by mass_queue integration
 * https://github.com/droans/mass_queue
 */
export interface MassQueueItem {
  queue_item_id: string;
  media_title: string;
  media_album_name?: string;
  media_artist?: string;
  media_content_id: string;
  media_image?: string;
  favorite?: boolean;
}

/**
 * Response from music_assistant.get_queue service
 */
export interface MusicAssistantQueueResponse {
  queue_id: string;
  active: boolean;
  name: string;
  items: number;
  shuffle_enabled: boolean;
  repeat_mode: string;
  current_index: number;
  elapsed_time: number;
  current_item?: MusicAssistantQueueItem;
  next_item?: MusicAssistantQueueItem;
}

/**
 * Queue item from Music Assistant
 */
export interface MusicAssistantQueueItem {
  queue_item_id: string;
  name: string;
  duration?: number;
  image?: string | MusicAssistantImage;
  media_item?: {
    media_type: string;
    uri: string;
    name: string;
    image?: string | MusicAssistantImage;
    favorite?: boolean;
    artists?: Array<{ name: string }>;
    album?: { name: string };
  };
  stream_title?: string;
}

// ============================================================================
// Card Configuration Types
// ============================================================================

export interface MusicAssistantPlaylistCardConfig extends LovelaceCardConfig {
  /** Music Assistant config entry ID */
  config_entry_id: string;
  /** List of speaker entity IDs to show in dropdown */
  speakers: string[];
  /** Maximum number of playlists to load (default: 25) */
  limit?: number;
  /** Number of columns in grid (default: auto) */
  columns?: number | 'auto';
  /** Language override (default: auto-detect from HA) */
  language?: string;
  /** Card title (optional) */
  title?: string;
  /** Card height in pixels (default: 400) */
  card_height?: number;
}

// ============================================================================
// Music Assistant API Types
// ============================================================================

export interface MusicAssistantPlaylist {
  /** Unique playlist ID */
  item_id: string;
  /** Provider-specific URI */
  uri: string;
  /** Playlist name */
  name: string;
  /** Playlist image - can be URL string or object */
  image?: string | MusicAssistantImage;
  /** Provider that owns this playlist */
  provider: string;
  /** Whether playlist is a favorite */
  favorite: boolean;
  /** Number of tracks in playlist */
  track_count?: number;
  /** Owner/creator name */
  owner?: string;
  /** Checksum for change detection */
  checksum?: string;
  /** Media type */
  media_type?: string;
}

export interface MusicAssistantImage {
  /** Image URL */
  path: string;
  /** Image provider */
  provider: string;
  /** Whether image is locally stored */
  locally_stored?: boolean;
}

// Image can be either a string URL or an object
export type MusicAssistantImageType = string | MusicAssistantImage;

export interface MusicAssistantLibraryResponse {
  /** List of items */
  items: MusicAssistantPlaylist[];
  /** Total count of items */
  count: number;
  /** Limit used in request */
  limit: number;
  /** Offset used in request */
  offset: number;
}

export interface MusicAssistantGetLibraryParams {
  /** Type of media to get */
  media_type: 'playlist' | 'album' | 'artist' | 'track' | 'radio';
  /** Only return favorites */
  favorite?: boolean;
  /** Maximum items to return */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  /** Sort order */
  order_by?: string;
  /** Config entry ID for MA instance */
  config_entry_id: string;
  /** Only album artists (for artists) */
  album_artists_only?: boolean;
}

export interface MusicAssistantPlayMediaParams {
  /** Media ID or URI to play */
  media_id: string;
  /** Type of media */
  media_type: 'playlist' | 'album' | 'artist' | 'track' | 'radio';
  /** Target entity ID (speaker) */
  entity_id: string;
  /** Enqueue mode */
  enqueue?: 'play' | 'next' | 'add' | 'replace' | 'replace_next';
}

export interface MusicAssistantSearchResult {
  /** Item ID */
  item_id: string;
  /** URI */
  uri: string;
  /** Name */
  name: string;
  /** Image */
  image?: string | MusicAssistantImage;
  /** Media type */
  media_type: 'track' | 'album' | 'artist';
  /** Artist name (for tracks) */
  artist?: string;
  /** Artists array */
  artists?: Array<{ name: string }>;
  /** Album info (for tracks) */
  album?: { name: string };
  /** Duration in seconds (for tracks) */
  duration?: number;
  /** Provider */
  provider?: string;
}

export interface PlaylistTrack {
  /** Track item ID */
  item_id: string;
  /** Track URI */
  uri: string;
  /** Track name */
  name: string;
  /** Artist name (simple) */
  artist?: string;
  /** Artists array */
  artists?: Array<{ name: string }>;
  /** Album info */
  album?: { name: string };
  /** Duration in seconds */
  duration?: number;
  /** Track image */
  image?: string | MusicAssistantImage;
  /** Track number in album */
  track_number?: number;
  /** Position in playlist */
  position?: number;
}

// ============================================================================
// Component Types
// ============================================================================

export interface PlaylistCardElement extends LovelaceCard {
  hass: HomeAssistant;
  setConfig(config: MusicAssistantPlaylistCardConfig): void;
}

export interface PlaylistCardEditorElement extends LovelaceCardEditor {
  hass: HomeAssistant;
  setConfig(config: MusicAssistantPlaylistCardConfig): void;
}

// ============================================================================
// Event Types
// ============================================================================

export interface ConfigChangedEvent extends CustomEvent {
  detail: {
    config: MusicAssistantPlaylistCardConfig;
  };
}

export interface PlaylistSelectedEvent extends CustomEvent {
  detail: {
    playlist: MusicAssistantPlaylist;
  };
}

export interface SpeakerChangedEvent extends CustomEvent {
  detail: {
    entityId: string;
  };
}

// ============================================================================
// Utility Types
// ============================================================================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type TranslationKey = 
  | 'common.loading'
  | 'common.error'
  | 'common.no_playlists'
  | 'common.play'
  | 'common.select_speaker'
  | 'common.no_speaker_selected'
  | 'config.title'
  | 'config.config_entry_id'
  | 'config.speakers'
  | 'config.limit'
  | 'config.columns'
  | 'config.language'
  | 'error.missing_config'
  | 'error.missing_speakers'
  | 'error.load_failed';

