import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProductBySlug, toCar } from "@/lib/products-client";
import type { Car } from "@/data/cars";
import CarDetailContent from "@/views/cars/CarDetailContent";
import PageLoader from "@/components/ui/PageLoader";

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getProductBySlug(id).then((p) => setCar(p ? toCar(p) : null));
  }, [id]);

  if (car === undefined) {
    return <PageLoader label="Loading vehicle" />;
  }
  if (!car) return <Navigate to="/404" replace />;

  return <CarDetailContent car={car} />;
}
