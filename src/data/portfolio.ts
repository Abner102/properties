export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  description: string;
  overview: string;
  features: string[];
  outcomes: string[];
  technologies: string[];
  industry: string;
  status: string;
  websiteUrl: string;
  image: string;
  images: string[];
  featured: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "nexora-sms",
    slug: "nexora-sms",
    name: "Nexora SMS",
    description: "Enterprise bulk SMS platform for businesses and organizations across Nigeria.",
    overview: "Nexora SMS is a comprehensive messaging platform that enables businesses to send bulk SMS, manage contacts, schedule campaigns, and track delivery reports in real-time.",
    features: ["Bulk SMS sending", "Contact management", "Campaign scheduling", "Delivery reports", "API integration", "Multi-user dashboard"],
    outcomes: ["10M+ messages delivered monthly", "500+ business clients", "99.9% delivery rate"],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Twilio API"],
    industry: "Communication",
    status: "Live",
    websiteUrl: "https://nexorasms.com",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    ],
    featured: true,
  },
  {
    id: "joscity",
    slug: "joscity",
    name: "JosCity",
    description: "Digital city platform connecting residents, businesses, and government services in Jos.",
    overview: "JosCity is a comprehensive civic platform that digitizes city services, local business directories, event management, and community engagement for Jos, Plateau State.",
    features: ["Business directory", "Event management", "City news", "Service requests", "Community forums", "Mobile app"],
    outcomes: ["50K+ registered users", "2,000+ listed businesses", "80% citizen satisfaction"],
    technologies: ["React Native", "Node.js", "MongoDB", "Firebase", "Google Maps API"],
    industry: "Government",
    status: "Live",
    websiteUrl: "https://joscity.com",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    ],
    featured: true,
  },
  {
    id: "afresh-center",
    slug: "afresh-center",
    name: "Afresh Center",
    description: "Healthcare and wellness center management platform with patient portal.",
    overview: "Afresh Center is a full healthcare management system featuring appointment booking, patient records, billing, and telemedicine capabilities.",
    features: ["Appointment booking", "Patient records", "Billing system", "Telemedicine", "Staff management", "Analytics dashboard"],
    outcomes: ["5,000+ patients served", "95% appointment adherence", "40% admin time saved"],
    technologies: ["React", "Express.js", "PostgreSQL", "Prisma", "Stripe"],
    industry: "Healthcare",
    status: "Live",
    websiteUrl: "https://afreshcenter.org",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
    ],
    featured: true,
  },
  {
    id: "jobfinix",
    slug: "jobfinix",
    name: "JobFinix",
    description: "Job marketplace connecting Nigerian talent with local and remote opportunities.",
    overview: "JobFinix is a modern job platform with AI-powered matching, skill assessments, and employer dashboards for the Nigerian job market.",
    features: ["AI job matching", "Skill assessments", "Employer dashboard", "Resume builder", "Interview scheduling", "Salary insights"],
    outcomes: ["20K+ job seekers", "500+ employers", "3,000+ placements"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI", "Tailwind CSS"],
    industry: "HR/Tech",
    status: "Live",
    websiteUrl: "https://jobfinix.com",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop",
    ],
    featured: true,
  },
  {
    id: "gatewav",
    slug: "gatewav",
    name: "Gatewav",
    description: "Digital payment and fintech gateway for Nigerian businesses.",
    overview: "Gatewav provides secure payment processing, wallet management, and financial analytics for SMEs and enterprises across Nigeria.",
    features: ["Payment gateway", "Digital wallets", "Transaction analytics", "Multi-currency", "API access", "Fraud detection"],
    outcomes: ["₦5B+ processed", "1,000+ merchants", "99.95% uptime"],
    technologies: ["Node.js", "React", "PostgreSQL", "Redis", "Paystack API"],
    industry: "Finance",
    status: "Live",
    websiteUrl: "https://gatewav.com",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&h=800&fit=crop",
    ],
    featured: true,
  },
];
