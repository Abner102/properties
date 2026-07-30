import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-luxurious-neighborhood-4248-large.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gold text-sm font-semibold tracking-[0.25em] uppercase mb-6">
          {siteConfig.shortName}
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-5xl mx-auto">
          {siteConfig.tagline}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {siteConfig.description}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/properties"><Button size="lg">Explore Properties <ArrowRight size={20} /></Button></Link>
          <Link to="/software"><Button variant="outline" size="lg">Our Services</Button></Link>
          <Link to="/contact"><Button variant="secondary" size="lg">Contact Us</Button></Link>
        </motion.div>
      </div>
    </section>
  );
}
