import prisma from "./prisma";
import { properties as staticProperties, type Property } from "../../src/data/properties";
import { cars as staticCars, type Car } from "../../src/data/cars";
import type { Product } from "@prisma/client";

export interface PublicProduct {
  id: string;
  title: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state?: string;
  price: number;
  discountPrice?: number;
  type: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  coverImage?: string;
  featured: boolean;
  description: string;
  shortDescription?: string;
  amenities: string[];
  brand?: string;
  model?: string;
  year?: number;
  fuel?: string;
  transmission?: string;
  mileage?: number;
  status: string;
  investmentScore?: number;
  lat?: number;
  lng?: number;
  nearby?: { name: string; type: string; distance: string }[];
}

function jsonArray(value: unknown): string[] {
  return Array.isArray(value) ? (value as string[]) : [];
}

function jsonNearby(value: unknown): { name: string; type: string; distance: string }[] {
  return Array.isArray(value) ? (value as { name: string; type: string; distance: string }[]) : [];
}

function mapDbProduct(p: Product): PublicProduct {
  const images = jsonArray(p.images);
  const cover = p.coverImage || images[0] || "";
  const allImages = cover ? [cover, ...images.filter((i) => i !== cover)] : images;

  return {
    id: p.id,
    title: p.name,
    name: p.name,
    slug: p.slug,
    location: p.address || p.area || p.city || "",
    city: p.city || "",
    state: p.state ?? undefined,
    price: p.price,
    discountPrice: p.discountPrice ?? undefined,
    type: p.propertyType || p.category,
    category: p.category,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.squareMeter || p.landSize || 0,
    images: allImages.length ? allImages : ["/images/property-1.jpg"],
    coverImage: cover,
    featured: p.featured,
    description: p.description,
    shortDescription: p.shortDescription ?? undefined,
    amenities: jsonArray(p.amenities),
    brand: p.brand ?? undefined,
    model: p.model ?? undefined,
    year: p.year ?? undefined,
    fuel: p.fuel ?? undefined,
    transmission: p.transmission ?? undefined,
    mileage: p.mileage ?? undefined,
    status: p.status,
    investmentScore: p.investmentScore ?? undefined,
    lat: p.lat ?? undefined,
    lng: p.lng ?? undefined,
    nearby: jsonNearby(p.nearbySchools),
  };
}

function mapStaticProperty(p: (typeof staticProperties)[0]): PublicProduct {
  return {
    id: p.id,
    title: p.title,
    name: p.title,
    slug: p.id,
    location: p.location,
    city: p.city,
    price: p.price,
    type: p.type,
    category: p.type === "land" ? "lands" : p.type === "villa" || p.type === "penthouse" ? "houses" : p.type,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    images: p.images,
    featured: p.featured,
    description: p.description,
    amenities: p.amenities,
    status: "published",
    investmentScore: p.roi,
    lat: p.lat,
    lng: p.lng,
    nearby: p.nearby,
  };
}

function mapStaticCar(c: (typeof staticCars)[0]): PublicProduct {
  return {
    id: c.id,
    title: `${c.brand} ${c.model}`,
    name: `${c.brand} ${c.model}`,
    slug: c.id,
    location: "Nigeria",
    city: "Lagos",
    price: c.price,
    type: "car",
    category: "cars",
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    images: c.images,
    featured: c.featured,
    description: c.description,
    amenities: c.specs.map((s) => `${s.label}: ${s.value}`),
    brand: c.brand,
    model: c.model,
    year: c.year,
    fuel: c.fuel,
    transmission: c.transmission,
    status: "published",
  };
}

export async function getProductsByCategories(
  categories: string[],
  options?: { featured?: boolean; limit?: number }
): Promise<PublicProduct[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        category: { in: categories },
        status: { in: ["published", "available"] },
        ...(options?.featured ? { featured: true } : {}),
      },
      orderBy: { createdAt: "desc" },
      take: options?.limit || 100,
    });

    if (products.length > 0) {
      return products.map(mapDbProduct);
    }
  } catch {
    // fall through to static
  }

  if (categories.includes("cars")) {
    let items = staticCars.map(mapStaticCar);
    if (options?.featured) items = items.filter((c) => c.featured);
    return items.slice(0, options?.limit);
  }

  if (categories.includes("lands")) {
    return staticProperties
      .filter((p) => p.type === "land")
      .map(mapStaticProperty)
      .slice(0, options?.limit);
  }

  let items = staticProperties
    .filter((p) => p.type !== "land")
    .map(mapStaticProperty);
  if (options?.featured) items = items.filter((p) => p.featured);
  return items.slice(0, options?.limit);
}

export async function getProductBySlug(slug: string): Promise<PublicProduct | null> {
  try {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (product) return mapDbProduct(product);
  } catch {
    // fall through
  }

  const staticProp = staticProperties.find((p) => p.id === slug);
  if (staticProp) return mapStaticProperty(staticProp);

  const staticCar = staticCars.find((c) => c.id === slug);
  if (staticCar) return mapStaticCar(staticCar);

  return null;
}

export async function getAllProductSlugs(categories?: string[]): Promise<string[]> {
  try {
    const products = await prisma.product.findMany({
      where: categories ? { category: { in: categories } } : undefined,
      select: { slug: true },
    });
    if (products.length > 0) return products.map((p) => p.slug);
  } catch {
    // fall through
  }

  if (categories?.includes("cars")) return staticCars.map((c) => c.id);
  if (categories?.includes("lands")) return staticProperties.filter((p) => p.type === "land").map((p) => p.id);
  return staticProperties.map((p) => p.id);
}

const PROPERTY_TYPES = ["apartment", "villa", "penthouse", "land", "commercial"] as const;

export function toProperty(p: PublicProduct): Property {
  const type = PROPERTY_TYPES.includes(p.type as (typeof PROPERTY_TYPES)[number])
    ? (p.type as Property["type"])
    : p.category === "lands"
      ? "land"
      : p.category === "commercial"
        ? "commercial"
        : p.category === "apartments"
          ? "apartment"
          : "villa";

  return {
    id: p.slug,
    title: p.title,
    location: p.location,
    city: p.city,
    price: p.price,
    type,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    images: p.images,
    featured: p.featured,
    description: p.description,
    amenities: p.amenities,
    roi: p.investmentScore || 0,
    lat: p.lat || 0,
    lng: p.lng || 0,
    nearby: p.nearby || [],
  };
}

export function toCar(p: PublicProduct): Car {
  const specs = p.amenities.length
    ? p.amenities.map((a) => {
        const [label, ...rest] = a.split(": ");
        return { label: label || "Spec", value: rest.join(": ") || a };
      })
    : [{ label: "Mileage", value: p.mileage ? `${p.mileage} km` : "N/A" }];

  return {
    id: p.slug,
    brand: p.brand || "Unknown",
    model: p.model || p.name,
    year: p.year || new Date().getFullYear(),
    price: p.price,
    fuel: (p.fuel as Car["fuel"]) || "petrol",
    transmission: (p.transmission as Car["transmission"]) || "automatic",
    luxury: p.category === "luxury-assets" || p.price > 50000000,
    images: p.images,
    description: p.description,
    specs,
    featured: p.featured,
  };
}

export interface LandListing {
  id: string;
  title: string;
  slug: string;
  location: string;
  state: string;
  price: number;
  category: string;
  area: number;
  image: string;
  description: string;
}

export function toLandListing(p: PublicProduct): LandListing {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    location: p.location,
    state: p.state || p.city,
    price: p.price,
    category: p.type || "residential",
    area: p.area,
    image: p.images[0] || "",
    description: p.description,
  };
}
