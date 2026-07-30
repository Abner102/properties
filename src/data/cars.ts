export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  fuel: "petrol" | "diesel" | "electric" | "hybrid";
  transmission: "automatic" | "manual";
  luxury: boolean;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
  featured: boolean;
}

export const cars: Car[] = [
  {
    id: "mercedes-s-class",
    brand: "Mercedes-Benz",
    model: "S-Class 2024",
    year: 2024,
    price: 85000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: true,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1563720360172-67b8f087c9b8?w=1200&h=800&fit=crop",
    ],
    description: "The pinnacle of luxury motoring. Brand new Mercedes-Benz S-Class with full options.",
    specs: [
      { label: "Engine", value: "3.0L Turbo" },
      { label: "Horsepower", value: "429 HP" },
      { label: "Mileage", value: "0 km" },
      { label: "Color", value: "Obsidian Black" },
    ],
    featured: true,
  },
  {
    id: "range-rover-sport",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    price: 72000000,
    fuel: "diesel",
    transmission: "automatic",
    luxury: true,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=800&fit=crop",
    ],
    description: "Powerful and elegant SUV perfect for Nigerian roads with premium leather interior.",
    specs: [
      { label: "Engine", value: "3.0L Diesel" },
      { label: "Horsepower", value: "350 HP" },
      { label: "Mileage", value: "5,000 km" },
      { label: "Color", value: "Santorini Black" },
    ],
    featured: true,
  },
  {
    id: "tesla-model-s",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 95000000,
    fuel: "electric",
    transmission: "automatic",
    luxury: true,
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&h=800&fit=crop",
    ],
    description: "The fastest production sedan. Zero emissions, maximum performance.",
    specs: [
      { label: "Range", value: "628 km" },
      { label: "0-100 km/h", value: "2.1s" },
      { label: "Mileage", value: "0 km" },
      { label: "Color", value: "Pearl White" },
    ],
    featured: true,
  },
  {
    id: "toyota-camry",
    brand: "Toyota",
    model: "Camry 2023",
    year: 2023,
    price: 18500000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: false,
    images: [
      "https://images.unsplash.com/photo-1621007947382-b6763a8ec6cc?w=1200&h=800&fit=crop",
    ],
    description: "Reliable and fuel-efficient sedan. Perfect for daily commuting in Lagos.",
    specs: [
      { label: "Engine", value: "2.5L" },
      { label: "Horsepower", value: "203 HP" },
      { label: "Mileage", value: "12,000 km" },
      { label: "Color", value: "Silver" },
    ],
    featured: false,
  },
  {
    id: "bmw-x7",
    brand: "BMW",
    model: "X7 M60i",
    year: 2024,
    price: 78000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: true,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=800&fit=crop",
    ],
    description: "Spacious luxury SUV with third-row seating and cutting-edge technology.",
    specs: [
      { label: "Engine", value: "4.4L V8" },
      { label: "Horsepower", value: "523 HP" },
      { label: "Mileage", value: "2,000 km" },
      { label: "Color", value: "Alpine White" },
    ],
    featured: false,
  },
  {
    id: "honda-accord",
    brand: "Honda",
    model: "Accord 2022",
    year: 2022,
    price: 12000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: false,
    images: [
      "https://images.unsplash.com/photo-1609521263047-e8c566f5d232?w=1200&h=800&fit=crop",
    ],
    description: "Affordable and dependable. Great value for money with low maintenance costs.",
    specs: [
      { label: "Engine", value: "1.5L Turbo" },
      { label: "Horsepower", value: "192 HP" },
      { label: "Mileage", value: "25,000 km" },
      { label: "Color", value: "Modern Steel" },
    ],
    featured: false,
  },
];
