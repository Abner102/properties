import { useEffect, useState } from "react";
import { getProductsByCategories, toProperty } from "@/lib/products-client";
import type { Property } from "@/data/properties";
import PropertiesContent from "@/views/properties/PropertiesContent";
import PageLoader from "@/components/ui/PageLoader";

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategories(["houses", "apartments", "commercial"])
      .then((products) => setProperties(products.map(toProperty)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <PageLoader label="Loading properties" />;
  }

  return <PropertiesContent properties={properties} />;
}
