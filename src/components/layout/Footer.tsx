import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/site";

export default function Footer() {
  const footerLinks = {
    Company: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/portfolio", label: "Portfolio" },
      { href: "/blog", label: "Blog" },
    ],
    Services: [
      { href: "/properties", label: "Properties" },
      { href: "/land", label: "Land Sales" },
      { href: "/cars", label: "Cars" },
      { href: "/software", label: "Software Services" },
      { href: "/content-creation", label: "Content Creation" },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-4">
              <img
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={72}
                height={72}
                className="h-16 w-16 sm:h-[72px] sm:w-[72px] rounded-lg object-cover bg-black ring-1 ring-border"
              />
              <span className="font-display text-3xl tracking-tight leading-none">
                Endless <span className="text-gold">Infinity</span>
              </span>
            </Link>
            <p className="mt-5 text-muted-foreground text-sm leading-relaxed max-w-sm">
              {siteConfig.altTagline}
            </p>
            <div className="flex gap-2 mt-7">
              {[
                { Icon: InstagramIcon, href: siteConfig.social.instagram, label: "Instagram" },
                { Icon: FacebookIcon, href: siteConfig.social.facebook, label: "Facebook" },
                { Icon: TikTokIcon, href: siteConfig.social.tiktok, label: "TikTok" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-foreground/80 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-foreground/80">
                <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={15} className="text-gold shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition-colors">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-foreground/80">
                <Mail size={15} className="text-gold shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition-colors break-all">{siteConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground tracking-wide">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-xs text-muted-foreground tracking-[0.16em] uppercase">Technology · Property · Wealth</p>
        </div>
      </div>
    </footer>
  );
}
