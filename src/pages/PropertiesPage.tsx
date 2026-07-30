import { useEffect, useState } from "react";
import { getProductsByCategories, toProperty } from "@/lib/products-client";
import type { Property } from "@/data/properties";
import PropertiesContent from "@/views/properties/PropertiesContent";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategories(["houses", "apartments", "commercial"])
      .then((products) => setProperties(products.map(toProperty)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-32 text-center text-muted-foreground">Loading properties...</div>;
  }

  return <PropertiesContent properties={properties} />;
}
