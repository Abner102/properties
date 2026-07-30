export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  skills: string[];
  yearsExperience: number;
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  softwareExperience: string;
  realEstateExperience: string;
}

export const founders: Founder[] = [
  {
    id: "founder-1",
    name: "Emmanuel Infinity",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Full-stack software engineer with 10+ years building enterprise systems for government, healthcare, and fintech. Leads all technology initiatives at Endless Infinity Properties.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
    skills: ["React", "Node.js", "Next.js", "AI/ML", "System Architecture", "PostgreSQL"],
    yearsExperience: 10,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/endlessinfinity3?igsh=MTVqdWx1NG4ydGUx",
    email: "endlessinfinity16@gmail.com",
    softwareExperience: "Built 50+ web and mobile applications including Nexora SMS, JosCity, and JobFinix.",
    realEstateExperience: "Managed 100+ property transactions across Lagos, Abuja, and Jos.",
  },
  {
    id: "founder-2",
    name: "David Endless",
    role: "Co-Founder & Chief Executive Officer",
    bio: "Software architect and real estate investor. Combines deep technical expertise with strategic property investment to build lasting wealth for clients.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
    skills: ["Leadership", "Real Estate", "Mobile Dev", "Digital Marketing", "Investment Strategy"],
    yearsExperience: 8,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://www.instagram.com/endlessinfinity3?igsh=MTVqdWx1NG4ydGUx",
    email: "endlessinfinity16@gmail.com",
    softwareExperience: "Architected Gatewav, Afresh Center, and multiple enterprise dashboards.",
    realEstateExperience: "Developed luxury properties in Lekki, Maitama, and Jos with 15%+ ROI.",
  },
];

export const coreValues = [
  { title: "Integrity", description: "Transparent dealings in every transaction." },
  { title: "Innovation", description: "Technology-first approach to real estate and business." },
  { title: "Excellence", description: "World-class quality in everything we deliver." },
  { title: "Trust", description: "Building lasting relationships through reliability." },
  { title: "Growth", description: "Helping clients build generational wealth." },
];

export const timeline = [
  { year: "2017", title: "The Beginning", description: "Two software developers start investing in Nigerian real estate while building apps for local businesses." },
  { year: "2019", title: "First Major Projects", description: "Delivered JosCity and Nexora SMS while completing first luxury property development." },
  { year: "2021", title: "Endless Infinity Founded", description: "Officially launched as a technology-driven real estate and software company." },
  { year: "2023", title: "Expansion", description: "Added vehicle sales, land acquisition, and content creation services. 100+ projects delivered." },
  { year: "2026", title: "The Future", description: "Building Nigeria's premier integrated platform for real estate, technology, and investments." },
];

export const companyGoals = [
  "Become Nigeria's most trusted technology-driven real estate brand",
  "Deliver 500+ software solutions by 2028",
  "Expand property portfolio across all 36 states",
  "Launch AI-powered property valuation platform",
  "Create 1,000+ jobs through real estate and tech",
];
