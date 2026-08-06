import { properties as staticProperties, type Property } from "@/data/properties";
import { cars as staticCars, type Car } from "@/data/cars";
import { fetchProducts, fetchProductBySlug } from "@/lib/api";

const DEMO_PROPERTY_SLUGS = new Set(["banana-island", "port-harcourt-commercial"]);

export interface PublicProduct {
  id: string;
  title: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state?: string;
  price: number;
  type: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  featured: boolean;
  description: string;
  amenities: string[];
  brand?: string;
  model?: string;
  year?: number;
  fuel?: string;
  transmission?: string;
  mileage?: number;
  investmentScore?: number;
  lat?: number;
  lng?: number;
  nearby?: { name: string; type: string; distance: string }[];
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
    investmentScore: p.roi,
    lat: p.lat,
    lng: p.lng,
    nearby: p.nearby,
  };
}

function matchesCategories(product: PublicProduct, categories: string[]): boolean {
  return categories.includes(product.category) || categories.includes(product.type);
}

function mergeStaticProperty(product: PublicProduct): PublicProduct {
  const staticProperty = staticProperties.find((p) => p.id === product.slug);
  if (!staticProperty) return product;

  return {
    ...product,
    ...mapStaticProperty(staticProperty),
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
  };
}

function staticFallback(categories: string[], options?: { featured?: boolean; limit?: number }) {
  if (categories.some((c) => c === "cars" || c === "luxury-assets")) {
    let items = staticCars.map(mapStaticCar);
    if (options?.featured) items = items.filter((c) => c.featured);
    return items.slice(0, options?.limit);
  }
  if (categories.includes("lands")) {
    return staticProperties.filter((p) => p.type === "land").map(mapStaticProperty).slice(0, options?.limit);
  }
  let items = staticProperties.filter((p) => p.type !== "land").map(mapStaticProperty);
  if (options?.featured) items = items.filter((p) => p.featured);
  return items.slice(0, options?.limit);
}

function mergeWithStaticProducts(
  products: PublicProduct[],
  categories: string[],
  options?: { featured?: boolean; limit?: number }
): PublicProduct[] {
  const merged = products
    .filter((product) => !DEMO_PROPERTY_SLUGS.has(product.slug))
    .map(mergeStaticProperty);
  const existingSlugs = new Set(merged.map((product) => product.slug));
  const staticItems = staticProperties
    .map(mapStaticProperty)
    .filter((product) => matchesCategories(product, categories))
    .filter((product) => !options?.featured || product.featured)
    .filter((product) => !existingSlugs.has(product.slug));

  return [...merged, ...staticItems].slice(0, options?.limit);
}

export async function getProductsByCategories(
  categories: string[],
  options?: { featured?: boolean; limit?: number }
): Promise<PublicProduct[]> {
  try {
    const products = await fetchProducts({ categories, featured: options?.featured, limit: options?.limit });
    if (products.length > 0) return mergeWithStaticProducts(products, categories, options);
  } catch {
    // fall through
  }
  return staticFallback(categories, options);
}

export async function getProductBySlug(slug: string): Promise<PublicProduct | null> {
  try {
    const product = await fetchProductBySlug(slug);
    if (product) return mergeStaticProperty(product);
  } catch {
    // fall through
  }
  const staticProp = staticProperties.find((p) => p.id === slug);
  if (staticProp) return mapStaticProperty(staticProp);
  const staticCar = staticCars.find((c) => c.id === slug);
  if (staticCar) return mapStaticCar(staticCar);
  return null;
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
    year: p.year ?? new Date().getFullYear(),
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
