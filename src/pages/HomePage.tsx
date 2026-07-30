import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import CTASection from "@/components/home/CTASection";
import AppImage from "@/components/ui/AppImage";
import { formatPrice } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import { getProductsByCategories, toCar, toLandListing } from "@/lib/products-client";
import type { Car } from "@/data/cars";
import type { LandListing } from "@/lib/products-client";

const partners = ["Sotheby's Partner", "Lagos Realtors", "Naija Tech Hub", "Plateau Dev", "LuxHomes NG", "FinTech Alliance"];

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

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Automotive" title="Featured Cars" />
          <div className="grid md:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <Link key={car.id} to={`/cars/${car.id}`}>
                <GlassCard className="overflow-hidden p-0 group">
                  <div className="relative aspect-video">
                    <AppImage src={car.images[0]} alt={car.model} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-muted-foreground">{car.brand}</p>
                    <h3 className="font-bold">{car.model}</h3>
                    <p className="text-gold font-bold mt-1">{formatPrice(car.price)}</p>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/cars" className="text-gold hover:text-gold-light font-semibold">View All Cars →</Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="Land" title="Latest Land Listings" />
          <div className="grid md:grid-cols-2 gap-6">
            {landListings.map((land) => (
              <Link key={land.id} to="/land">
                <GlassCard className="overflow-hidden p-0 group">
                  <div className="grid sm:grid-cols-2">
                    <div className="relative aspect-video sm:aspect-auto min-h-[160px]">
                      <AppImage src={land.image} alt={land.title} fill className="object-cover" sizes="300px" />
                    </div>
                    <div className="p-5">
                      <span className="text-xs text-gold font-semibold uppercase">{land.category}</span>
                      <h3 className="font-bold mt-1">{land.title}</h3>
                      <p className="text-sm text-muted-foreground">{land.state}</p>
                      <p className="text-gold font-bold mt-2">{formatPrice(land.price)}</p>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProjects />
      <Testimonials />

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <SectionHeading subtitle="Partners" title="Trusted By Industry Leaders" />
          <div className="flex flex-wrap justify-center gap-6">
            {partners.map((p) => (
              <div key={p} className="px-6 py-4 glass rounded-xl text-sm font-medium text-muted-foreground">{p}</div>
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Newsletter />
      <CTASection />
    </>
  );
}
