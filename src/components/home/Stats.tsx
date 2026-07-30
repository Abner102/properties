"use client";

import { useState } from "react";
import { stats } from "@/data/site";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import FadeIn from "@/components/ui/FadeIn";

export default function Stats() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="text-center glass rounded-2xl p-6">
                <p className="text-3xl md:text-4xl font-bold text-gold">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-muted-foreground text-xs md:text-sm">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
