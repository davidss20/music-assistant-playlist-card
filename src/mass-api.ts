/**
 * Helpers for Music Assistant Home Assistant API calls
 */

export interface EntityRegistryEntry {
  entity_id: string;
  platform?: string;
  config_entry_id?: string | null;
}

/**
 * Unwrap Home Assistant service call responses.
 * call_service with return_response returns { context, response }.
 */
export function unwrapServiceResponse<T extends Record<string, unknown>>(
  result: unknown
): T | undefined {
  if (!result || typeof result !== 'object') {
    return undefined;
  }

  const obj = result as Record<string, unknown>;
  if (obj.response && typeof obj.response === 'object') {
    return obj.response as T;
  }

  return obj as T;
}

/**
 * Extract the first array of items from a Music Assistant service payload.
 * Handles { items }, { playlists }, nested { response }, and entry-id keyed objects.
 */
export function extractArrayItems<T>(payload: unknown): T[] {
  if (!payload) {
    return [];
  }
  if (Array.isArray(payload)) {
    return payload as T[];
  }
  if (typeof payload !== 'object') {
    return [];
  }

  const obj = payload as Record<string, unknown>;

  if (obj.response !== undefined) {
    const nested = extractArrayItems<T>(obj.response);
    if (nested.length > 0) {
      return nested;
    }
  }

  const preferredKeys = ['items', 'playlists', 'tracks', 'albums', 'artists'];
  for (const key of preferredKeys) {
    if (Array.isArray(obj[key])) {
      return obj[key] as T[];
    }
  }

  for (const value of Object.values(obj)) {
    if (Array.isArray(value)) {
      return value as T[];
    }
    if (value && typeof value === 'object') {
      const nested = extractArrayItems<T>(value);
      if (nested.length > 0) {
        return nested;
      }
    }
  }

  return [];
}

/**
 * Find Music Assistant config entry IDs from the entity registry.
 */
export function uniqueMusicAssistantEntryIds(entries: EntityRegistryEntry[]): string[] {
  const ids = new Set<string>();
  for (const entry of entries) {
    if (entry.platform === 'music_assistant' && entry.config_entry_id) {
      ids.add(entry.config_entry_id);
    }
  }
  return [...ids];
}

/**
 * Resolve a Music Assistant config_entry_id from speakers or the only installed instance.
 */
export async function resolveMusicAssistantEntryId(
  callWS: <T>(msg: { type: string; [key: string]: unknown }) => Promise<T>,
  preferredEntityIds: string[] = []
): Promise<string | undefined> {
  const entries = await callWS<EntityRegistryEntry[]>({
    type: 'config/entity_registry/list',
  });

  for (const entityId of preferredEntityIds) {
    const match = entries.find(
      (entry) =>
        entry.entity_id === entityId &&
        entry.platform === 'music_assistant' &&
        entry.config_entry_id
    );
    if (match?.config_entry_id) {
      return match.config_entry_id;
    }
  }

  const ids = uniqueMusicAssistantEntryIds(entries);
  if (ids.length === 1) {
    return ids[0];
  }

  return undefined;
}
