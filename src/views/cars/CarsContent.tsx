"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import type { Car } from "@/data/cars";
import CarCard from "@/components/cars/CarCard";
import FadeIn from "@/components/ui/FadeIn";

export default function CarsContent({ cars }: { cars: Car[] }) {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [luxuryOnly, setLuxuryOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState("");

  const brands = useMemo(() => [...new Set(cars.map((c) => c.brand))], [cars]);

  const filtered = useMemo(() => {
    return cars.filter((c) => {
      if (search && !`${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())) return false;
      if (brand && c.brand !== brand) return false;
      if (fuel && c.fuel !== fuel) return false;
      if (transmission && c.transmission !== transmission) return false;
      if (luxuryOnly && !c.luxury) return false;
      if (maxPrice && c.price > Number(maxPrice)) return false;
      return true;
    });
  }, [search, brand, fuel, transmission, luxuryOnly, maxPrice, cars]);

  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Automotive</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Luxury & Premium Cars</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From exotic supercars to reliable daily drivers. Find your perfect vehicle.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cars..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-border focus:outline-none focus:border-gold/50"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-border text-sm focus:outline-none focus:border-gold/50">
              <option value="">All Brands</option>
              {brands.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
            <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-border text-sm focus:outline-none focus:border-gold/50">
              <option value="">All Fuel</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-border text-sm focus:outline-none focus:border-gold/50">
              <option value="">Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-border text-sm focus:outline-none focus:border-gold/50" />
            <label className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-border text-sm cursor-pointer">
              <input type="checkbox" checked={luxuryOnly} onChange={(e) => setLuxuryOnly(e.target.checked)} className="accent-gold" />
              Luxury Only
            </label>
            <button onClick={() => { setSearch(""); setBrand(""); setFuel(""); setTransmission(""); setLuxuryOnly(false); setMaxPrice(""); }} className="px-3 py-2.5 rounded-xl border border-gold/30 text-gold text-sm hover:bg-gold/10">
              Clear
            </button>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6">Showing {filtered.length} vehicles</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
            <FadeIn key={car.id} delay={i * 0.05}>
              <CarCard car={car} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
