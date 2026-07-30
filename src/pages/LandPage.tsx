import { useEffect, useState } from "react";
import { getProductsByCategories, toLandListing } from "@/lib/products-client";
import type { LandListing } from "@/lib/products-client";
import LandContent from "@/views/land/LandContent";

export default function LandPage() {
  const [lands, setLands] = useState<LandListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByCategories(["lands"])
      .then((products) => setLands(products.map(toLandListing)))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="pt-32 text-center text-muted-foreground">Loading land listings...</div>;
  }

  return <LandContent lands={lands} />;
}
