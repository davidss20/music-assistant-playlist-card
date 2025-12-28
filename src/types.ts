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
  /** Show only favorites (default: false) */
  favorites_only?: boolean;
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
  /** Playlist image URL */
  image?: MusicAssistantImage;
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
}

export interface MusicAssistantImage {
  /** Image URL */
  path: string;
  /** Image provider */
  provider: string;
  /** Whether image is locally stored */
  locally_stored?: boolean;
}

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
  | 'config.favorites_only'
  | 'config.language'
  | 'error.missing_config'
  | 'error.missing_speakers'
  | 'error.load_failed';

