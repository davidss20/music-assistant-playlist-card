/**
 * Music Assistant Playlist Card
 * A custom Home Assistant card for displaying Music Assistant playlists
 * with speaker selection and playback functionality.
 */

import { LitElement, html, TemplateResult, PropertyValues, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { cardStyles } from './styles';
import { localize, setLanguage } from './localize/localize';
import type {
  HomeAssistant,
  MusicAssistantPlaylistCardConfig,
  MusicAssistantPlaylist,
  MusicAssistantLibraryResponse,
  HassEntity,
} from './types';

// Card information for HACS
const CARD_VERSION = '1.0.0';

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

  // Apply styles
  static styles = cardStyles;

  /**
   * Set card configuration
   */
  public setConfig(config: MusicAssistantPlaylistCardConfig): void {
    if (!config.config_entry_id) {
      throw new Error(localize('error.missing_config'));
    }

    if (!config.speakers || config.speakers.length === 0) {
      throw new Error(localize('error.missing_speakers'));
    }

    this._config = {
      limit: 25,
      favorites_only: false,
      columns: 'auto',
      ...config,
    };

    // Set default selected speaker
    if (!this._selectedSpeaker && this._config.speakers.length > 0) {
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
   * Card size for grid
   */
  public getCardSize(): number {
    return 4;
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
      limit: 25,
      favorites_only: false,
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

      // Load playlists if config is ready
      if (this._config && changedProps.get('hass') === undefined) {
        this._loadPlaylists();
      }
    }
  }

  /**
   * Load playlists from Music Assistant
   */
  private async _loadPlaylists(): Promise<void> {
    if (!this.hass || !this._config) return;

    this._loading = true;
    this._error = null;

    try {
      const response = await this.hass.callWS<MusicAssistantLibraryResponse>({
        type: 'music_assistant/get_library',
        config_entry_id: this._config.config_entry_id,
        media_type: 'playlist',
        favorite: this._config.favorites_only ?? false,
        limit: this._config.limit ?? 25,
        offset: 0,
      });

      this._playlists = response.items || [];
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
      await this.hass.callService('music_assistant', 'play_media', {
        media_id: playlist.uri,
        media_type: 'playlist',
        entity_id: this._selectedSpeaker,
      });
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to play playlist:', error);
    }
  }

  /**
   * Handle speaker selection change
   */
  private _handleSpeakerChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this._selectedSpeaker = select.value;
  }

  /**
   * Get friendly name for an entity
   */
  private _getEntityName(entityId: string): string {
    if (!this.hass) return entityId;
    const entity: HassEntity | undefined = this.hass.states[entityId];
    return entity?.attributes?.friendly_name || entityId;
  }

  /**
   * Get image URL for a playlist
   */
  private _getPlaylistImage(playlist: MusicAssistantPlaylist): string | null {
    if (!playlist.image?.path) return null;
    
    // If it's a local path, construct the full URL
    if (playlist.image.path.startsWith('/')) {
      return playlist.image.path;
    }
    
    return playlist.image.path;
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
   * Render speaker selector
   */
  private _renderSpeakerSelector(): TemplateResult {
    return html`
      <div class="speaker-selector">
        <ha-icon icon="mdi:speaker"></ha-icon>
        <select
          class="speaker-select"
          .value=${this._selectedSpeaker}
          @change=${this._handleSpeakerChange}
        >
          <option value="" disabled>
            ${localize('common.select_speaker')}
          </option>
          ${this._config.speakers.map(
            (speaker) => html`
              <option value=${speaker} ?selected=${speaker === this._selectedSpeaker}>
                ${this._getEntityName(speaker)}
              </option>
            `
          )}
        </select>
      </div>
    `;
  }

  /**
   * Render playlist grid
   */
  private _renderPlaylistGrid(): TemplateResult {
    const columnsClass =
      this._config.columns && this._config.columns !== 'auto'
        ? `columns-${this._config.columns}`
        : '';

    return html`
      <div class="playlist-grid ${columnsClass}">
        ${this._playlists.map((playlist) => this._renderPlaylistItem(playlist))}
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
            ? html`<p class="playlist-meta">${playlist.track_count} tracks</p>`
            : nothing}
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

    return html`
      <ha-card>
        ${this._config.title
          ? html`
              <div class="card-header">
                <h2 class="card-title">${this._config.title}</h2>
              </div>
            `
          : nothing}
        <div class="card-content">
          ${this._renderSpeakerSelector()}
          ${this._loading
            ? this._renderLoading()
            : this._error
              ? this._renderError()
              : this._playlists.length === 0
                ? this._renderEmpty()
                : this._renderPlaylistGrid()}
        </div>
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
  documentationURL: 'https://github.com/yourusername/music-assistant-playlist-card',
});

