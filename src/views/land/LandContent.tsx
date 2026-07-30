import AppImage from "@/components/ui/AppImage";
import { MapPin, Maximize } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import { useState } from "react";
import type { LandListing } from "@/lib/products-client";

const categories = ["all", "commercial", "residential", "industrial", "estate", "investment"] as const;

export default function LandContent({ lands }: { lands: LandListing[] }) {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = lands.filter((l) => {
    if (filter !== "all" && l.category !== filter) return false;
    if (search && !l.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Land Sales</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Premium Land Listings</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Commercial, residential, industrial, and investment land across Nigeria.</p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="glass rounded-2xl p-6 mb-8">
          <input type="text" placeholder="Search land..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-background border border-border mb-4 focus:outline-none focus:border-gold/50" />
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm capitalize transition-colors ${filter === cat ? "bg-gold text-background" : "glass hover:bg-muted"}`}>
                {cat === "all" ? "All" : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((land, i) => (
            <FadeIn key={land.id} delay={i * 0.05}>
              <GlassCard className="overflow-hidden p-0 h-full group">
                <div className="relative aspect-[4/3]">
                  <AppImage src={land.image} alt={land.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs capitalize">{land.category}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold">{land.title}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1"><MapPin size={14} className="text-gold" />{land.location}</p>
                  <p className="text-xl font-bold text-gold mt-3">{formatPrice(land.price)}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mt-2"><Maximize size={14} />{land.area} sqm</p>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
