import ProjectCover from "@/components/ui/ProjectCover";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import PageLoader from "@/components/ui/PageLoader";
import { usePortfolioProjects } from "@/hooks/usePortfolioProjects";

export default function PortfolioContent() {
  const { projects, loading } = usePortfolioProjects();

  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Our Work</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Software Portfolio</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Real projects delivering real impact across Nigeria.</p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        {loading && !projects.length ? (
          <PageLoader variant="inline" label="Loading projects" />
        ) : !projects.length ? (
          <p className="text-center text-muted-foreground py-16">No portfolio projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.08}>
                <GlassCard className="overflow-hidden p-0 h-full flex flex-col group">
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <ProjectCover
                      src={project.image}
                      alt={project.name}
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="33vw"
                    />
                    {project.featured && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold text-background text-xs font-semibold">Featured</span>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-xs text-gold font-semibold uppercase">{project.industry}</span>
                    <h3 className="font-display text-xl font-bold mt-1">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-1 text-xs rounded-full bg-muted">{t}</span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-5">
                      <Link to={`/portfolio/${project.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full text-sm">Project Details</Button>
                      </Link>
                      {project.websiteUrl && (
                        <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 px-4 py-2 rounded-full glass text-sm hover:text-gold transition-colors">
                          <ExternalLink size={14} /> Live
                        </a>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
