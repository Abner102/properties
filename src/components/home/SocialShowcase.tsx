import AppImage from "@/components/ui/AppImage";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const socialImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
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
