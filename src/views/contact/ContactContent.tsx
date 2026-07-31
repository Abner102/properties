"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...formData, subject: formData.service }),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">Call {siteConfig.phone} or send us a message.</p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-8 flex flex-wrap justify-center gap-4">
        <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-background font-semibold hover:bg-gold-light transition-colors">
          <Phone size={18} /> Call Now
        </a>
        <a href={`https://wa.me/${siteConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold hover:opacity-90">
          <MessageCircle size={18} /> WhatsApp
        </a>
        <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 px-6 py-3 rounded-full glass font-semibold hover:text-gold transition-colors">
          <Mail size={18} /> Email
        </a>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">
        <FadeIn>
          <GlassCard>
            <h2 className="font-display text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50" />
              <input type="email" placeholder="Email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50" />
              <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50" />
              <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50">
                <option value="">Select Service</option>
                <option value="real-estate">Real Estate</option>
                <option value="land">Land</option>
                <option value="cars">Cars</option>
                <option value="software">Software Development</option>
                <option value="content">Content Creation</option>
                <option value="consultation">Consultation</option>
              </select>
              <textarea placeholder="Message" rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50 resize-none" />
              <Button type="submit" className="w-full" size="lg" disabled={status === "loading"} aria-label="Send message">
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <Mail size={22} strokeWidth={2} />
                )}
              </Button>
              {status === "success" && <p className="text-gold text-sm text-center">Message sent! We&apos;ll respond within 24 hours.</p>}
              {status === "error" && <p className="text-red-400 text-sm text-center">Failed to send. Please try again or call us.</p>}
            </form>
          </GlassCard>
        </FadeIn>

        <div className="space-y-6">
          <FadeIn delay={0.1}>
            <GlassCard>
              <h2 className="font-display text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3"><MapPin size={18} className="text-gold mt-0.5" /><div><p className="font-semibold">Office</p><p className="text-muted-foreground">{siteConfig.address}</p></div></div>
                <div className="flex items-center gap-3"><Phone size={18} className="text-gold" /><a href={`tel:${siteConfig.phone}`} className="font-semibold">{siteConfig.phone}</a></div>
                <div className="flex items-center gap-3"><Mail size={18} className="text-gold" />{siteConfig.email}</div>
                <div className="flex items-start gap-3"><Clock size={18} className="text-gold mt-0.5" /><div><p className="font-semibold">Hours</p><p className="text-muted-foreground">Mon-Fri 9AM-6PM · Sat 10AM-2PM</p></div></div>
              </div>
            </GlassCard>
          </FadeIn>
          <FadeIn delay={0.2}>
            <GlassCard className="p-0 overflow-hidden">
              <iframe title="Office Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.668!2d3.4219!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf52f4a9b5b8b%3A0x3a6b3f3f3f3f3f3f!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng" className="w-full aspect-video border-0" loading="lazy" />
            </GlassCard>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
