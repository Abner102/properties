import AppImage from "@/components/ui/AppImage";
import { Link } from "react-router-dom";
import { Camera, Video, Share2, Play, Users, Megaphone, BookOpen } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const services = [
  { icon: Video, title: "Real Estate Video Production", desc: "Cinematic property tours and promotional videos." },
  { icon: Camera, title: "Property Photography", desc: "Professional interior and exterior photography." },
  { icon: Video, title: "Drone Videography", desc: "Aerial shots showcasing properties and developments." },
  { icon: Share2, title: "Social Media Marketing", desc: "Strategic campaigns across all major platforms." },
  { icon: Play, title: "YouTube Content", desc: "Property channels, market updates, and brand stories." },
  { icon: Share2, title: "Instagram Reels", desc: "Engaging short-form content for property marketing." },
  { icon: Share2, title: "TikTok Marketing", desc: "Viral property content for younger audiences." },
  { icon: Users, title: "Facebook Advertising", desc: "Targeted ads reaching qualified buyers." },
  { icon: Megaphone, title: "Promotional Campaigns", desc: "End-to-end property launch campaigns." },
  { icon: BookOpen, title: "Brand Storytelling", desc: "Compelling narratives that build trust and desire." },
];

const gallery = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
];

export default function ContentCreationContent() {
  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Creative</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Content Creation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Professional content that sells properties, builds brands, and drives engagement.</p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Our Creative Services" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <GlassCard className="h-full">
                  <s.icon size={24} className="text-gold mb-3" />
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Campaign Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((img, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <AppImage src={img} alt={`Campaign ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="300px" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding text-center">
        <Link to="/contact"><Button size="lg">Start Your Campaign</Button></Link>
      </section>
    </>
  );
}
