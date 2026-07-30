export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  price: number;
  type: "apartment" | "villa" | "penthouse" | "land" | "commercial";
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  video?: string;
  featured: boolean;
  description: string;
  amenities: string[];
  roi: number;
  lat: number;
  lng: number;
  nearby: { name: string; type: string; distance: string }[];
}

export const properties: Property[] = [
  {
    id: "lekki-penthouse",
    title: "Lekki Phase 1 Penthouse",
    location: "Admiralty Way, Lekki",
    city: "Lagos",
    price: 450000000,
    type: "penthouse",
    bedrooms: 4,
    bathrooms: 5,
    area: 320,
    images: [
      "/images/property-1.jpg",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
    ],
    featured: true,
    description: "Stunning penthouse with panoramic lagoon views, smart home automation, and premium finishes throughout.",
    amenities: ["Swimming Pool", "Gym", "24/7 Security", "Smart Home", "Parking", "Concierge"],
    roi: 12.5,
    lat: 6.4474,
    lng: 3.4723,
    nearby: [
      { name: "Lekki British School", type: "School", distance: "1.2 km" },
      { name: "Lagoon Hospital", type: "Hospital", distance: "2.5 km" },
      { name: "Shoprite Lekki", type: "Shopping", distance: "0.8 km" },
    ],
  },
  {
    id: "abuja-villa",
    title: "Maitama Luxury Villa",
    location: "Maitama District",
    city: "Abuja",
    price: 680000000,
    type: "villa",
    bedrooms: 6,
    bathrooms: 7,
    area: 550,
    images: [
      "/images/property-2.jpg",
      "/images/property-4.jpg",
    ],
    featured: true,
    description: "Exclusive villa in Abuja's most prestigious neighborhood with landscaped gardens and private cinema.",
    amenities: ["Private Cinema", "Garden", "Staff Quarters", "Generator", "Borehole", "CCTV"],
    roi: 10.8,
    lat: 9.082,
    lng: 7.4898,
    nearby: [
      { name: "American International School", type: "School", distance: "3 km" },
      { name: "National Hospital", type: "Hospital", distance: "4 km" },
    ],
  },
  {
    id: "vi-apartment",
    title: "Victoria Island Apartment",
    location: "Ahmadu Bello Way",
    city: "Lagos",
    price: 180000000,
    type: "apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    images: [
      "/images/property-3.jpg",
      "/images/apartment-2.jpg",
    ],
    featured: true,
    description: "Modern apartment in the heart of VI with ocean views and premium amenities.",
    amenities: ["Ocean View", "Gym", "Pool", "24/7 Security", "Parking"],
    roi: 11.2,
    lat: 6.4281,
    lng: 3.4219,
    nearby: [
      { name: "Eko Hospital", type: "Hospital", distance: "1.5 km" },
      { name: "Palms Shopping Mall", type: "Shopping", distance: "2 km" },
    ],
  },
  {
    id: "ikeja-land",
    title: "Ikeja GRA Development Land",
    location: "Ikeja GRA",
    city: "Lagos",
    price: 95000000,
    type: "land",
    bedrooms: 0,
    bathrooms: 0,
    area: 1000,
    images: [
      "/images/land-1.jpg",
    ],
    featured: false,
    description: "Prime development land in Ikeja GRA with C of O. Ideal for residential or commercial development.",
    amenities: ["C of O", "Fenced", "Surveyed", "Road Access"],
    roi: 18.5,
    lat: 6.6018,
    lng: 3.3515,
    nearby: [
      { name: "Ikeja Medical Centre", type: "Hospital", distance: "2 km" },
    ],
  },
  {
    id: "banana-island",
    title: "Banana Island Mansion",
    location: "Banana Island",
    city: "Lagos",
    price: 1200000000,
    type: "villa",
    bedrooms: 8,
    bathrooms: 10,
    area: 800,
    images: [
      "/images/property-5.jpg",
      "/images/mansion-2.jpg",
    ],
    featured: true,
    description: "Ultra-luxury mansion on Banana Island with private dock, infinity pool, and helipad access.",
    amenities: ["Private Dock", "Infinity Pool", "Helipad", "Wine Cellar", "Spa", "Smart Home"],
    roi: 8.5,
    lat: 6.4541,
    lng: 3.3947,
    nearby: [
      { name: "Corona School", type: "School", distance: "2 km" },
      { name: "Reddington Hospital", type: "Hospital", distance: "3 km" },
    ],
  },
  {
    id: "port-harcourt-commercial",
    title: "PH Commercial Complex",
    location: "GRA Phase 2",
    city: "Port Harcourt",
    price: 320000000,
    type: "commercial",
    bedrooms: 0,
    bathrooms: 4,
    area: 1200,
    images: [
      "/images/property-6.jpg",
    ],
    featured: false,
    description: "Modern commercial complex in Port Harcourt GRA with high rental yield potential.",
    amenities: ["Elevator", "Parking", "Generator", "Fire Safety", "Reception"],
    roi: 15.3,
    lat: 4.8156,
    lng: 7.0498,
    nearby: [
      { name: "UPTH", type: "Hospital", distance: "5 km" },
    ],
  },
];
