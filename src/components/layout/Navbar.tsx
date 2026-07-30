"use client";

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig, navLinks } from "@/data/site";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overHero = !scrolled && !isOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled || isOpen ? "glass-strong py-3" : "bg-transparent py-5"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between gap-6">
        <Link to="/" className="shrink-0">
          <span
            className={cn(
              "font-display text-2xl md:text-[1.7rem] tracking-tight leading-none",
              overHero ? "text-white" : "text-foreground"
            )}
          >
            Endless <span className="text-gold">Infinity</span>
          </span>
        </Link>

        <div className="hidden lg:flex flex-1 items-center justify-center gap-0.5 xl:gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              className={({ isActive }) =>
                cn(
                  "px-2.5 xl:px-3 py-2 text-[12px] xl:text-[13px] font-medium tracking-wide uppercase transition-colors",
                  isActive
                    ? "text-gold"
                    : overHero
                      ? "text-white/80 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              "p-2 transition-colors hover:text-gold",
              overHero ? "text-white/85" : "text-foreground/75"
            )}
            aria-label="Call Us"
          >
            <Phone size={15} />
          </a>
          <ThemeToggle />
          <Link
            to="/contact"
            className="ml-1 px-4 py-2.5 text-xs font-semibold tracking-wide uppercase bg-gold text-background hover:bg-gold-light transition-colors"
          >
            Contact
          </Link>
        </div>

        <div className={cn("flex lg:hidden items-center gap-1", overHero && "text-white")}>
          <ThemeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Toggle menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            <div className="px-6 py-6 flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-base py-3 font-medium tracking-wide transition-colors border-b border-border/60",
                      isActive ? "text-gold" : "text-foreground/85 hover:text-gold"
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-5 py-3.5 bg-gold text-background text-center text-sm font-semibold tracking-wide uppercase"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
