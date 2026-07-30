"use client";

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "glass-strong py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0 min-w-0">
          <span className="text-lg lg:text-xl font-display font-bold tracking-tight">
            Endless <span className="text-gold">Infinity</span>
          </span>
        </Link>

        <div className="hidden lg:flex flex-1 min-w-0 items-center justify-center gap-3 xl:gap-5 px-3 xl:px-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                cn(
                  "text-xs xl:text-sm whitespace-nowrap transition-colors shrink-0",
                  isActive ? "text-gold font-medium" : "text-muted-foreground hover:text-gold"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors px-3 py-2">
            <Phone size={14} />
            <span className="hidden xl:inline">Call Us</span>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-gold transition-colors px-3 py-2"
          >
            <MessageCircle size={14} />
            <span className="hidden xl:inline">WhatsApp</span>
          </a>
          <ThemeToggle />
          <Link to="/contact" className="px-4 py-2 rounded-full bg-gold text-background text-sm font-semibold hover:bg-gold-light transition-colors">
            Contact Us
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border"
          >
            <div className="px-6 py-6 flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn("text-base py-2 transition-colors", isActive ? "text-gold font-medium" : "hover:text-gold")
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <hr className="border-border my-2" />
              <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-2 py-2">
                <Phone size={16} className="text-gold" /> {siteConfig.phone}
              </a>
              <Link to="/contact" onClick={() => setIsOpen(false)} className="mt-2 px-5 py-3 rounded-full bg-gold text-background text-center font-semibold">
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
