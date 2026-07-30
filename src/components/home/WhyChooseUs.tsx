"use client";

import { whyChooseUs } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import { Building2, Code2, Handshake, Scale, TrendingUp, Headphones } from "lucide-react";

const icons = [Building2, Code2, Handshake, Scale, TrendingUp, Headphones];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading subtitle="Why Us" title="Why Choose Endless Infinity" description="Trust, innovation, and excellence in every engagement." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i] || Building2;
            return (
              <FadeIn key={item.title} delay={i * 0.1}>
                <GlassCard className="h-full">
                  <div className="w-12 h-12 rounded-xl gold-gradient flex items-center justify-center mb-4">
                    <Icon size={22} className="text-background" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </GlassCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
