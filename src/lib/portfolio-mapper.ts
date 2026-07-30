import type { PortfolioProject } from "@/data/portfolio";
import { resolveMediaUrl, resolveMediaUrls } from "@/lib/media-url";

export function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string" && v.length > 0);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return toStringArray(parsed);
      } catch {
        /* fall through */
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

export function mapApiProject(raw: Record<string, unknown>): PortfolioProject {
  const images = resolveMediaUrls(toStringArray(raw.images));
  const screenshots = resolveMediaUrls(toStringArray(raw.screenshots));
  const gallery = [...images, ...screenshots.filter((url) => !images.includes(url))];
  const cover = gallery[0] || "";

  return {
    id: String(raw._id || raw.id || raw.slug || ""),
    slug: String(raw.slug || ""),
    name: String(raw.name || ""),
    description: String(raw.description || ""),
    overview: String(raw.overview || raw.description || ""),
    features: toStringArray(raw.features),
    outcomes: toStringArray(raw.outcomes),
    technologies: toStringArray(raw.technologies),
    industry: String(raw.industry || "Technology"),
    status: String(raw.status || "Live"),
    websiteUrl: String(raw.liveUrl || raw.websiteUrl || ""),
    githubUrl: String(raw.githubUrl || ""),
    image: cover,
    images: gallery,
    featured: !!raw.featured,
  };
}
