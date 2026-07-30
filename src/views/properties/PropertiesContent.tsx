"use client";

import { useState, useMemo } from "react";
import { Search, Grid3X3, Map } from "lucide-react";
import type { Property } from "@/data/properties";
import PropertyCard from "@/components/properties/PropertyCard";
import FadeIn from "@/components/ui/FadeIn";

export default function PropertiesContent({ properties }: { properties: Property[] }) {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [view, setView] = useState<"grid" | "map">("grid");

  const cities = useMemo(() => [...new Set(properties.map((p) => p.city))], [properties]);
  const types = useMemo(() => [...new Set(properties.map((p) => p.type))], [properties]);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
      if (city && p.city !== city) return false;
      if (type && p.type !== type) return false;
      if (minPrice && p.price < Number(minPrice)) return false;
      if (maxPrice && p.price > Number(maxPrice)) return false;
      if (bedrooms && p.bedrooms < Number(bedrooms)) return false;
      return true;
    });
  }, [search, city, type, minPrice, maxPrice, bedrooms, properties]);

  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              Portfolio
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              Premium Properties
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional investment opportunities across Nigeria&apos;s finest locations.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search properties..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView("grid")}
                className={`p-3 rounded-xl transition-colors ${view === "grid" ? "bg-gold text-background" : "glass hover:bg-muted"}`}
                aria-label="Grid view"
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setView("map")}
                className={`p-3 rounded-xl transition-colors ${view === "map" ? "bg-gold text-background" : "glass hover:bg-muted"}`}
                aria-label="Map view"
              >
                <Map size={18} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-gold/50"
            >
              <option value="">All Cities</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-gold/50"
            >
              <option value="">All Types</option>
              {types.map((t) => (
                <option key={t} value={t} className="capitalize">{t}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-gold/50"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-gold/50"
            />
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-muted border border-border text-sm focus:outline-none focus:border-gold/50"
            >
              <option value="">Bedrooms</option>
              {[1, 2, 3, 4, 5, 6].map((b) => (
                <option key={b} value={b}>{b}+ Beds</option>
              ))}
            </select>
            <button
              onClick={() => { setSearch(""); setCity(""); setType(""); setMinPrice(""); setMaxPrice(""); setBedrooms(""); }}
              className="px-3 py-2.5 rounded-xl border border-gold/30 text-gold text-sm hover:bg-gold/10 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6">
          Showing {filtered.length} of {properties.length} properties
        </p>

        {view === "grid" ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property, i) => (
              <FadeIn key={property.id} delay={i * 0.05}>
                <PropertyCard property={property} />
              </FadeIn>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden aspect-[16/9] relative">
            <iframe
              title="Properties Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.6229842254!2d3.1446795!3d6.5483694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d099ecf1e0d%3A0x3a6b3f3f3f3f3f3f!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 max-h-40 overflow-y-auto">
              <p className="text-sm font-semibold mb-2">{filtered.length} properties on map</p>
              <div className="flex flex-wrap gap-2">
                {filtered.map((p) => (
                  <a
                    key={p.id}
                    href={`/properties/${p.id}`}
                    className="px-3 py-1 text-xs rounded-full bg-muted hover:bg-gold/20 transition-colors"
                  >
                    {p.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No properties match your filters.</p>
          </div>
        )}
      </section>
    </>
  );
}
