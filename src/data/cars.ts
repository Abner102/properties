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
      "/images/car-mercedes.jpg",
      "/images/car-bmw.jpg",
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
      "/images/car-range.jpg",
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
      "/images/car-tesla.jpg",
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
      "/images/car-camry.jpg",
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
      "/images/car-bmw.jpg",
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
      "/images/car-accord.jpg",
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
