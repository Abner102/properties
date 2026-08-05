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
    id: "toyota-corolla-2017-white",
    brand: "Toyota",
    model: "Corolla",
    year: 2017,
    price: 23000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: false,
    images: [
      "/uploads/cars/toyota-corolla-2017-front.jpeg",
      "/uploads/cars/toyota-corolla-2017-side.jpeg",
      "/uploads/cars/toyota-corolla-2017-back.jpeg",
    ],
    description: "White 2017 Toyota Corolla with front, side, and rear views available.",
    specs: [
      { label: "Color", value: "White" },
      { label: "Body", value: "Sedan" },
      { label: "Views", value: "Front, side, rear" },
      { label: "Mileage", value: "Available on request" },
    ],
    featured: true,
  },
  {
    id: "toyota-camry-2015-red",
    brand: "Toyota",
    model: "Camry",
    year: 2015,
    price: 19000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: false,
    images: [
      "/uploads/cars/toyota-camry-2015-front.jpeg",
      "/uploads/cars/toyota-camry-2015-side.jpeg",
      "/uploads/cars/toyota-camry-2015-back.jpeg",
    ],
    description: "Red 2015 Toyota Camry with front, side, and rear views available.",
    specs: [
      { label: "Color", value: "Red" },
      { label: "Body", value: "Sedan" },
      { label: "Views", value: "Front, side, rear" },
      { label: "Mileage", value: "Available on request" },
    ],
    featured: true,
  },
  {
    id: "mercedes-benz-gle-400-white",
    brand: "Mercedes-Benz",
    model: "GLE 400",
    year: 0,
    price: 35000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: true,
    images: [
      "/uploads/cars/mercedes-gle-400-white-front.jpeg",
      "/uploads/cars/mercedes-gle-400-white-side.jpeg",
      "/uploads/cars/mercedes-gle-400-white-back.jpeg",
    ],
    description: "White Mercedes-Benz GLE 400 with front, side, and rear views available.",
    specs: [
      { label: "Color", value: "White" },
      { label: "Body", value: "SUV" },
      { label: "Drivetrain", value: "4MATIC" },
      { label: "Mileage", value: "Available on request" },
    ],
    featured: true,
  },
  {
    id: "mercedes-benz-ml-350-blue",
    brand: "Mercedes-Benz",
    model: "ML 350",
    year: 0,
    price: 33000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: true,
    images: [
      "/uploads/cars/mercedes-ml-350-blue-front.jpeg",
      "/uploads/cars/mercedes-ml-350-blue-side.jpeg",
      "/uploads/cars/mercedes-ml-350-blue-back.jpeg",
    ],
    description: "Navy blue Mercedes-Benz ML 350 with front, side, and rear views available.",
    specs: [
      { label: "Color", value: "Navy / Dark Blue" },
      { label: "Body", value: "SUV" },
      { label: "Drivetrain", value: "4MATIC" },
      { label: "Mileage", value: "Available on request" },
    ],
    featured: false,
  },
  {
    id: "lexus-nx200t-black",
    brand: "Lexus",
    model: "NX200t",
    year: 0,
    price: 38000000,
    fuel: "petrol",
    transmission: "automatic",
    luxury: true,
    images: [
      "/uploads/cars/lexus-nx200t-black-front.jpeg",
      "/uploads/cars/lexus-nx200t-black-side.jpeg",
      "/uploads/cars/lexus-nx200t-black-back.jpeg",
    ],
    description: "Black Lexus NX200t with front, side, and rear views available.",
    specs: [
      { label: "Color", value: "Black" },
      { label: "Body", value: "SUV" },
      { label: "Views", value: "Front, side, rear" },
      { label: "Mileage", value: "Available on request" },
    ],
    featured: false,
  },
];
