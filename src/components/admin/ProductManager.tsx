"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Search, Edit, Trash2, Copy, Star, Archive, Eye, MoreHorizontal,
  CheckSquare, Square, Download,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CATEGORIES, PRODUCT_STATUSES, AMENITIES } from "@/lib/constants";
import { AdminHeader } from "./AdminSidebar";

interface Product {
  _id: string;
  name: string;
  productCode?: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  status: string;
  featured: boolean;
  views: number;
  city?: string;
  state?: string;
  bedrooms?: number;
  brand?: string;
  model?: string;
  coverImage?: string;
  shortDescription?: string;
  description?: string;
  amenities?: string[];
  [key: string]: unknown;
}

const EMPTY_FORM: Partial<Product> = {
  name: "", category: "houses", price: 0, status: "draft", featured: false,
  bedrooms: 0, bathrooms: 0, amenities: [], images: [], tags: [],
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<Partial<Product>>(EMPTY_FORM);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ sort, limit: "50" });
    if (search) params.set("search", search);
    if (categoryFilter) params.set("category", categoryFilter);
    if (statusFilter) params.set("status", statusFilter);
    try {
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch {
      setProducts([]);
    }
    setLoading(false);
  }, [search, categoryFilter, statusFilter, sort]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleAction = async (id: string, action: string) => {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleSave = async () => {
    const url = editing ? `/api/products/${editing._id}` : "/api/products";
    const method = editing ? "PUT" : "POST";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    fetchProducts();
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm(product);
    setShowForm(true);
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const bulkAction = async (action: string) => {
    for (const id of selected) {
      await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
    }
    setSelected(new Set());
    fetchProducts();
  };

  const exportCSV = () => {
    const headers = ["Name", "Code", "Category", "Price", "Status", "City"];
    const rows = products.map((p) => [p.name, p.productCode, p.category, p.price, p.status, p.city].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "products.csv";
    a.click();
  };

  if (showForm) {
    return (
      <div>
        <AdminHeader title={editing ? "Edit Product" : "Add Product"} onMenuClick={() => {}} />
        <GlassCard className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">Product Name *</label>
              <input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Category *</label>
              <select value={form.category || "houses"} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm">
                {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c.replace("-", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Status</label>
              <select value={form.status || "draft"} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm">
                {PRODUCT_STATUSES.map((s) => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Price (NGN)</label>
              <input type="number" value={form.price || 0} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Discount Price</label>
              <input type="number" value={form.discountPrice || ""} onChange={(e) => setForm({ ...form, discountPrice: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">State</label>
              <input value={form.state || ""} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">City</label>
              <input value={form.city || ""} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Bedrooms</label>
              <input type="number" value={form.bedrooms || 0} onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Bathrooms</label>
              <input type="number" value={(form.bathrooms as number) || 0} onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Brand (Cars)</label>
              <input value={form.brand || ""} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Model</label>
              <input value={form.model || ""} onChange={(e) => setForm({ ...form, model: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Cover Image URL</label>
              <input value={form.coverImage || ""} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" placeholder="https://..." />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Meta Title (SEO)</label>
              <input value={(form.metaTitle as string) || ""} onChange={(e) => setForm({ ...form, metaTitle: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">Short Description</label>
              <input value={form.shortDescription || ""} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground">Description</label>
              <textarea value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-muted-foreground mb-2 block">Amenities</label>
              <div className="flex flex-wrap gap-2">
                {AMENITIES.map((a) => {
                  const checked = (form.amenities || []).includes(a);
                  return (
                    <label key={a} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs cursor-pointer border ${checked ? "border-gold bg-gold/10 text-gold" : "border-border"}`}>
                      <input type="checkbox" checked={checked} onChange={() => {
                        const am = form.amenities || [];
                        setForm({ ...form, amenities: checked ? am.filter((x) => x !== a) : [...am, a] });
                      }} className="sr-only" />
                      {a}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="md:col-span-2 flex flex-wrap gap-3">
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured || false} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-gold" /> Featured</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={(form.trending as boolean) || false} onChange={(e) => setForm({ ...form, trending: e.target.checked })} className="accent-gold" /> Trending</label>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={(form.popular as boolean) || false} onChange={(e) => setForm({ ...form, popular: e.target.checked })} className="accent-gold" /> Popular</label>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave}>{editing ? "Update Product" : "Create Product"}</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY_FORM); }}>Cancel</Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Product Management" onMenuClick={() => {}}>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="p-2 rounded-lg glass hover:text-gold" title="Export CSV"><Download size={16} /></button>
          <Button onClick={() => { setShowForm(true); setEditing(null); setForm(EMPTY_FORM); }}><Plus size={16} /> Add Product</Button>
        </div>
      </AdminHeader>

      <GlassCard className="mb-6">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-background border border-border text-sm" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-background border border-border text-sm">
            <option value="">All Categories</option>
            {PRODUCT_CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("-", " ")}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg bg-background border border-border text-sm">
            <option value="">All Status</option>
            {PRODUCT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 rounded-lg bg-background border border-border text-sm">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price_asc">Price Low</option>
            <option value="price_desc">Price High</option>
            <option value="views">Most Viewed</option>
          </select>
        </div>
        {selected.size > 0 && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <span className="text-sm text-muted-foreground">{selected.size} selected</span>
            <button onClick={() => bulkAction("publish")} className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold">Publish</button>
            <button onClick={() => bulkAction("archive")} className="text-xs px-3 py-1 rounded-full glass">Archive</button>
            <button onClick={() => bulkAction("feature")} className="text-xs px-3 py-1 rounded-full glass">Feature</button>
          </div>
        )}
      </GlassCard>

      <p className="text-sm text-muted-foreground mb-4">{total} products {loading && "(loading...)"}</p>

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="p-4 w-8"><CheckSquare size={14} /></th>
              <th className="p-4">Product</th>
              <th className="p-4">Code</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4">Views</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-4">
                  <button onClick={() => toggleSelect(p._id)}>
                    {selected.has(p._id) ? <CheckSquare size={14} className="text-gold" /> : <Square size={14} />}
                  </button>
                </td>
                <td className="p-4">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.city}{p.state ? `, ${p.state}` : ""}</p>
                </td>
                <td className="p-4 text-xs text-muted-foreground">{p.productCode}</td>
                <td className="p-4 capitalize text-xs">{p.category?.replace("-", " ")}</td>
                <td className="p-4 text-gold font-medium">{formatPrice(p.price)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                    p.status === "published" || p.status === "available" ? "bg-green-500/10 text-green-400" :
                    p.status === "sold" ? "bg-red-500/10 text-red-400" :
                    p.status === "draft" ? "bg-muted text-muted-foreground" : "bg-gold/10 text-gold"
                  }`}>{p.status}</span>
                  {p.featured && <Star size={12} className="inline ml-1 text-gold fill-gold" />}
                </td>
                <td className="p-4 text-muted-foreground">{p.views || 0}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 rounded hover:bg-muted" title="Edit"><Edit size={14} /></button>
                    <button onClick={() => handleAction(p._id, "duplicate")} className="p-1.5 rounded hover:bg-muted" title="Duplicate"><Copy size={14} /></button>
                    <button onClick={() => handleAction(p._id, p.featured ? "unfeature" : "feature")} className="p-1.5 rounded hover:bg-muted" title="Feature"><Star size={14} /></button>
                    <button onClick={() => handleAction(p._id, "publish")} className="p-1.5 rounded hover:bg-muted" title="Publish"><Eye size={14} /></button>
                    <button onClick={() => handleAction(p._id, "archive")} className="p-1.5 rounded hover:bg-muted" title="Archive"><Archive size={14} /></button>
                    <button onClick={() => handleDelete(p._id)} className="p-1.5 rounded hover:bg-muted text-red-400" title="Delete"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!products.length && !loading && (
          <p className="text-center text-muted-foreground py-12">No products found. Add your first product above.</p>
        )}
      </GlassCard>
    </div>
  );
}
