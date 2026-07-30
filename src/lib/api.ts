const API_BASE = import.meta.env.VITE_API_URL || "";

export async function fetchProducts(params: {
  categories?: string[];
  featured?: boolean;
  limit?: number;
}) {
  const search = new URLSearchParams();
  if (params.categories?.length) search.set("categories", params.categories.join(","));
  if (params.featured) search.set("featured", "true");
  if (params.limit) search.set("limit", String(params.limit));

  const res = await fetch(`${API_BASE}/api/public/products?${search}`, { credentials: "include" });
  if (!res.ok) return [];
  const data = await res.json();
  return data.products || [];
}

export async function fetchProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/api/public/products/${slug}`, { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.product || null;
}
