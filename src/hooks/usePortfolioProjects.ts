import { useEffect, useState } from "react";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";
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

function mergeProjectWithStatic(apiProject: PortfolioProject): PortfolioProject {
  const staticProject = portfolioProjects.find((project) => project.slug === apiProject.slug);
  if (!staticProject) return apiProject;

  return {
    ...apiProject,
    ...staticProject,
    websiteUrl: apiProject.websiteUrl || staticProject.websiteUrl,
    githubUrl: apiProject.githubUrl || staticProject.githubUrl,
    status: apiProject.status || staticProject.status,
  };
}

function mergeWithStaticProjects(apiProjects: PortfolioProject[]): PortfolioProject[] {
  const staticSlugs = new Set(portfolioProjects.map((project) => project.slug));
  const apiBySlug = new Map(apiProjects.map((project) => [project.slug, project]));

  const knownProjects = portfolioProjects.map((project) => {
    const apiProject = apiBySlug.get(project.slug);
    if (!apiProject) return project;

    return mergeProjectWithStatic(apiProject);
  });

  const apiOnlyProjects = apiProjects.filter((project) => project.slug && !staticSlugs.has(project.slug));

  return [...knownProjects, ...apiOnlyProjects];
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
        const mappedProjects = list.map((item) => mapApiProject(item));
        setProjects(mergeWithStaticProjects(mappedProjects));
        setError(false);
      })
      .catch(() => {
        if (!active) return;
        setProjects(portfolioProjects);
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
            setProject(mergeProjectWithStatic(mapApiProject(raw)));
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
          setProject(mergeProjectWithStatic(mapApiProject(match)));
          setNotFound(false);
          return;
        }
      } catch {
        /* fall through */
      }

      const staticMatch = portfolioProjects.find((item) => item.slug === slug);
      if (staticMatch && active) {
        setProject(staticMatch);
        setNotFound(false);
        return;
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
