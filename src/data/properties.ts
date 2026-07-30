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
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa0a6a3?w=1200&h=800&fit=crop",
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
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
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
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
    ],
    featured: true,
    description: "Modern apartment in the heart of Victoria Island with ocean views and world-class amenities.",
    amenities: ["Ocean View", "Gym", "Rooftop Lounge", "Parking", "Elevator"],
    roi: 14.2,
    lat: 6.4281,
    lng: 3.4219,
    nearby: [
      { name: "Lagos Preparatory School", type: "School", distance: "1.5 km" },
      { name: "Lagoon Hospital VI", type: "Hospital", distance: "1 km" },
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
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&h=800&fit=crop",
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
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1600047509807-ba8f84d4fa21?w=1200&h=800&fit=crop",
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
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
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
