import { Link } from "react-router-dom";
import {
  Globe, Smartphone, Building, Brain, Cog, LayoutDashboard, Code, Cloud, Palette, CreditCard, Database, Wrench,
} from "lucide-react";
import { industries } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const services = [
  { icon: Globe, title: "Website Development", desc: "Modern, responsive websites built with Next.js and React." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform apps for iOS and Android." },
  { icon: Building, title: "Enterprise Systems", desc: "Scalable ERP, CRM, and business management platforms." },
  { icon: Brain, title: "AI Applications", desc: "Intelligent automation, chatbots, and data analytics." },
  { icon: Cog, title: "Business Automation", desc: "Streamline operations with custom workflow automation." },
  { icon: LayoutDashboard, title: "Dashboard Systems", desc: "Real-time analytics and admin dashboards." },
  { icon: Code, title: "API Development", desc: "RESTful and GraphQL APIs for seamless integrations." },
  { icon: Cloud, title: "Cloud Solutions", desc: "AWS, Azure, and Vercel deployment and management." },
  { icon: Palette, title: "UI/UX Design", desc: "Beautiful, user-centered interface design." },
  { icon: CreditCard, title: "Payment Integration", desc: "Paystack, Stripe, and custom payment gateways." },
  { icon: Database, title: "Database Development", desc: "PostgreSQL, MongoDB, and data architecture." },
  { icon: Wrench, title: "Software Maintenance", desc: "Ongoing support, updates, and optimization." },
];

const offerings = [
  "Websites", "Mobile Apps", "Logistics Systems", "Hospital Systems", "School Systems",
  "CRM", "ERP", "E-commerce", "Fintech", "AI Solutions", "Dashboard Systems", "Custom Software",
];

export default function SoftwareContent() {
  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Technology</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Software Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Founded by professional software developers. We build world-class technology solutions for businesses across Nigeria and beyond.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="What We Build" description="End-to-end software development from concept to deployment." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.05}>
                <GlassCard className="h-full group">
                  <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <s.icon size={20} className="text-background" />
                  </div>
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
          <SectionHeading title="Solutions We Offer" />
          <div className="flex flex-wrap justify-center gap-3">
            {offerings.map((o) => (
              <span key={o} className="px-5 py-2.5 rounded-full glass text-sm font-medium">{o}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Industries We Serve" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <FadeIn key={ind} delay={i * 0.05}>
                <div className="glass rounded-xl p-4 text-center text-sm font-medium">{ind}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding text-center">
        <FadeIn>
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Build Something Great?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">Tell us about your project and get a free consultation with our development team.</p>
          <Link to="/contact"><Button size="lg">Request Software Quote</Button></Link>
        </FadeIn>
      </section>
    </>
  );
}
