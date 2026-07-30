/** Keep upload paths as /uploads/... — served from public/uploads in dev and by Express in production. */
export function resolveMediaUrl(url?: string | null): string {
  if (!url) return "";

  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  // Convert legacy /api/media paths back to /uploads
  if (url.startsWith("/api/media/")) {
    return `/uploads/${url.slice("/api/media/".length)}`;
  }

  if (url.startsWith("/uploads/")) {
    return url;
  }

  if (url.startsWith("uploads/")) {
    return `/${url}`;
  }

  return url.startsWith("/") ? url : `/${url}`;
}

export function resolveMediaUrls(urls: string[]): string[] {
  return urls.map((url) => resolveMediaUrl(url)).filter(Boolean);
}
