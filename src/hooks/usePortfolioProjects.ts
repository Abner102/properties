import { useEffect, useState } from "react";
import type { PortfolioProject } from "@/data/portfolio";
import { mapApiProject } from "@/lib/portfolio-mapper";

function parseProjectList(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data as Record<string, unknown>[];
  if (data && typeof data === "object" && Array.isArray((data as { projects?: unknown }).projects)) {
    return (data as { projects: Record<string, unknown>[] }).projects;
  }
  return [];
}

async function fetchProjectList(): Promise<Record<string, unknown>[]> {
  const endpoints = ["/api/projects", "/api/public/projects"];

  for (const url of endpoints) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      const data = await res.json();
      return parseProjectList(data);
    } catch {
      /* try next endpoint */
    }
  }

  return [];
}

export function usePortfolioProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetchProjectList()
      .then((list) => {
        if (!active) return;
        setProjects(list.map((item) => mapApiProject(item)));
        setError(false);
      })
      .catch(() => {
        if (!active) return;
        setProjects([]);
        setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, error };
}

export function usePortfolioProject(slug?: string) {
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setNotFound(true);
      return;
    }

    let active = true;
    setLoading(true);
    setNotFound(false);

    const load = async () => {
      const slugPath = encodeURIComponent(slug);
      const endpoints = [`/api/projects/${slugPath}`, `/api/public/projects/${slugPath}`];

      for (const url of endpoints) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          const raw = (data?.project ?? data) as Record<string, unknown>;
          if (raw && typeof raw === "object" && raw.slug) {
            if (!active) return;
            setProject(mapApiProject(raw));
            setNotFound(false);
            return;
          }
        } catch {
          /* try next endpoint */
        }
      }

      try {
        const list = await fetchProjectList();
        const match = list.find((item) => item.slug === slug);
        if (match && active) {
          setProject(mapApiProject(match));
          setNotFound(false);
          return;
        }
      } catch {
        /* fall through */
      }

      if (active) {
        setProject(null);
        setNotFound(true);
      }
    };

    load().finally(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  return { project, loading, notFound };
}
