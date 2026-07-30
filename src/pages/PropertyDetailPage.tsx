import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProductBySlug, toProperty } from "@/lib/products-client";
import type { Property } from "@/data/properties";
import PropertyDetailContent from "@/views/properties/PropertyDetailContent";

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getProductBySlug(id).then((p) => setProperty(p ? toProperty(p) : null));
  }, [id]);

  if (property === undefined) {
    return <div className="pt-32 text-center text-muted-foreground">Loading...</div>;
  }
  if (!property) return <Navigate to="/404" replace />;

  return <PropertyDetailContent property={property} />;
}
