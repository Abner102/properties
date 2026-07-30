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
