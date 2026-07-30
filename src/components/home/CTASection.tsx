import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export default function CTASection() {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center">
          <div className="absolute inset-0 gold-gradient opacity-10" />
          <div className="absolute inset-0 glass" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Ready to Build Your Wealth?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Contact {siteConfig.name} today. Call <a href={`tel:${siteConfig.phone}`} className="text-gold font-semibold">{siteConfig.phone}</a> or book a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button size="lg">Contact Us</Button></Link>
              <Link to="/properties"><Button variant="outline" size="lg">Browse Properties</Button></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
