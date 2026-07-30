import AppImage from "@/components/ui/AppImage";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const socialImages = [
  "/images/property-1.jpg",
  "/images/car-mercedes.jpg",
  "/images/tech-1.jpg",
  "/images/blog-3.jpg",
  "/images/property-6.jpg",
  "/images/property-4.jpg",
];

export default function SocialShowcase() {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="Follow Us"
          title="Life at Firminfinity"
          description="Properties, projects, and lifestyle. Follow our journey on social media."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {socialImages.map((img, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden block"
              >
                <AppImage
                  src={img}
                  alt={`Social content ${i + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="200px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <InstagramIcon size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
