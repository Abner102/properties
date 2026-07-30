export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: "real-estate" | "technology" | "investment" | "market";
  image: string;
  author: string;
  date: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "lagos-real-estate-investment-guide-2026",
    title: "Lagos Real Estate Investment Guide 2026",
    excerpt: "Everything you need to know about investing in Lagos property this year, from emerging neighborhoods to ROI expectations.",
    content: "Lagos remains Nigeria's premier real estate market...",
    category: "real-estate",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
    author: "Emmanuel Firmin",
    date: "2026-03-15",
    readTime: 8,
  },
  {
    slug: "ai-transforming-property-management",
    title: "How AI is Transforming Property Management",
    excerpt: "From predictive maintenance to automated tenant screening, AI is revolutionizing how we manage properties.",
    content: "Artificial intelligence is no longer a futuristic concept...",
    category: "technology",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    author: "David Infinity",
    date: "2026-03-10",
    readTime: 6,
  },
  {
    slug: "nigerian-property-market-q1-2026",
    title: "Nigerian Property Market Update: Q1 2026",
    excerpt: "Key trends, price movements, and investment opportunities in Nigeria's property market for the first quarter.",
    content: "The Nigerian property market continues to show resilience...",
    category: "market",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    author: "Emmanuel Firmin",
    date: "2026-03-01",
    readTime: 10,
  },
  {
    slug: "building-wealth-through-diversification",
    title: "Building Wealth Through Smart Diversification",
    excerpt: "Why the smartest Nigerian investors are combining real estate, tech stocks, and digital assets.",
    content: "Diversification is the cornerstone of wealth building...",
    category: "investment",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=600&fit=crop",
    author: "David Infinity",
    date: "2026-02-20",
    readTime: 7,
  },
  {
    slug: "nextjs-real-estate-websites",
    title: "Why Next.js is Perfect for Real Estate Websites",
    excerpt: "Technical deep-dive into why modern real estate platforms are built with Next.js and what it means for performance.",
    content: "Real estate websites have unique requirements...",
    category: "technology",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
    author: "Emmanuel Firmin",
    date: "2026-02-10",
    readTime: 12,
  },
  {
    slug: "abuja-vs-lagos-investment",
    title: "Abuja vs Lagos: Where Should You Invest?",
    excerpt: "A data-driven comparison of Nigeria's two biggest property markets for investors in 2026.",
    content: "The age-old debate between Abuja and Lagos...",
    category: "real-estate",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200&h=600&fit=crop",
    author: "David Infinity",
    date: "2026-01-28",
    readTime: 9,
  },
];

export const services = [
  {
    category: "Real Estate",
    items: [
      { title: "Real Estate Sales", description: "Premium property sales across Lagos, Abuja, and Port Harcourt with full legal support.", icon: "Building2" },
      { title: "Land Acquisition", description: "Secure prime land with verified titles and development potential analysis.", icon: "MapPin" },
      { title: "Property Management", description: "End-to-end management including tenant screening, rent collection, and maintenance.", icon: "Key" },
      { title: "Property Development", description: "From concept to completion — we develop luxury residential and commercial properties.", icon: "Hammer" },
    ],
  },
  {
    category: "Technology",
    items: [
      { title: "Software Development", description: "Custom enterprise software built with modern frameworks and best practices.", icon: "Code2" },
      { title: "Mobile Apps", description: "Native and cross-platform mobile applications for iOS and Android.", icon: "Smartphone" },
      { title: "Web Applications", description: "High-performance web apps with stunning UI and seamless user experience.", icon: "Globe" },
      { title: "AI Solutions", description: "Intelligent automation, chatbots, and data analytics powered by cutting-edge AI.", icon: "Brain" },
    ],
  },
  {
    category: "Creative & Marketing",
    items: [
      { title: "Digital Marketing", description: "Data-driven marketing strategies that grow your brand and generate leads.", icon: "TrendingUp" },
      { title: "Content Creation", description: "Professional photography, videography, and social media content for luxury brands.", icon: "Camera" },
    ],
  },
];

export const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Property Investor",
    content: "Firminfinity helped me acquire three properties in Lekki with incredible ROI. Their tech-driven approach makes everything transparent and efficient.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Chukwuemeka Nwosu",
    role: "CEO, TechStart NG",
    content: "They built our entire platform from scratch. The quality of their software development is world-class. Highly recommended.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    name: "Fatima Abdullahi",
    role: "Luxury Car Buyer",
    content: "Purchased my Mercedes S-Class through Firminfinity. Seamless process from selection to delivery. True luxury experience.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];
