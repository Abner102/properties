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
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <AppImage src={car.images[activeImage]} alt={`${car.brand} ${car.model}`} fill className="object-cover" sizes="50vw" />
              {car.luxury && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-background text-xs font-semibold">Luxury</span>
              )}
            </div>
            {car.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {car.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 ${i === activeImage ? "border-gold" : "border-transparent"}`}>
                    <AppImage src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="text-muted-foreground">{car.brand}</p>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{car.model}</h1>
            <p className="text-3xl font-bold text-gold mt-4">{formatPrice(car.price)}</p>
            <div className="flex gap-6 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2 capitalize"><Fuel size={16} className="text-gold" /> {car.fuel}</span>
              <span className="flex items-center gap-2 capitalize"><Settings2 size={16} className="text-gold" /> {car.transmission}</span>
              <span>{car.year}</span>
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
