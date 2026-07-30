"use client";

import { stats } from "@/data/site";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FadeIn from "@/components/ui/FadeIn";

export default function Stats() {
  return (
    <section className="border-y border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <div className="text-center md:text-left md:border-l md:border-border md:pl-6 first:md:border-l-0 first:md:pl-0">
                <p className="font-display text-3xl md:text-4xl text-gold leading-none">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-[11px] md:text-xs uppercase tracking-[0.16em] text-muted-foreground leading-snug">
                  {stat.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
