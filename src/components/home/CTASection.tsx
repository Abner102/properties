import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export default function CTASection() {
  return (
    <section className="section-padding pt-0">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden border border-border bg-muted/50 px-8 py-16 md:px-16 md:py-20 text-center"
        >
          <div className="absolute inset-0 pointer-events-none opacity-40 gold-gradient mix-blend-soft-light" />
          <div className="relative z-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-4">Next step</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-5">Ready to build lasting wealth?</h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Speak with {siteConfig.shortName} today. Call{" "}
              <a href={`tel:${siteConfig.phone}`} className="text-gold font-semibold hover:text-gold-light transition-colors">
                {siteConfig.phone}
              </a>{" "}
              or book a private consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact"><Button size="lg">Contact Us</Button></Link>
              <Link to="/properties"><Button variant="outline" size="lg">Browse Properties</Button></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
