import AppImage from "@/components/ui/AppImage";
import { testimonials } from "@/data/blog";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

export default function Testimonials() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Testimonials"
          title="Trusted by discerning clients"
          description="Investors, founders, and buyers across Nigeria."
        />

        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <figure className="h-full flex flex-col border-t border-gold/40 pt-8">
                <blockquote className="font-display text-xl md:text-2xl leading-snug text-foreground/90 flex-1 mb-8">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <AppImage
                    src={t.image}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover size-11"
                  />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground tracking-wide">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
