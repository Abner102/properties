import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import AppImage from "@/components/ui/AppImage";
import GalleryUpload from "@/components/admin/GalleryUpload";
import { AdminHeader } from "./AdminSidebar";

interface SoftwareProject {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  overview?: string;
  features?: string[] | string;
  outcomes?: string[] | string;
  client?: string;
  industry?: string;
  status?: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies?: string[] | string;
  images?: string[];
  screenshots?: string[];
  featured?: boolean;
  published?: boolean;
}

const emptyItem: Omit<SoftwareProject, "_id"> = {
  name: "",
  slug: "",
  description: "",
  overview: "",
  features: [],
  outcomes: [],
  client: "",
  industry: "",
  status: "completed",
  liveUrl: "",
  githubUrl: "",
  technologies: [],
  images: [],
  screenshots: [],
  featured: false,
  published: true,
};

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === "string");
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return toStringArray(parsed);
      } catch {
        /* fall through */
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}

function technologiesToInput(value: unknown): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "string") return value;
  return "";
}

export default function SoftwareProjectManager() {
  const [items, setItems] = useState<SoftwareProject[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<SoftwareProject | null>(null);
  const [form, setForm] = useState<Omit<SoftwareProject, "_id">>(emptyItem);
  const [techInput, setTechInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [outcomesInput, setOutcomesInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/projects", { credentials: "include" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const buildPayload = () => ({
    name: form.name,
    slug: form.slug || undefined,
    description: form.description || undefined,
    overview: form.overview || undefined,
    features: toStringArray(featuresInput),
    outcomes: toStringArray(outcomesInput),
    client: form.client || undefined,
    industry: form.industry || undefined,
    status: form.status || "completed",
    liveUrl: form.liveUrl || undefined,
    githubUrl: form.githubUrl || undefined,
    technologies: toStringArray(techInput),
    images: form.images || [],
    screenshots: form.screenshots || [],
    featured: !!form.featured,
    published: form.published !== false,
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/projects/${editing._id}` : "/api/admin/projects";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload()),
      });
      if (!res.ok) throw new Error("Save failed");
      setShowForm(false);
      setEditing(null);
      setForm(emptyItem);
      setTechInput("");
      setFeaturesInput("");
      setOutcomesInput("");
      fetchItems();
    } catch {
      alert("Could not save project. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE", credentials: "include" });
    fetchItems();
  };

  const openEdit = (item: SoftwareProject) => {
    setEditing(item);
    setForm({
      name: item.name || "",
      slug: item.slug || "",
      description: item.description || "",
      overview: item.overview || "",
      features: toStringArray(item.features),
      outcomes: toStringArray(item.outcomes),
      client: item.client || "",
      industry: item.industry || "",
      status: item.status || "completed",
      liveUrl: item.liveUrl || "",
      githubUrl: item.githubUrl || "",
      technologies: toStringArray(item.technologies),
      images: toStringArray(item.images),
      screenshots: toStringArray(item.screenshots),
      featured: !!item.featured,
      published: item.published !== false,
    });
    setTechInput(technologiesToInput(item.technologies));
    setFeaturesInput(technologiesToInput(item.features));
    setOutcomesInput(technologiesToInput(item.outcomes));
    setShowForm(true);
  };

  const coverImage = (item: SoftwareProject) => {
    const images = toStringArray(item.images);
    return images[0] || "";
  };

  if (showForm) {
    return (
      <div>
        <AdminHeader title={editing ? "Edit Software Project" : "Add Software Project"} onMenuClick={() => {}} />
        <GlassCard className="max-w-2xl">
          <div className="space-y-4">
            <GalleryUpload
              label="Project Images"
              value={form.images || []}
              onChange={(urls) => setForm({ ...form, images: urls })}
              folder="projects"
            />

            <div>
              <label className="text-xs text-muted-foreground">Project Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Slug</label>
              <input
                value={form.slug || ""}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated from name if empty"
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Description</label>
              <textarea
                value={form.description || ""}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm resize-none"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Overview (shown on portfolio detail page)</label>
              <textarea
                value={form.overview || ""}
                onChange={(e) => setForm({ ...form, overview: e.target.value })}
                rows={4}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Client</label>
                <input
                  value={form.client || ""}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Industry</label>
                <input
                  value={form.industry || ""}
                  onChange={(e) => setForm({ ...form, industry: e.target.value })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Status</label>
              <select
                value={form.status || "completed"}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              >
                <option value="completed">Completed</option>
                <option value="active">Active</option>
                <option value="in-progress">In Progress</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Technologies (comma-separated)</label>
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, Node.js, PostgreSQL"
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Key Features (comma-separated)</label>
              <input
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="User dashboard, Admin panel, API integration"
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Outcomes (comma-separated)</label>
              <input
                value={outcomesInput}
                onChange={(e) => setOutcomesInput(e.target.value)}
                placeholder="500+ users onboarded, 40% faster workflows"
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Live URL</label>
                <input
                  value={form.liveUrl || ""}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">GitHub URL</label>
                <input
                  value={form.githubUrl || ""}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="flex items-center gap-2 text-sm min-h-[44px]">
                <input
                  type="checkbox"
                  checked={!!form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="accent-gold"
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm min-h-[44px]">
                <input
                  type="checkbox"
                  checked={form.published !== false}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="accent-gold"
                />
                Published
              </label>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : editing ? "Update Project" : "Create Project"}
            </Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>
              Cancel
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Software Projects & Portfolio" onMenuClick={() => {}}>
        <Button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyItem); setTechInput(""); setFeaturesInput(""); setOutcomesInput(""); }}>
          <Plus size={16} /> Add Project
        </Button>
      </AdminHeader>

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Client</th>
              <th className="p-4">Industry</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-border/50">
                <td className="p-4">
                  {coverImage(item) ? (
                    <div className="relative w-16 h-10 rounded-lg overflow-hidden border border-border">
                      <AppImage src={coverImage(item)} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">No image</span>
                  )}
                </td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 capitalize">{item.status || "—"}</td>
                <td className="p-4">{item.client || "—"}</td>
                <td className="p-4">{item.industry || "—"}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="p-1.5 rounded hover:bg-muted" aria-label="Edit">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded hover:bg-muted text-red-400" aria-label="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && <p className="text-center text-muted-foreground py-12">No software projects yet</p>}
      </GlassCard>
    </div>
  );
}
