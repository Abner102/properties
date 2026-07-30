import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize, ArrowUpRight } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function FeaturedPropertiesClient({ properties }: { properties: Property[] }) {
  const [current, setCurrent] = useState(0);
  const featured = properties;

  const next = () => setCurrent((c) => (c + 1) % featured.length);
  const prev = () => setCurrent((c) => (c - 1 + featured.length) % featured.length);

  const property = featured[current];
  if (!property) return null;

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <SectionHeading
            subtitle="Featured"
            title="Premium Properties"
            description="Handpicked homes with exceptional presence and return potential."
            align="left"
            className="mb-0"
          />
          <Link to="/properties" className="text-sm font-semibold tracking-wide uppercase text-gold link-underline inline-flex items-center gap-1 shrink-0">
            All properties <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <AppImage
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-semibold capitalize mb-3">
                  {property.type}
                </p>
                <h3 className="font-display text-3xl md:text-5xl mb-3 leading-tight">
                  {property.title}
                </h3>
                <p className="flex items-center gap-2 text-muted-foreground mb-5">
                  <MapPin size={15} className="text-gold shrink-0" />
                  {property.location}, {property.city}
                </p>
                <p className="font-display text-3xl md:text-4xl text-gold mb-5">
                  {formatPrice(property.price)}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
                  {property.description}
                </p>
                <div className="flex flex-wrap gap-6 mb-9 text-sm">
                  {property.bedrooms > 0 && (
                    <span className="flex items-center gap-2">
                      <Bed size={16} className="text-gold" /> {property.bedrooms} Beds
                    </span>
                  )}
                  {property.bathrooms > 0 && (
                    <span className="flex items-center gap-2">
                      <Bath size={16} className="text-gold" /> {property.bathrooms} Baths
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Maximize size={16} className="text-gold" /> {property.area} sqm
                  </span>
                </div>
                <Link to={`/properties/${property.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={prev}
              className="w-11 h-11 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Previous property"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2 px-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-px transition-all ${i === current ? "w-8 bg-gold" : "w-4 bg-foreground/20"}`}
                  aria-label={`Go to property ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-11 h-11 border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
              aria-label="Next property"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
