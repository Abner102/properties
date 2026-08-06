import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link to={`/properties/${property.id}`} className="group block h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted mb-4">
        <AppImage
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold capitalize">
        {property.type}
        {property.featured ? " · Featured" : ""}
      </p>
      <h3 className="font-display text-2xl mt-1 group-hover:text-gold transition-colors">
        {property.title}
      </h3>
      <p className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2">
        <MapPin size={14} className="text-gold shrink-0" />
        {property.location}, {property.city}
      </p>
      <p className="text-lg font-semibold text-gold mt-3">{formatPrice(property.price)}</p>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        {property.bedrooms > 0 && (
          <span className="flex items-center gap-1">
            <Bed size={13} /> {property.bedrooms}
          </span>
        )}
        {property.bathrooms > 0 && (
          <span className="flex items-center gap-1">
            <Bath size={13} /> {property.bathrooms}
          </span>
        )}
        {property.area > 0 && (
          <span className="flex items-center gap-1">
            <Maximize size={13} /> {property.area} sqm
          </span>
        )}
      </div>
    </Link>
  );
}
