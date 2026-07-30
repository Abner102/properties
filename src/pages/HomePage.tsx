import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import CTASection from "@/components/home/CTASection";
import AppImage from "@/components/ui/AppImage";
import FadeIn from "@/components/ui/FadeIn";
import { formatPrice } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProductsByCategories, toCar, toLandListing } from "@/lib/products-client";
import type { Car } from "@/data/cars";
import type { LandListing } from "@/lib/products-client";

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [landListings, setLandListings] = useState<LandListing[]>([]);

  useEffect(() => {
    Promise.all([
      getProductsByCategories(["cars", "luxury-assets"], { featured: true, limit: 3 }),
      getProductsByCategories(["lands"], { limit: 2 }),
    ]).then(([cars, lands]) => {
      setFeaturedCars(cars.map(toCar));
      setLandListings(lands.map(toLandListing));
    });
  }, []);

  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
            <SectionHeading
              subtitle="Automotive"
              title="Featured Cars"
              description="Curated luxury and performance vehicles ready for delivery."
              align="left"
              className="mb-0"
            />
            <Link to="/cars" className="text-sm font-semibold tracking-wide uppercase text-gold link-underline inline-flex items-center gap-1 shrink-0">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {featuredCars.map((car, i) => (
              <FadeIn key={car.id} delay={i * 0.08}>
                <Link to={`/cars/${car.id}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted mb-4">
                    <AppImage
                      src={car.images[0]}
                      alt={car.model}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="33vw"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{car.brand}</p>
                  <h3 className="font-display text-2xl mt-1 group-hover:text-gold transition-colors">{car.model}</h3>
                  <p className="text-gold font-semibold mt-2">{formatPrice(car.price)}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            subtitle="Land"
            title="Latest Land Listings"
            description="Verified titles and prime locations for development and investment."
          />
          <div className="grid md:grid-cols-2 gap-8">
            {landListings.map((land, i) => (
              <FadeIn key={land.id} delay={i * 0.1}>
                <Link to="/land" className="group grid sm:grid-cols-2 gap-0 overflow-hidden bg-card border border-border">
                  <div className="relative aspect-[4/3] sm:aspect-auto sm:min-h-[220px]">
                    <AppImage src={land.image} alt={land.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="300px" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-[11px] tracking-[0.2em] uppercase text-gold font-semibold">{land.category}</span>
                    <h3 className="font-display text-2xl md:text-3xl mt-2 group-hover:text-gold transition-colors">{land.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{land.state}</p>
                    <p className="text-gold font-semibold text-lg mt-4">{formatPrice(land.price)}</p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects />
      <Testimonials />
      <WhyChooseUs />
      <Newsletter />
      <CTASection />
    </>
  );
}
