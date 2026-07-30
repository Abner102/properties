import { useState } from "react";
import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Bed, Bath, Maximize, MessageCircle } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function PropertyDetailContent({ property }: { property: Property }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <section className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link to="/properties" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm">
            <ArrowLeft size={16} /> Back to Properties
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10">
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <AppImage src={property.images[activeImage]} alt={property.title} fill className="object-cover" sizes="50vw" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-sm capitalize">{property.type}</span>
            </div>
            {property.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {property.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)} className={`relative w-24 h-16 shrink-0 rounded-lg overflow-hidden border-2 ${i === activeImage ? "border-gold" : "border-transparent"}`}>
                    <AppImage src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="font-display text-3xl md:text-4xl font-bold">{property.title}</h1>
            <p className="flex items-center gap-2 text-muted-foreground mt-2">
              <MapPin size={16} className="text-gold" /> {property.location}, {property.city}
            </p>
            <p className="text-3xl font-bold text-gold mt-4">{formatPrice(property.price)}</p>
            <div className="flex gap-6 mt-4 text-sm">
              {property.bedrooms > 0 && <span className="flex items-center gap-2"><Bed size={16} className="text-gold" /> {property.bedrooms} Beds</span>}
              {property.bathrooms > 0 && <span className="flex items-center gap-2"><Bath size={16} className="text-gold" /> {property.bathrooms} Baths</span>}
              <span className="flex items-center gap-2"><Maximize size={16} className="text-gold" /> {property.area} sqm</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-6">{property.description}</p>

            {property.amenities.length > 0 && (
              <GlassCard className="mt-8">
                <h2 className="font-semibold mb-4">Amenities</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span key={a} className="px-3 py-1 rounded-full glass text-sm">{a}</span>
                  ))}
                </div>
              </GlassCard>
            )}

            {property.roi > 0 && (
              <p className="mt-4 text-sm text-gold font-semibold">Estimated ROI: {property.roi}%</p>
            )}

            <div className="flex flex-wrap gap-3 mt-8">
              <a href={`https://wa.me/${siteConfig.whatsapp}?text=Hi, I'm interested in ${property.title}`} target="_blank" rel="noopener noreferrer">
                <Button><MessageCircle size={18} className="mr-2" /> WhatsApp Inquiry</Button>
              </a>
              <Link to="/contact"><Button variant="outline">Book Inspection</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
