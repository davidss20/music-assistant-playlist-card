/**
 * Localization system for Music Assistant Playlist Card
 * Supports multiple languages with auto-detection from Home Assistant
 */

import * as en from './languages/en.json';
import * as he from './languages/he.json';
import * as de from './languages/de.json';
import * as fr from './languages/fr.json';
import * as es from './languages/es.json';

// Type for translation structure
type TranslationDict = typeof en;

// Available languages
const languages: Record<string, TranslationDict> = {
  en,
  he,
  de,
  fr,
  es,
};

// Default language
const DEFAULT_LANGUAGE = 'en';

// Current language cache
let currentLanguage = DEFAULT_LANGUAGE;

/**
 * Set the current language for translations
 * @param lang - Language code (e.g., 'en', 'he', 'de')
 */
export function setLanguage(lang: string): void {
  // Extract base language code (e.g., 'en-US' -> 'en')
  const baseLang = lang.split('-')[0].toLowerCase();
  
  if (languages[baseLang]) {
    currentLanguage = baseLang;
  } else {
    currentLanguage = DEFAULT_LANGUAGE;
  }
}

/**
 * Get the current language code
 */
export function getLanguage(): string {
  return currentLanguage;
}

/**
 * Get list of supported language codes
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(languages);
}

/**
 * Get a nested value from an object using a dot-notation path
 */
function getNestedValue(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return typeof current === 'string' ? current : undefined;
}

/**
 * Localize a string key to the current language
 * Falls back to English if translation not found
 * 
 * @param key - Translation key in dot notation (e.g., 'common.loading')
 * @param substitutions - Optional key-value pairs for string substitution
 * @returns Translated string
 * 
 * @example
 * localize('common.loading') // "Loading playlists..."
 * localize('error.play_failed') // "Failed to play playlist"
 */
export function localize(key: string, substitutions?: Record<string, string>): string {
  // Try current language first
  let translation = getNestedValue(
    languages[currentLanguage] as unknown as Record<string, unknown>,
    key
  );
  
  // Fall back to English
  if (!translation && currentLanguage !== DEFAULT_LANGUAGE) {
    translation = getNestedValue(
      languages[DEFAULT_LANGUAGE] as unknown as Record<string, unknown>,
      key
    );
  }
  
  // Return key if no translation found
  if (!translation) {
    console.warn(`[music-assistant-playlist-card] Missing translation for key: ${key}`);
    return key;
  }
  
  // Apply substitutions if provided
  if (substitutions) {
    for (const [placeholder, value] of Object.entries(substitutions)) {
      translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), value);
    }
  }
  
  return translation;
}

/**
 * Create a localize function bound to a specific language
 * Useful when you need translations in a specific language regardless of current setting
 */
export function createLocalizer(lang: string): (key: string, substitutions?: Record<string, string>) => string {
  const baseLang = lang.split('-')[0].toLowerCase();
  const targetLang = languages[baseLang] ? baseLang : DEFAULT_LANGUAGE;
  
  return (key: string, substitutions?: Record<string, string>): string => {
    let translation = getNestedValue(
      languages[targetLang] as unknown as Record<string, unknown>,
      key
    );
    
    if (!translation && targetLang !== DEFAULT_LANGUAGE) {
      translation = getNestedValue(
        languages[DEFAULT_LANGUAGE] as unknown as Record<string, unknown>,
        key
      );
    }
    
    if (!translation) {
      return key;
    }
    
    if (substitutions) {
      for (const [placeholder, value] of Object.entries(substitutions)) {
        translation = translation.replace(new RegExp(`{${placeholder}}`, 'g'), value);
      }
    }
    
    return translation;
  };
}

