import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex items-end sm:items-center overflow-hidden">
      <img
        src="/images/hero.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover hero-media"
      />
      <div className="absolute inset-0 hero-overlay" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-32 sm:py-0 text-white">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight"
        >
          Endless <span className="text-gold">Infinity</span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-snug text-white/95"
        >
          {siteConfig.tagline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base md:text-lg text-white/70 leading-relaxed"
        >
          {siteConfig.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Link to="/properties">
            <Button size="lg">
              Explore Properties <ArrowRight size={18} />
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="border-white/35 text-white hover:border-gold hover:bg-gold hover:text-background"
            >
              Book a Consultation
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
