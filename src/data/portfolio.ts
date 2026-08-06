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
  githubUrl?: string;
  image: string;
  images: string[];
  featured: boolean;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "project-nexora-sms",
    slug: "nexora-sms",
    name: "Nexora SMS",
    description: "A school management system for students, teachers, parents, academics, and finances in one secure platform.",
    overview:
      "Nexora SMS gives schools a central platform for daily administration, academic records, communication, finance tracking, and parent engagement.",
    features: [
      "Student, teacher, and parent management",
      "Academic records and class administration",
      "Finance and fee tracking",
      "Secure school communication workflows",
    ],
    outcomes: [
      "Reduced manual administration for school staff",
      "Improved visibility for parents and guardians",
      "Clearer academic and finance reporting",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "School Management"],
    industry: "Education",
    status: "Live",
    websiteUrl: "https://nexorasms.com",
    image: "/uploads/projects/nexora.png",
    images: ["/uploads/projects/nexora.png"],
    featured: true,
  },
  {
    id: "project-joscity",
    slug: "joscity",
    name: "JosCity",
    description: "A digital city platform for municipal services, payments, and civic engagement.",
    overview:
      "JosCity brings public services into one digital experience, helping residents access services, pay bills, and interact with local government more easily.",
    features: [
      "Municipal service access",
      "Bill payment workflows",
      "Citizen engagement tools",
      "Progressive web app support",
    ],
    outcomes: [
      "Created a simpler access point for city services",
      "Improved resident engagement with public services",
      "Supported digital transformation for civic operations",
    ],
    technologies: ["React", "PWA", "Payments", "Civic Tech"],
    industry: "Government",
    status: "Live",
    websiteUrl: "https://joscity.com",
    image: "/uploads/projects/1785427006340-hyg202m.png",
    images: ["/uploads/projects/1785427006340-hyg202m.png"],
    featured: true,
  },
  {
    id: "project-afresh-center",
    slug: "afresh-center",
    name: "Afresh Center",
    description: "An innovation and entrepreneurship hub website for technology, media, sports, and entertainment initiatives.",
    overview:
      "Afresh Center presents the organization's mission, services, affiliated companies, and calls to action through a bold public-facing web experience.",
    features: [
      "Program and services presentation",
      "Affiliate company showcase",
      "Contact and conversion flows",
      "Responsive marketing pages",
    ],
    outcomes: [
      "Strengthened Afresh Center's public digital presence",
      "Made programs and services easier to discover",
      "Created a polished hub for partner engagement",
    ],
    technologies: ["React", "Responsive Design", "Brand Website", "Content Strategy"],
    industry: "Business",
    status: "Live",
    websiteUrl: "https://afreshcenter.org",
    image: "/uploads/projects/1785427158081-z0d5x0t.png",
    images: ["/uploads/projects/1785427158081-z0d5x0t.png"],
    featured: true,
  },
  {
    id: "project-gatewav",
    slug: "gatewav",
    name: "Gatewav",
    description: "A refined live events platform for event discovery, secure tickets, reservations, and instant QR access.",
    overview:
      "Gatewav helps users discover curated events, reserve seats, manage tickets, and check in with confidence through a modern event platform.",
    features: [
      "Event discovery and listings",
      "Secure ticket reservation",
      "Instant QR access",
      "Installable app experience",
    ],
    outcomes: [
      "Delivered a polished event discovery workflow",
      "Improved ticket handling and check-in readiness",
      "Created a scalable foundation for live event operations",
    ],
    technologies: ["React", "QR Tickets", "Events", "PWA"],
    industry: "Events",
    status: "Live",
    websiteUrl: "https://gatewav.com",
    image: "/uploads/projects/1785427281834-6ra0y7l.png",
    images: ["/uploads/projects/1785427281834-6ra0y7l.png"],
    featured: true,
  },
  {
    id: "project-urrantech",
    slug: "urrantech",
    name: "UrranTech",
    description: "A technology-focused web platform presenting UrranTech's services, brand, and digital presence.",
    overview:
      "UrranTech is a modern tech project built to communicate the company's services clearly and give visitors a direct path to learn more and connect.",
    features: [
      "Responsive company website",
      "Service-focused content structure",
      "Clear navigation and conversion paths",
      "Modern technology brand presentation",
    ],
    outcomes: [
      "Established a polished online presence",
      "Made UrranTech's services easier to discover",
      "Created a direct live platform for client engagement",
    ],
    technologies: ["React", "Vercel", "Responsive Design", "Technology Website"],
    industry: "Tech",
    status: "Live",
    websiteUrl: "https://urran-tech.vercel.app",
    image: "/uploads/projects/urrantech.png",
    images: ["/uploads/projects/urrantech.png"],
    featured: true,
  },
  {
    id: "project-dikim-rock-garden",
    slug: "dikim-rock-garden",
    name: "Dikim Rock Garden",
    description: "An entertainment and venue website for Dikim Rock Garden.",
    overview:
      "Dikim Rock Garden gives the venue a public-facing digital home for brand visibility, visitor information, and event discovery.",
    features: [
      "Entertainment venue presentation",
      "Responsive visitor experience",
      "Live website access",
      "Brand-focused page structure",
    ],
    outcomes: [
      "Improved online visibility for the venue",
      "Made the destination easier to discover",
      "Created a direct platform for visitor engagement",
    ],
    technologies: ["React", "Responsive Design", "Venue Website", "Entertainment"],
    industry: "Entertainment",
    status: "Live",
    websiteUrl: "https://dikim-rock-garden.com.ng",
    image: "/uploads/projects/dikim-rock-garden.png",
    images: ["/uploads/projects/dikim-rock-garden.png"],
    featured: true,
  },
  {
    id: "project-plateau-lawyers-bar-forum",
    slug: "plateau-lawyers-bar-forum",
    name: "Plateau Lawyers Bar Forum",
    description: "A legal community website for the Plateau Lawyers Bar Forum.",
    overview:
      "Plateau Lawyers Bar Forum provides a professional web presence for legal information, community visibility, and public access.",
    features: [
      "Professional legal website",
      "Public information architecture",
      "Responsive access across devices",
      "Community-focused presentation",
    ],
    outcomes: [
      "Strengthened digital credibility for the forum",
      "Made legal community information easier to access",
      "Created a polished public-facing platform",
    ],
    technologies: ["React", "Responsive Design", "Legal Website", "Content Management"],
    industry: "Law",
    status: "Live",
    websiteUrl: "https://plbflaw.org",
    image: "/uploads/projects/plateau-lawyers-bar-forum.png",
    images: ["/uploads/projects/plateau-lawyers-bar-forum.png"],
    featured: true,
  },
  {
    id: "project-aarons-portfolio",
    slug: "aarons-portfolio",
    name: "Aaron's Portfolio",
    description: "A personal portfolio website showcasing Aaron's work, skills, and digital profile.",
    overview:
      "Aaron's Portfolio presents professional experience, selected work, and contact pathways through a clean public portfolio site.",
    features: [
      "Personal brand presentation",
      "Project and skill showcase",
      "Responsive portfolio layout",
      "Direct live profile access",
    ],
    outcomes: [
      "Created a polished personal web presence",
      "Improved access to Aaron's work and profile",
      "Supported professional visibility online",
    ],
    technologies: ["React", "Netlify", "Portfolio", "Responsive Design"],
    industry: "Portfolio",
    status: "Live",
    websiteUrl: "https://aaronksportfolio.netlify.app",
    image: "/uploads/projects/aarons-portfolio.png",
    images: ["/uploads/projects/aarons-portfolio.png"],
    featured: true,
  },
  {
    id: "project-cbrilliance-fc",
    slug: "cbrilliance-fc",
    name: "Cbrilliance FC",
    description: "A sports website for Cbrilliance FC with a public digital presence for the football club.",
    overview:
      "Cbrilliance FC gives the club an online home for visibility, updates, and audience engagement through a responsive sports website.",
    features: [
      "Football club website",
      "Responsive sports presentation",
      "Live public access",
      "Brand and community visibility",
    ],
    outcomes: [
      "Improved digital visibility for the club",
      "Created a public platform for supporters",
      "Made the club easier to discover online",
    ],
    technologies: ["React", "Sports Website", "Responsive Design", "Club Branding"],
    industry: "Sports",
    status: "Live",
    websiteUrl: "https://cbrilliancefc.com",
    image: "/uploads/projects/cbrilliance-fc.png",
    images: ["/uploads/projects/cbrilliance-fc.png"],
    featured: true,
  },
];
