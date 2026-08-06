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
    slug: "smfest-abuja-2026-advantagex",
    title: "SMFest Abuja 2026: AdvantageX",
    excerpt:
      "SMFest Abuja 2026 is scheduled for October 16-18, 2026, in Abuja, Nigeria, with the theme AdvantageX.",
    content:
      "SMFest Abuja 2026 is scheduled for October 16-18, 2026, in Abuja, Nigeria. Convened by tech entrepreneur Ajah Excel, this flagship digital and tech event centers around the theme AdvantageX, designed to help creators, founders, and entrepreneurs leverage technology and social media for exponential growth.\n\nEvent details: Dates: October 16-18, 2026. Location: Abuja, Nigeria. Theme: AdvantageX (The Exponential Advantage). Convener: Ajah Excel.\n\nTickets and registration: Standard ticket variants range from N15,000 to N250,000, with temporary 50% discount promotions active. Reservations can be secured directly through the Official SMFest Website: https://smfest.org/",
    category: "technology",
    image: "/uploads/blog/smfest-abuja-2026.png",
    author: "Endless Infinity",
    date: "2026-08-06",
    readTime: 4,
  },
  {
    slug: "ai-transforming-property-management",
    title: "How AI is Transforming Property Management",
    excerpt: "From predictive maintenance to automated tenant screening, AI is revolutionizing how we manage properties.",
    content: "Artificial intelligence is no longer a futuristic concept...",
    category: "technology",
    image: "/images/blog-2.jpg",
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
    image: "/images/blog-3.jpg",
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
    image: "/images/blog-4.jpg",
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
    image: "/images/blog-5.jpg",
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
    image: "/images/blog-6.jpg",
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
    image: "/images/avatar-1.jpg",
    rating: 5,
  },
  {
    name: "Chukwuemeka Nwosu",
    role: "CEO, TechStart NG",
    content: "They built our entire platform from scratch. The quality of their software development is world-class. Highly recommended.",
    image: "/images/avatar-2.jpg",
    rating: 5,
  },
  {
    name: "Fatima Abdullahi",
    role: "Luxury Car Buyer",
    content: "Purchased my Mercedes S-Class through Firminfinity. Seamless process from selection to delivery. True luxury experience.",
    image: "/images/avatar-3.jpg",
    rating: 5,
  },
];
