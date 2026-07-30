import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { portfolioProjects } from "@/data/portfolio";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export default function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/404" replace />;

  return (
    <article>
      <section className="pt-24">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>

        <div className="relative aspect-[21/9] max-w-6xl mx-auto px-6">
          <AppImage src={project.image} alt={project.name} fill className="object-cover rounded-2xl" priority sizes="100vw" />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-semibold uppercase">{project.industry}</span>
            <span className="text-sm text-muted-foreground">{project.status}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold">{project.name}</h1>
          <p className="text-xl text-muted-foreground mt-4 leading-relaxed">{project.description}</p>

          {project.websiteUrl && (
            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-6 text-gold hover:text-gold-light font-semibold">
              <ExternalLink size={18} /> Visit Live Website
            </a>
          )}

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {project.images.map((img, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                <AppImage src={img} alt={`${project.name} screenshot ${i + 1}`} fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>

          <GlassCard className="mt-12">
            <h2 className="font-display text-2xl font-bold mb-4">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
          </GlassCard>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <GlassCard>
              <h2 className="font-display text-xl font-bold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-gold shrink-0" />{f}
                  </li>
                ))}
              </ul>
            </GlassCard>
            <GlassCard>
              <h2 className="font-display text-xl font-bold mb-4">Outcomes</h2>
              <ul className="space-y-2">
                {project.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle size={14} className="text-gold shrink-0" />{o}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

          <GlassCard className="mt-6">
            <h2 className="font-display text-xl font-bold mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="px-4 py-2 rounded-full glass text-sm font-medium">{t}</span>
              ))}
            </div>
          </GlassCard>

          <div className="text-center mt-12">
            <Link to="/contact"><Button size="lg">Start Your Project</Button></Link>
          </div>
        </div>
      </section>
    </article>
  );
}
