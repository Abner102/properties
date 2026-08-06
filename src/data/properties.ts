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
    title: "Luxurious Property for Sale",
    location: "Just beside Atiku's house on Atiku Street",
    city: "Jos",
    price: 450000000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 0,
    area: 0,
    images: [
      "/uploads/properties/luxurious-property-atiku-street.jpeg",
    ],
    featured: true,
    description:
      "Luxurious property for sale just beside Atiku's house on Atiku Street. All rooms are ensuite, with 2 floors, 4 bedrooms, 3 parlours, 3 balconies, two single-room BQ units with two toilets, and a security house. Standing on one plot of land with R of O title.",
    amenities: [
      "All rooms ensuite",
      "2 floors",
      "4 bedrooms",
      "3 parlours",
      "3 balconies",
      "Two single-room BQ units with two toilets",
      "Security house",
      "Standing on one plot of land",
      "Land title: R of O",
    ],
    roi: 0,
    lat: 9.8965,
    lng: 8.8583,
    nearby: [
      { name: "Atiku's house", type: "Landmark", distance: "Beside property" },
    ],
  },
  {
    id: "abuja-villa",
    title: "Sharp 4-Bedroom Ensuite Duplex",
    location: "Rayfield Golf Club axis, Jos South LGA",
    city: "Jos",
    price: 400000000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 0,
    area: 0,
    images: [
      "/uploads/properties/rayfield-golf-club-duplex.jpeg",
    ],
    featured: true,
    description:
      "For sale: sharp 4-bedroom all ensuite duplex with 2 living rooms, 2 balconies, backup solar power system, kitchen, sit-out/lounge, dining area, store, functional borehole, exquisite landscaping, and space for multiple cars. Land size is 2 plots with C of O title.",
    amenities: [
      "All rooms ensuite",
      "2 living rooms",
      "2 balconies",
      "Backup solar power system",
      "Kitchen",
      "Sit-out/lounge",
      "Dining area",
      "Store",
      "Functional borehole",
      "Exquisite landscaping",
      "Space for multiple cars",
      "Land size: 2 plots",
      "Land title: C of O",
    ],
    roi: 0,
    lat: 9.8708,
    lng: 8.8829,
    nearby: [
      { name: "Rayfield Golf Club", type: "Landmark", distance: "Axis" },
    ],
  },
  {
    id: "vi-apartment",
    title: "4-Bedroom Fully Detached Duplex",
    location: "Gura Topp, Rayfield Extension",
    city: "Jos",
    price: 500000000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 0,
    area: 0,
    images: [
      "/uploads/properties/gura-topp-rayfield-detached-duplex.jpeg",
    ],
    featured: true,
    description:
      "A 4-bedroom fully detached duplex for sale at Gura Topp, Rayfield Extension, with all interior fittings and furniture. Built on two plots of land with C of O title, ground rent up to date, water view, available spot for a swimming pool, and a fully furnished kitchen. Price is N500 million, slightly negotiable.",
    amenities: [
      "CCTV cameras",
      "Interior fittings",
      "Borehole",
      "JED and NESCO electricity supply",
      "Remote-control gate",
      "BQ and gate house",
      "Solid stamp floor",
      "Good water supply",
      "All bedrooms ensuite",
      "Built on two plots of land",
      "Title: C of O",
      "Ground rent up to date",
      "Electric fence",
      "Water view",
      "Swimming pool spot available",
      "Fully furnished kitchen",
      "All interior fittings and furniture included",
      "Slightly negotiable",
    ],
    roi: 0,
    lat: 9.8697,
    lng: 8.8799,
    nearby: [
      { name: "Rayfield Extension", type: "Area", distance: "Gura Topp" },
    ],
  },
  {
    id: "ikeja-land",
    title: "4-Bedroom Flat Duplex",
    location: "Behind Elim, Area 1 Junction, Rayfield",
    city: "Jos",
    price: 350000000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 0,
    area: 0,
    images: [
      "/uploads/properties/behind-elim-area-1-rayfield-duplex.jpeg",
    ],
    featured: true,
    description:
      "A 4-bedroom flat duplex for sale behind Elim, Area 1 Junction, Rayfield, Jos. Built on 2 plots of land with C of O title.",
    amenities: [
      "4-bedroom flat duplex",
      "Built on 2 plots of land",
      "Title: C of O",
      "Located behind Elim",
      "Area 1 Junction, Rayfield",
    ],
    roi: 0,
    lat: 9.8702,
    lng: 8.8815,
    nearby: [
      { name: "Elim", type: "Landmark", distance: "Behind property" },
      { name: "Area 1 Junction", type: "Landmark", distance: "Rayfield" },
    ],
  },
];
