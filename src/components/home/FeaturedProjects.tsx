import ProjectCover from "@/components/ui/ProjectCover";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import PageLoader from "@/components/ui/PageLoader";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function FeaturedProjects() {
  const { projects, loading } = usePortfolioProjects();
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  if (!loading && !featured.length) return null;

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <SectionHeading
            subtitle="Portfolio"
            title="Software that ships"
            description="Digital products powering Nigerian businesses."
            align="left"
            className="mb-0"
          />
          <Link to="/portfolio" className="text-sm font-semibold tracking-wide uppercase text-gold link-underline inline-flex items-center gap-1 shrink-0">
            View all <ArrowUpRight size={14} />
          </Link>
        </div>

        {loading && !featured.length ? (
          <PageLoader variant="inline" label="Loading projects" />
        ) : (
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {featured.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.08}>
                <Link to={`/portfolio/${project.slug}`} className="group block">
                  <div className="relative aspect-video overflow-hidden bg-muted mb-5">
                    <ProjectCover
                      src={project.image}
                      alt={project.name}
                      className="transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-gold font-semibold">
                    {project.industry}
                  </span>
                  <h3 className="font-display text-2xl mt-2 group-hover:text-gold transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
