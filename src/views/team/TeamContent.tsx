import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import AppImage from "@/components/ui/AppImage";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { founders as staticFounders, coreValues } from "@/data/founders";
import { teamMembers as staticTeam } from "@/data/team";
import { siteConfig } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

interface PublicTeamMember {
  _id: string;
  name: string;
  position?: string | null;
  bio?: string | null;
  image?: string | null;
  email?: string | null;
  phone?: string | null;
  github?: string | null;
  linkedin?: string | null;
  instagram?: string | null;
  isFounder?: boolean;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop";

function mapStaticToPublic(): PublicTeamMember[] {
  const founderRows: PublicTeamMember[] = staticFounders.map((f) => ({
    _id: f.id,
    name: f.name,
    position: f.role,
    bio: f.bio,
    image: f.image,
    email: f.email,
    github: f.github,
    linkedin: f.linkedin,
    instagram: f.instagram,
    isFounder: true,
  }));

  const teamRows: PublicTeamMember[] = staticTeam.map((m) => ({
    _id: m.id,
    name: m.name,
    position: m.position,
    bio: m.bio,
    image: m.image,
    email: m.email,
    isFounder: false,
  }));

  return [...founderRows, ...teamRows];
}

function SocialLink({ href, label, children }: { href?: string | null; label: string; children: React.ReactNode }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-gold transition-colors"
    >
      {children}
    </a>
  );
}

export default function TeamContent() {
  const [members, setMembers] = useState<PublicTeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/team")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data.members) ? data.members : [];
        setMembers(list.length ? list : mapStaticToPublic());
      })
      .catch(() => setMembers(mapStaticToPublic()))
      .finally(() => setLoading(false));
  }, []);

  const founders = members.filter((m) => m.isFounder);
  const team = members.filter((m) => !m.isFounder);

  return (
    <>
      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">People</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight px-2">
              Our Team
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
              Meet the founders and professionals behind {siteConfig.shortName}.
            </p>
          </FadeIn>
        </div>
      </section>

      {loading ? (
        <p className="text-center text-muted-foreground py-16 px-4">Loading team...</p>
      ) : (
        <>
          {founders.length > 0 && (
            <section className="px-4 sm:px-6 pb-12 sm:pb-16 md:pb-20 md:section-padding bg-muted/30">
              <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="Leadership" title="Co-Founders" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {founders.map((f, i) => (
                    <FadeIn key={f._id} delay={i * 0.1}>
                      <GlassCard className="overflow-hidden p-0 h-full">
                        <div className="flex flex-col sm:flex-row h-full">
                          <div className="relative w-full sm:w-2/5 aspect-[4/5] sm:aspect-auto sm:min-h-[320px] shrink-0">
                            <AppImage
                              src={f.image || fallbackImage}
                              alt={f.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 40vw"
                            />
                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold text-background text-xs font-semibold">
                              Co-Founder
                            </span>
                          </div>
                          <div className="p-5 sm:p-6 flex flex-col flex-1 min-w-0">
                            <h2 className="font-display text-xl sm:text-2xl font-bold">{f.name}</h2>
                            {f.position && <p className="text-gold text-sm font-semibold mt-1">{f.position}</p>}
                            {f.bio && (
                              <p className="text-sm text-muted-foreground leading-relaxed mt-3 sm:mt-4">{f.bio}</p>
                            )}
                            {f.email && (
                              <a
                                href={`mailto:${f.email}`}
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mt-4 min-h-[44px]"
                              >
                                <Mail size={16} />
                                <span className="break-all">{f.email}</span>
                              </a>
                            )}
                            <div className="flex flex-wrap gap-3 mt-auto pt-4">
                              <SocialLink href={f.github} label="GitHub">
                                <GithubIcon size={18} />
                              </SocialLink>
                              <SocialLink href={f.linkedin} label="LinkedIn">
                                <LinkedinIcon size={18} />
                              </SocialLink>
                              <SocialLink href={f.instagram} label="Instagram">
                                <InstagramIcon size={18} />
                              </SocialLink>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
          )}

          {team.length > 0 && (
            <section className="px-4 sm:px-6 py-12 sm:py-16 md:section-padding">
              <div className="max-w-7xl mx-auto">
                <SectionHeading subtitle="The people who make it happen" title="Our Team" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {team.map((member, i) => (
                    <FadeIn key={member._id} delay={i * 0.08}>
                      <GlassCard className="overflow-hidden p-0 h-full text-center">
                        <div className="relative aspect-[4/5] w-full">
                          <AppImage
                            src={member.image || fallbackImage}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 280px"
                          />
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="font-display text-base sm:text-lg font-bold">{member.name}</h3>
                          {member.position && (
                            <p className="text-gold text-sm font-semibold mt-1">{member.position}</p>
                          )}
                          {member.bio && (
                            <p className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-3 leading-relaxed">
                              {member.bio}
                            </p>
                          )}
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors mt-3 sm:mt-4 min-h-[44px] px-2"
                            >
                              <Mail size={14} />
                              Contact
                            </a>
                          )}
                        </div>
                      </GlassCard>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <section className="px-4 sm:px-6 py-12 sm:py-16 md:section-padding bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="What guides us" title="Our Values" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {coreValues.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <h3 className="font-bold text-gold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-12 sm:py-16 md:section-padding">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">Work With Our Team</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-2">
              Reach us at {siteConfig.email} for partnerships, investments, and software projects.
            </p>
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                Get In Touch
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
