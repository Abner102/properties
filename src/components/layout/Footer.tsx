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
    Connect: [
      { href: "/contact", label: "Contact Us" },
      { href: `https://wa.me/${siteConfig.whatsapp}`, label: "WhatsApp" },
      { href: `tel:${siteConfig.phone}`, label: "Call Now" },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="text-xl font-display font-bold">
              Endless <span className="text-gold">Infinity</span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{siteConfig.tagline}</p>
            <div className="flex gap-3 mt-6">
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
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-gold transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />{siteConfig.address}
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-gold shrink-0" />
                <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-gold shrink-0" />{siteConfig.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Technology. Property. Wealth.</p>
        </div>
      </div>
    </footer>
  );
}
