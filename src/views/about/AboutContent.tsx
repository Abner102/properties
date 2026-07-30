import { Link } from "react-router-dom";
import { timeline, coreValues, companyGoals } from "@/data/founders";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

export default function AboutContent() {
  return (
    <>
      <section className="relative pt-32 pb-20 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">About Us</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">Two Developers. One Vision. Endless Possibilities.</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Endless Infinity Properties was born from a belief that technology and real estate are the most powerful wealth-building tools of our generation.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          <FadeIn><GlassCard>
            <h2 className="font-display text-2xl font-bold mb-4 text-gold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">To democratize access to premium investment opportunities by leveraging technology, making it simple for Nigerians and global investors to build wealth.</p>
          </GlassCard></FadeIn>
          <FadeIn delay={0.1}><GlassCard>
            <h2 className="font-display text-2xl font-bold mb-4 text-gold">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">To become Africa&apos;s most trusted technology-driven real estate and software brand — where every transaction is transparent and every solution is world-class.</p>
          </GlassCard></FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Core Values" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <GlassCard><h3 className="font-bold text-gold mb-2">{v.title}</h3><p className="text-sm text-muted-foreground">{v.description}</p></GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Company Goals" />
          <div className="max-w-2xl mx-auto space-y-3">
            {companyGoals.map((g, i) => (
              <FadeIn key={g} delay={i * 0.08}>
                <div className="flex items-start gap-3 glass rounded-xl p-4">
                  <span className="text-gold font-bold">{i + 1}.</span>
                  <p className="text-sm">{g}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Our Journey" title="Company Timeline" />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gold/30" />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <FadeIn key={item.year} delay={i * 0.1}>
                  <div className="relative pl-12">
                    <div className="absolute left-2.5 w-3 h-3 rounded-full bg-gold" />
                    <GlassCard>
                      <span className="text-gold font-bold">{item.year}</span>
                      <h3 className="font-display text-xl font-bold mt-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </GlassCard>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <SectionHeading subtitle="Leadership" title="Meet The Founders" />
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our co-founders combine software engineering and real estate investment to deliver end-to-end value for clients.
            </p>
            <Link to="/team">
              <Button size="lg">Meet Our Team</Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
