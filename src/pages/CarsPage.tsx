import { useEffect, useState } from "react";
import { getProductsByCategories, toCar } from "@/lib/products-client";
import type { Car } from "@/data/cars";
import CarsContent from "@/views/cars/CarsContent";

export default function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategories(["cars", "luxury-assets"])
      .then((products) => setCars(products.map(toCar)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-32 text-center text-muted-foreground">Loading vehicles...</div>;
  }

  return <CarsContent cars={cars} />;
}
