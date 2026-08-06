import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Newsletter from "@/components/home/Newsletter";
import CTASection from "@/components/home/CTASection";
import AppImage from "@/components/ui/AppImage";
import FadeIn from "@/components/ui/FadeIn";
import { formatPrice } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import { getProductsByCategories, toCar } from "@/lib/products-client";
import type { Car } from "@/data/cars";

export default function HomePage() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);

  useEffect(() => {
    getProductsByCategories(["cars", "luxury-assets"], { featured: true, limit: 3 }).then((cars) => {
      setFeaturedCars(cars.map(toCar));
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
            title="Land Listings"
            description="Will be added shortly."
          />
          <FadeIn>
            <div className="border border-border bg-card/80 px-6 py-12 text-center">
              <p className="font-display text-2xl font-bold">Will be added shortly.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <FeaturedProjects />
      <WhyChooseUs />
      <Newsletter />
      <CTASection />
    </>
  );
}
