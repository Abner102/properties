import ProjectCover from "@/components/ui/ProjectCover";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function FeaturedProjects() {
  const { projects, loading } = usePortfolioProjects();
  const featured = projects.filter((p) => p.featured);

  if (!loading && !featured.length) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Our Work" title="Featured Software Projects" description="Real solutions powering Nigerian businesses." />
        {loading && !featured.length ? (
          <p className="text-center text-muted-foreground py-12">Loading featured projects...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.15}>
                <Link to={`/portfolio/${project.slug}`}>
                  <GlassCard className="group h-full overflow-hidden p-0">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <ProjectCover
                        src={project.image}
                        alt={project.name}
                        className="group-hover:scale-105 transition-transform duration-500"
                        sizes="33vw"
                      />
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={18} className="text-gold" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-xs text-gold font-semibold uppercase">{project.industry}</span>
                      <h3 className="font-display text-xl font-bold mt-2 mb-2">{project.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs rounded-full bg-muted">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold">
            View All Projects <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
