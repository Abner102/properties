import FadeIn from "@/components/ui/FadeIn";
import GlassCard from "@/components/ui/GlassCard";
import type { LandListing } from "@/lib/products-client";

export default function LandContent({ lands: _lands }: { lands: LandListing[] }) {
  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Land Sales</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Premium Land Listings</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Will be added shortly.</p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <FadeIn>
          <GlassCard className="text-center py-16">
            <p className="text-2xl font-display font-bold">Will be added shortly.</p>
          </GlassCard>
        </FadeIn>
      </section>
    </>
  );
}
