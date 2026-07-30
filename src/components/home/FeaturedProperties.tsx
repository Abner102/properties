import { useEffect, useState } from "react";
import { getProductsByCategories, toProperty } from "@/lib/products-client";
import type { Property } from "@/data/properties";
import FeaturedPropertiesClient from "@/components/home/FeaturedPropertiesClient";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    getProductsByCategories(["houses", "apartments", "commercial"], { featured: true, limit: 6 })
      .then((products) => setProperties(products.map(toProperty)));
  }, []);

  if (properties.length === 0) return null;
  return <FeaturedPropertiesClient properties={properties} />;
}
