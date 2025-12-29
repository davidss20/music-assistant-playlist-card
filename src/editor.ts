/**
 * Music Assistant Playlist Card - Configuration Editor
 * Visual editor for card configuration in Home Assistant
 */

import { LitElement, html, TemplateResult, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorStyles } from './styles';
import { localize, setLanguage, getSupportedLanguages } from './localize/localize';
import type { HomeAssistant, MusicAssistantPlaylistCardConfig } from './types';

// Event helper for config changes
const fireEvent = (
  node: HTMLElement,
  type: string,
  detail?: Record<string, unknown>,
  options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean }
): void => {
  const event = new CustomEvent(type, {
    bubbles: options?.bubbles ?? true,
    cancelable: options?.cancelable ?? false,
    composed: options?.composed ?? true,
    detail,
  });
  node.dispatchEvent(event);
};

interface MusicAssistantInstance {
  entry_id: string;
  title: string;
}

@customElement('music-assistant-playlist-card-editor')
export class MusicAssistantPlaylistCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: MusicAssistantPlaylistCardConfig;

  @state() private _selectedNewSpeaker: string = '';

  @state() private _massInstances: MusicAssistantInstance[] = [];

  @state() private _loadingInstances = false;

  static styles = editorStyles;

  /**
   * Set editor configuration
   */
  public setConfig(config: MusicAssistantPlaylistCardConfig): void {
    this._config = config;

    // Update language
    if (this.hass) {
      const configLang = config.language;
      if (configLang && configLang !== 'auto') {
        setLanguage(configLang);
      } else {
        setLanguage(this.hass.language);
      }
    }
  }

  /**
   * Called when properties change
   */
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass && this._massInstances.length === 0) {
      this._loadMusicAssistantInstances();
    }
  }

  /**
   * Load Music Assistant instances from Home Assistant
   */
  private async _loadMusicAssistantInstances(): Promise<void> {
    if (!this.hass || this._loadingInstances) return;

    this._loadingInstances = true;

    try {
      // Get all config entries
      const configEntries = await this.hass.callWS<Array<{
        entry_id: string;
        domain: string;
        title: string;
        state: string;
      }>>({
        type: 'config_entries/get',
      });

      // Filter for Music Assistant entries
      this._massInstances = configEntries
        .filter(entry => entry.domain === 'music_assistant' && entry.state === 'loaded')
        .map(entry => ({
          entry_id: entry.entry_id,
          title: entry.title || 'Music Assistant',
        }));

      console.info('[music-assistant-playlist-card] Found MA instances:', this._massInstances);
    } catch (error) {
      console.error('[music-assistant-playlist-card] Failed to load MA instances:', error);
      this._massInstances = [];
    } finally {
      this._loadingInstances = false;
    }
  }

  /**
   * Dispatch config change event
   */
  private _configChanged(config: MusicAssistantPlaylistCardConfig): void {
    fireEvent(this, 'config-changed', { config });
  }

  /**
   * Handle text input changes
   */
  private _valueChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement | HTMLSelectElement;
    const configKey = target.dataset.configKey as keyof MusicAssistantPlaylistCardConfig;
    
    if (!configKey) return;

    let value: string | number | boolean = target.value;

    // Handle number inputs
    if (target.type === 'number') {
      value = parseInt(target.value, 10);
      if (isNaN(value)) return;
    }

    // Handle checkbox
    if (target.type === 'checkbox') {
      value = (target as HTMLInputElement).checked;
    }

    this._config = {
      ...this._config,
      [configKey]: value,
    };

    this._configChanged(this._config);
  }

  /**
   * Handle Music Assistant instance selection
   */
  private _instanceChanged(ev: Event): void {
    const target = ev.target as HTMLSelectElement;
    
    this._config = {
      ...this._config,
      config_entry_id: target.value,
    };

    this._configChanged(this._config);
  }

  /**
   * Handle columns selection
   */
  private _columnsChanged(ev: Event): void {
    const target = ev.target as HTMLSelectElement;
    const value = target.value;

    this._config = {
      ...this._config,
      columns: value === 'auto' ? 'auto' : parseInt(value, 10),
    };

    this._configChanged(this._config);
  }

  /**
   * Remove a speaker from the list
   */
  private _removeSpeaker(speaker: string): void {
    this._config = {
      ...this._config,
      speakers: (this._config.speakers || []).filter((s) => s !== speaker),
    };

    this._configChanged(this._config);
  }

  /**
   * Handle speaker selection from entity picker
   */
  private _speakerPickerChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = ev.detail?.value;
    console.log('[editor] Speaker picker changed:', value);
    
    if (value && !this._config.speakers?.includes(value)) {
      // Add speaker immediately
      const newSpeakers = [...(this._config.speakers || []), value];
      this._config = {
        ...this._config,
        speakers: newSpeakers,
      };
      this._configChanged(this._config);
      console.log('[editor] Added speaker:', value, 'Total:', newSpeakers.length);
    }
    
    // Force reset the picker by updating state
    this._selectedNewSpeaker = '';
    this.requestUpdate();
  }

  /**
   * Get friendly name for an entity
   */
  private _getEntityName(entityId: string): string {
    if (!this.hass) return entityId;
    const entity = this.hass.states[entityId];
    return entity?.attributes?.friendly_name || entityId;
  }

  /**
   * Render the editor
   */
  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    const supportedLanguages = getSupportedLanguages();

    return html`
      <div class="editor-container">
        <!-- Basic Settings -->
        <div class="section-title">Basic Settings</div>

        <div class="form-row">
          <label class="form-label">${localize('config.title')}</label>
          <ha-textfield
            .value=${this._config.title || ''}
            .configKey=${'title'}
            data-config-key="title"
            @input=${this._valueChanged}
            placeholder="My Playlists"
          ></ha-textfield>
        </div>

        <div class="form-row">
          <label class="form-label">${localize('config.config_entry_id')}</label>
          ${this._massInstances.length > 0
            ? html`
                <ha-select
                  .value=${this._config.config_entry_id || ''}
                  @selected=${this._instanceChanged}
                  @closed=${(e: Event) => e.stopPropagation()}
                >
                  <mwc-list-item value="">Select instance...</mwc-list-item>
                  ${this._massInstances.map(
                    (instance) => html`
                      <mwc-list-item value=${instance.entry_id}>
                        ${instance.title}
                      </mwc-list-item>
                    `
                  )}
                </ha-select>
              `
            : html`
                <ha-textfield
                  .value=${this._config.config_entry_id || ''}
                  data-config-key="config_entry_id"
                  @input=${this._valueChanged}
                  placeholder="01KD2Q1R471MB35ZRQ82C6CN2S"
                  required
                ></ha-textfield>
              `}
        </div>

        <!-- Speakers -->
        <div class="section-title">${localize('config.speakers')}</div>

        <div class="form-row">
          ${this._config.speakers && this._config.speakers.length > 0
            ? html`
                <div class="speakers-list">
                  ${this._config.speakers.map(
                    (speaker) => html`
                      <div class="speaker-chip">
                        <ha-icon icon="mdi:speaker"></ha-icon>
                        <span>${this._getEntityName(speaker)}</span>
                        <button
                          class="remove-btn"
                          @click=${() => this._removeSpeaker(speaker)}
                          title="Remove"
                        >
                          <ha-icon icon="mdi:close"></ha-icon>
                        </button>
                      </div>
                    `
                  )}
                </div>
              `
            : nothing}

          <div class="add-speaker">
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._selectedNewSpeaker}
              .includeDomains=${['media_player']}
              @value-changed=${this._speakerPickerChanged}
              allow-custom-entity
              label="Select speaker to add"
            ></ha-entity-picker>
          </div>
        </div>

        <!-- Display Settings -->
        <div class="section-title">Display Settings</div>

        <div class="form-row">
          <label class="form-label">${localize('config.limit')}</label>
          <ha-textfield
            type="number"
            .value=${String(this._config.limit || 25)}
            data-config-key="limit"
            @input=${this._valueChanged}
            min="1"
            max="1000"
          ></ha-textfield>
        </div>

        <div class="form-row">
          <label class="form-label">${localize('config.columns')}</label>
          <ha-select
            .value=${String(this._config.columns || 'auto')}
            @selected=${this._columnsChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="auto">${localize('config.columns_auto')}</mwc-list-item>
            <mwc-list-item value="2">2</mwc-list-item>
            <mwc-list-item value="3">3</mwc-list-item>
            <mwc-list-item value="4">4</mwc-list-item>
            <mwc-list-item value="5">5</mwc-list-item>
            <mwc-list-item value="6">6</mwc-list-item>
          </ha-select>
        </div>

        <!-- Language Settings -->
        <div class="section-title">${localize('config.language')}</div>

        <div class="form-row">
          <ha-select
            .value=${this._config.language || 'auto'}
            data-config-key="language"
            @selected=${this._valueChanged}
            @closed=${(e: Event) => e.stopPropagation()}
          >
            <mwc-list-item value="auto">${localize('config.language_auto')}</mwc-list-item>
            ${supportedLanguages.map(
              (lang) => html`
                <mwc-list-item value=${lang}>${lang.toUpperCase()}</mwc-list-item>
              `
            )}
          </ha-select>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'music-assistant-playlist-card-editor': MusicAssistantPlaylistCardEditor;
  }
}
