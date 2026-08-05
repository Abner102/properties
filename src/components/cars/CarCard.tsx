import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { Fuel, Settings2 } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatPrice } from "@/lib/utils";

export default function CarCard({ car }: { car: Car }) {
  const priceLabel = car.price > 0 ? formatPrice(car.price) : "Contact for price";
  const details = [car.luxury ? "Luxury" : "", car.year > 0 ? String(car.year) : ""].filter(Boolean);

  return (
    <Link to={`/cars/${car.id}`} className="group block h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-black/90 mb-4">
        <AppImage
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          fill
          className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {car.brand}
        {details.length ? ` - ${details.join(" - ")}` : ""}
      </p>
      <h3 className="font-display text-2xl mt-1 group-hover:text-gold transition-colors">{car.model}</h3>
      <p className="text-gold font-semibold mt-2">{priceLabel}</p>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1 capitalize">
          <Fuel size={13} className="text-gold" /> {car.fuel}
        </span>
        <span className="flex items-center gap-1 capitalize">
          <Settings2 size={13} className="text-gold" /> {car.transmission}
        </span>
      </div>
    </Link>
  );
}
