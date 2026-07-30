import AppImage from "@/components/ui/AppImage";
import { Star } from "lucide-react";
import { testimonials } from "@/data/blog";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Trusted by investors, entrepreneurs, and luxury buyers across Nigeria."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.15}>
              <GlassCard className="h-full flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <AppImage
                    src={t.image}
                    alt={t.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
