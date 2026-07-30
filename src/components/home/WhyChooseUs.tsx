"use client";

import { whyChooseUs } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { Building2, Code2, Handshake, Scale, TrendingUp, Headphones } from "lucide-react";

const icons = [Building2, Code2, Handshake, Scale, TrendingUp, Headphones];

export default function WhyChooseUs() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Why Us"
          title="Clarity, craft, and compounding value"
          description="One partner for property, technology, and long-term growth."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
          {whyChooseUs.map((item, i) => {
            const Icon = icons[i] || Building2;
            return (
              <FadeIn key={item.title} delay={i * 0.07}>
                <div className="group">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold">
                      <Icon size={18} />
                    </span>
                    <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
