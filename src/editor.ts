/**
 * Music Assistant Playlist Card - Configuration Editor
 * Visual editor for card configuration in Home Assistant
 */

import { LitElement, html, TemplateResult, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { editorStyles } from './styles';
import { localize, setLanguage, getSupportedLanguages } from './localize/localize';
import { resolveMusicAssistantEntryId } from './mass-api';
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

interface HaFormSchema {
  name: string;
  selector: Record<string, unknown>;
  required?: boolean;
}

@customElement('music-assistant-playlist-card-editor')
export class MusicAssistantPlaylistCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @state() private _config!: MusicAssistantPlaylistCardConfig;

  @state() private _helpersLoaded = false;

  static styles = editorStyles;

  /**
   * Set editor configuration
   */
  public setConfig(config: MusicAssistantPlaylistCardConfig): void {
    this._config = config;

    if (this.hass) {
      const configLang = config.language;
      if (configLang && configLang !== 'auto') {
        setLanguage(configLang);
      } else {
        setLanguage(this.hass.language);
      }
    }
  }

  protected async firstUpdated(): Promise<void> {
    await this._loadHaComponents();
    await this._autoDetectMassInstance();
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);

    if (changedProps.has('hass') && this.hass && this._config && !this._config.config_entry_id) {
      this._autoDetectMassInstance();
    }
  }

  /**
   * Ensure ha-form / ha-selector are registered in the Lovelace editor.
   */
  private async _loadHaComponents(): Promise<void> {
    if (customElements.get('ha-form') && customElements.get('ha-selector')) {
      this._helpersLoaded = true;
      return;
    }

    const loadCardHelpers = (
      window as unknown as {
        loadCardHelpers?: () => Promise<{
          createCardElement: (config: Record<string, unknown>) => Promise<{
            constructor?: { getConfigElement?: () => Promise<unknown> };
          }>;
        }>;
      }
    ).loadCardHelpers;

    try {
      if (loadCardHelpers) {
        const helpers = await loadCardHelpers();
        const card = await helpers.createCardElement({ type: 'entities', entities: [] });
        await card?.constructor?.getConfigElement?.();
      }
    } catch (error) {
      console.warn('[music-assistant-playlist-card] Could not preload HA form components:', error);
    }

    this._helpersLoaded = true;
  }

  /**
   * Auto-select the Music Assistant instance when only one exists,
   * or when speakers already point at a Music Assistant player.
   */
  private async _autoDetectMassInstance(): Promise<void> {
    if (!this.hass || !this._config || this._config.config_entry_id) {
      return;
    }

    try {
      const entryId = await resolveMusicAssistantEntryId(
        this.hass.callWS.bind(this.hass),
        this._config.speakers || []
      );

      if (entryId) {
        this._config = {
          ...this._config,
          config_entry_id: entryId,
        };
        this._configChanged(this._config);
      }
    } catch (error) {
      console.warn('[music-assistant-playlist-card] Failed to auto-detect MA instance:', error);
    }
  }

  /**
   * Dispatch config change event
   */
  private _configChanged(config: MusicAssistantPlaylistCardConfig): void {
    fireEvent(this, 'config-changed', { config });
  }

  /**
   * Handle ha-form value changes
   */
  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = ev.detail?.value as Partial<MusicAssistantPlaylistCardConfig> | undefined;
    if (!value) {
      return;
    }

    let columns: number | 'auto' = 'auto';
    const rawColumns = value.columns as unknown;
    if (rawColumns === 'auto' || rawColumns === undefined || rawColumns === null || rawColumns === '') {
      columns = 'auto';
    } else {
      const parsed = typeof rawColumns === 'number' ? rawColumns : parseInt(String(rawColumns), 10);
      columns = Number.isNaN(parsed) ? 'auto' : parsed;
    }

    const speakers = Array.isArray(value.speakers)
      ? value.speakers.filter((speaker): speaker is string => typeof speaker === 'string' && speaker.length > 0)
      : typeof value.speakers === 'string' && value.speakers
        ? [value.speakers]
        : [];

    this._config = {
      ...this._config,
      ...value,
      type: this._config.type,
      columns,
      speakers,
    };

    this._configChanged(this._config);

    if (!this._config.config_entry_id && speakers.length > 0) {
      this._autoDetectMassInstance();
    }
  }

  private _computeLabel = (schema: HaFormSchema): string => {
    return localize(`config.${schema.name}`);
  };

  private _computeHelper = (schema: HaFormSchema): string => {
    if (schema.name === 'config_entry_id') {
      return localize('config.config_entry_helper');
    }
    if (schema.name === 'speakers') {
      return localize('config.speakers_helper');
    }
    if (schema.name === 'card_height') {
      return localize('config.card_height_helper');
    }
    return '';
  };

  private _getSchema(): HaFormSchema[] {
    const supportedLanguages = getSupportedLanguages();

    return [
      {
        name: 'config_entry_id',
        required: true,
        selector: {
          config_entry: {
            integration: 'music_assistant',
          },
        },
      },
      {
        name: 'speakers',
        required: true,
        selector: {
          entity: {
            multiple: true,
            filter: {
              domain: 'media_player',
              integration: 'music_assistant',
            },
          },
        },
      },
      {
        name: 'title',
        selector: { text: {} },
      },
      {
        name: 'limit',
        selector: { number: { min: 1, max: 1000, mode: 'box' } },
      },
      {
        name: 'card_height',
        selector: { number: { min: 400, max: 1000, mode: 'box' } },
      },
      {
        name: 'columns',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'auto', label: localize('config.columns_auto') },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
              { value: '6', label: '6' },
            ],
          },
        },
      },
      {
        name: 'language',
        selector: {
          select: {
            mode: 'dropdown',
            options: [
              { value: 'auto', label: localize('config.language_auto') },
              ...supportedLanguages.map((lang) => ({
                value: lang,
                label: lang.toUpperCase(),
              })),
            ],
          },
        },
      },
    ];
  }

  /**
   * Render the editor
   */
  protected render(): TemplateResult {
    if (!this.hass || !this._config) {
      return html``;
    }

    if (!this._helpersLoaded && !customElements.get('ha-form')) {
      return html`<div class="editor-container">${localize('common.loading')}</div>`;
    }

    const data = {
      ...this._config,
      config_entry_id: this._config.config_entry_id || '',
      speakers: this._config.speakers || [],
      title: this._config.title || '',
      limit: this._config.limit ?? 50,
      card_height: this._config.card_height ?? 680,
      columns: String(this._config.columns ?? 'auto'),
      language: this._config.language || 'auto',
    };

    return html`
      <div class="editor-container">
        <ha-form
          .hass=${this.hass}
          .data=${data}
          .schema=${this._getSchema()}
          .computeLabel=${this._computeLabel}
          .computeHelper=${this._computeHelper}
          @value-changed=${this._valueChanged}
        ></ha-form>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'music-assistant-playlist-card-editor': MusicAssistantPlaylistCardEditor;
  }
}
