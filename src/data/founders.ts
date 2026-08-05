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
    name: "Aaron Manzo Kigun",
    role: "Co-Founder & CEO",
    bio: "Co-founder and Chief Executive Officer at Endless Infinity Properties, leading the company's growth across property, cars, websites, and land services.",
    image: "/uploads/team/aaron-manzo-kigun.jpeg",
    skills: ["React", "Node.js", "Next.js", "AI/ML", "System Architecture", "PostgreSQL"],
    yearsExperience: 10,
    github: "https://github.com/aaronKigun",
    linkedin: "https://www.linkedin.com/in/aaron-kigun00123",
    instagram: "https://instagram.com/Leeroyszn001/",
    email: "aaronkigun@gmail.com",
    softwareExperience: "Built 50+ web and mobile applications including Nexora SMS, JosCity, and JobFinix.",
    realEstateExperience: "Managed 100+ property transactions across Lagos, Abuja, and Jos.",
  },
  {
    id: "founder-2",
    name: "Abner Abraham",
    role: "Co-Founder & COO",
    bio: "Co-founder and Chief Operating Officer at Endless Infinity Properties, overseeing operations and client delivery across the company's services.",
    image: "/uploads/team/abner-abraham.jpeg",
    skills: ["Leadership", "Real Estate", "Mobile Dev", "Digital Marketing", "Investment Strategy"],
    yearsExperience: 8,
    github: "https://github.com/Abner102",
    linkedin: "https://www.linkedin.com/in/abner-abraham-05a061374",
    instagram: "https://instagram.com/abnerabraham25",
    email: "abnerabraham25@gmail.com",
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
