import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { ArrowLeft, Fuel, Settings2, MessageCircle } from "lucide-react";
import type { Car } from "@/data/cars";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function CarDetailContent({ car }: { car: Car }) {
  const [activeImage, setActiveImage] = useState(0);
  const priceLabel = car.price > 0 ? formatPrice(car.price) : "Contact for price";

  return (
    <>
      <section className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/cars" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Cars
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <FadeIn>
            <div className="relative h-[62vh] min-h-80 max-h-[720px] rounded-2xl overflow-hidden bg-black/90">
              <AppImage
                src={car.images[activeImage]}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-contain p-2 sm:p-3"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {car.luxury && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-background text-xs font-semibold">Luxury</span>
              )}
            </div>
            {car.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-20 w-24 shrink-0 rounded-lg overflow-hidden border-2 bg-black/90 ${i === activeImage ? "border-gold" : "border-transparent"}`}
                    aria-label={`Show ${car.brand} ${car.model} view ${i + 1}`}
                  >
                    <AppImage src={img} alt="" fill className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-muted-foreground">{car.brand}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{car.model}</h1>
            <p className="text-3xl font-bold text-gold mt-4">{priceLabel}</p>
            <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 capitalize"><Fuel size={16} className="text-gold" /> {car.fuel}</span>
              <span className="flex items-center gap-2 capitalize"><Settings2 size={16} className="text-gold" /> {car.transmission}</span>
              {car.year > 0 && <span>{car.year}</span>}
            </div>
            <p className="text-muted-foreground leading-relaxed mt-6">{car.description}</p>

            <GlassCard className="mt-8">
              <h2 className="font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {car.specs.map((spec) => (
                  <div key={spec.label}>
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="font-medium">{spec.value}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="flex flex-wrap gap-3 mt-8">
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I'm interested in the ${car.brand} ${car.model}`} target="_blank" rel="noopener noreferrer">
                <Button><MessageCircle size={18} className="mr-2" /> WhatsApp Inquiry</Button>
              </a>
              <Link to="/contact"><Button variant="outline">Schedule Viewing</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
