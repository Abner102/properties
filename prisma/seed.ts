import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { generateProductCode } from "../server/lib/constants";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "endlessinfinity16@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const hashed = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { password: hashed, name: "Super Admin", role: "super_admin" },
    create: { email, password: hashed, name: "Super Admin", role: "super_admin" },
  });

  await prisma.settings.upsert({
    where: { key: "default" },
    update: {
      email: "endlessinfinity16@gmail.com",
      address: "Along Yakubu Gowon Way, Jos, Plateau State, Nigeria",
    },
    create: {
      key: "default",
      companyName: "Endless Infinity Properties",
      phone: "07065109007",
      whatsapp: "07065109007",
      email: "endlessinfinity16@gmail.com",
      address: "Along Yakubu Gowon Way, Jos, Plateau State, Nigeria",
    },
  });

  const categories = [
    { name: "Houses", slug: "houses", order: 1 },
    { name: "Lands", slug: "lands", order: 2 },
    { name: "Apartments", slug: "apartments", order: 3 },
    { name: "Commercial Properties", slug: "commercial", order: 4 },
    { name: "Cars", slug: "cars", order: 5 },
    { name: "Luxury Assets", slug: "luxury-assets", order: 6 },
    { name: "Software Services", slug: "software-services", order: 7 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const products = [
    {
      name: "Lekki Phase 1 Luxury Penthouse",
      slug: "lekki-penthouse",
      category: "apartments",
      price: 450000000,
      city: "Lagos",
      state: "Lagos",
      bedrooms: 4,
      bathrooms: 5,
      status: "published",
      featured: true,
      amenities: ["Swimming Pool", "Gym", "24/7 Security", "Smart Home"],
      coverImage: "/images/property-1.jpg",
      description: "Stunning penthouse with panoramic lagoon views.",
    },
    {
      name: "Ikeja GRA Development Land",
      slug: "ikeja-gra-land",
      category: "lands",
      price: 95000000,
      city: "Lagos",
      state: "Lagos",
      landSize: 1000,
      status: "published",
      featured: true,
      coverImage: "/images/land-1.jpg",
      description: "Prime land with C of O in Ikeja GRA.",
    },
    {
      name: "Mercedes-Benz S-Class 2024",
      slug: "mercedes-s-class",
      category: "cars",
      brand: "Mercedes-Benz",
      model: "S-Class",
      year: 2024,
      price: 85000000,
      fuel: "petrol",
      transmission: "automatic",
      status: "published",
      featured: true,
      coverImage: "/images/car-mercedes.jpg",
      description: "Brand new Mercedes-Benz S-Class with full options.",
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: { ...p, productCode: generateProductCode(p.category) },
      create: { ...p, productCode: generateProductCode(p.category) },
    });
  }

  const projects = [
    { name: "Nexora SMS", slug: "nexora-sms", industry: "Communication", liveUrl: "https://nexorasms.com", featured: true, published: true, description: "Enterprise bulk SMS platform." },
    { name: "JosCity", slug: "joscity", industry: "Government", liveUrl: "https://joscity.com", featured: true, published: true, description: "Digital city platform." },
    { name: "Afresh Center", slug: "afresh-center", industry: "Healthcare", liveUrl: "https://afreshcenter.org", featured: true, published: true, description: "Healthcare management platform." },
    { name: "JobFinix", slug: "jobfinix", industry: "HR/Tech", liveUrl: "https://jobfinix.com", featured: true, published: true, description: "Job marketplace." },
    { name: "Gatewav", slug: "gatewav", industry: "Finance", liveUrl: "https://gatewav.com", featured: true, published: true, description: "Payment gateway." },
  ];

  for (const p of projects) {
    await prisma.softwareProject.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  const team = [
    {
      name: "Emmanuel Infinity",
      position: "Co-Founder & Chief Technology Officer",
      bio: "Full-stack software engineer leading technology initiatives at Endless Infinity Properties.",
      email: "endlessinfinity16@gmail.com",
      isFounder: true,
      order: 1,
      published: true,
    },
    {
      name: "David Endless",
      position: "Co-Founder & Chief Executive Officer",
      bio: "Software architect and real estate investor building lasting value for clients.",
      email: "endlessinfinity16@gmail.com",
      isFounder: true,
      order: 2,
      published: true,
    },
    {
      name: "Sarah Bello",
      position: "Real Estate Consultant",
      bio: "Helps clients find verified properties and guides them through every step of the buying process.",
      email: "endlessinfinity16@gmail.com",
      isFounder: false,
      order: 3,
      published: true,
    },
  ];

  for (const member of team) {
    const existing = await prisma.team.findFirst({ where: { name: member.name } });
    if (existing) {
      await prisma.team.update({ where: { id: existing.id }, data: member });
    } else {
      await prisma.team.create({ data: member });
    }
  }

  console.log("Supabase seed completed. Admin:", email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
