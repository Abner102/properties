export function parseJsonArray<T = string>(value: string, fallback: T[] = []): T[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function toJsonArray(value: unknown): string {
  return JSON.stringify(value ?? []);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseJsonObject<T extends Record<string, unknown>>(
  value: string,
  fallback: T = {} as T
): T {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}
