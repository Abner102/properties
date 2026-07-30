import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { Fuel, Settings2 } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatPrice } from "@/lib/utils";
import GlassCard from "@/components/ui/GlassCard";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link to={`/cars/${car.id}`}>
      <GlassCard className="group overflow-hidden p-0 h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          <AppImage
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {car.luxury && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold text-background text-xs font-semibold">
              Luxury
            </div>
          )}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full glass text-xs">
            {car.year}
          </div>
        </div>
        <div className="p-5">
          <p className="text-sm text-muted-foreground">{car.brand}</p>
          <h3 className="font-display text-lg font-bold group-hover:text-gold transition-colors">
            {car.model}
          </h3>
          <p className="text-xl font-bold text-gold mt-2">{formatPrice(car.price)}</p>
          <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 capitalize">
              <Fuel size={14} /> {car.fuel}
            </span>
            <span className="flex items-center gap-1 capitalize">
              <Settings2 size={14} /> {car.transmission}
            </span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
