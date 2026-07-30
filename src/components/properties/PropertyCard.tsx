import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link to={`/properties/${property.id}`}>
      <GlassCard className="group overflow-hidden p-0 h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <AppImage
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass text-xs font-medium capitalize">
            {property.type}
          </div>
          {property.featured && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gold text-background text-xs font-semibold">
              Featured
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-display text-lg font-bold group-hover:text-gold transition-colors">
            {property.title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
            <MapPin size={14} className="text-gold shrink-0" />
            {property.location}, {property.city}
          </p>
          <p className="text-xl font-bold text-gold mt-3">{formatPrice(property.price)}</p>
          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
            {property.bedrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed size={14} /> {property.bedrooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath size={14} /> {property.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Maximize size={14} /> {property.area} sqm
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
