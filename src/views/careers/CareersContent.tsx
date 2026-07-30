import { Link } from "react-router-dom";
import { MapPin, Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const openings = [
  { title: "Senior Full-Stack Developer", department: "Engineering", type: "Full-time", location: "Lagos / Remote", description: "Build scalable web applications with React, Node.js, and PostgreSQL." },
  { title: "Real Estate Agent", department: "Sales", type: "Full-time", location: "Lagos", description: "Manage property listings, client relationships, and closings." },
  { title: "UI/UX Designer", department: "Design", type: "Full-time", location: "Remote", description: "Design beautiful interfaces for web and mobile applications." },
  { title: "Digital Marketing Specialist", department: "Marketing", type: "Full-time", location: "Lagos", description: "Drive growth through SEO, social media, and content marketing." },
  { title: "Software Engineering Intern", department: "Engineering", type: "Internship", location: "Lagos", description: "Learn full-stack development while contributing to real projects." },
  { title: "Property Management Associate", department: "Operations", type: "Full-time", location: "Abuja", description: "Oversee property maintenance, tenant relations, and rent collection." },
];

export default function CareersContent() {
  return (
    <>
      <section className="relative pt-32 pb-12 section-padding">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto text-center">
          <FadeIn>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">Careers</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Build the future of real estate and technology in Nigeria.</p>
          </FadeIn>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16 space-y-6">
        {openings.map((job, i) => (
          <FadeIn key={job.title} delay={i * 0.08}>
            <GlassCard>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase size={14} className="text-gold" />{job.department}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} className="text-gold" />{job.location}</span>
                    <span className="px-2 py-0.5 rounded-full bg-gold/10 text-gold text-xs">{job.type}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{job.description}</p>
                </div>
                <Link to="/contact"><Button>Apply Now</Button></Link>
              </div>
            </GlassCard>
          </FadeIn>
        ))}
      </section>
    </>
  );
}
