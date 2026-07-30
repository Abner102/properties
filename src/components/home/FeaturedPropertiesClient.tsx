import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Bed, Bath, Maximize } from "lucide-react";
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

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Featured"
          title="Premium Properties"
          description="Handpicked luxury properties with exceptional investment potential."
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={property.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-8 items-center"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <AppImage
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-sm font-medium capitalize">
                  {property.type}
                </div>
              </div>

              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold mb-2">
                  {property.title}
                </h3>
                <p className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin size={16} className="text-gold" />
                  {property.location}, {property.city}
                </p>
                <p className="text-3xl font-bold text-gold mb-6">
                  {formatPrice(property.price)}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {property.description}
                </p>
                <div className="flex gap-6 mb-8">
                  {property.bedrooms > 0 && (
                    <span className="flex items-center gap-2 text-sm">
                      <Bed size={18} className="text-gold" /> {property.bedrooms} Beds
                    </span>
                  )}
                  {property.bathrooms > 0 && (
                    <span className="flex items-center gap-2 text-sm">
                      <Bath size={18} className="text-gold" /> {property.bathrooms} Baths
                    </span>
                  )}
                  <span className="flex items-center gap-2 text-sm">
                    <Maximize size={18} className="text-gold" /> {property.area} sqm
                  </span>
                </div>
                <Link to={`/properties/${property.id}`}>
                  <Button>View Details</Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Previous property"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === current ? "bg-gold" : "bg-white/20"
                  }`}
                  aria-label={`Go to property ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
              aria-label="Next property"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
