import { useState, useEffect, useCallback } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import AppImage from "@/components/ui/AppImage";
import ImageUpload from "@/components/admin/ImageUpload";
import { AdminHeader } from "./AdminSidebar";

interface TeamItem {
  _id: string;
  name: string;
  position?: string;
  bio?: string;
  email?: string;
  phone?: string;
  image?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  isFounder?: boolean;
  order?: number;
  published?: boolean;
}

const emptyItem: Omit<TeamItem, "_id"> = {
  name: "",
  position: "",
  bio: "",
  email: "endlessinfinity16@gmail.com",
  phone: "",
  image: "",
  linkedin: "",
  github: "",
  instagram: "",
  isFounder: false,
  order: 0,
  published: true,
};

export default function TeamManager() {
  const [items, setItems] = useState<TeamItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<TeamItem | null>(null);
  const [form, setForm] = useState<Omit<TeamItem, "_id">>(emptyItem);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/team", { credentials: "include" });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setItems([]);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/team/${editing._id}` : "/api/admin/team";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Save failed");
      setShowForm(false);
      setEditing(null);
      setForm(emptyItem);
      fetchItems();
    } catch {
      alert("Could not save team member. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE", credentials: "include" });
    fetchItems();
  };

  const openEdit = (item: TeamItem) => {
    setEditing(item);
    setForm({
      name: item.name || "",
      position: item.position || "",
      bio: item.bio || "",
      email: item.email || "",
      phone: item.phone || "",
      image: item.image || "",
      linkedin: item.linkedin || "",
      github: item.github || "",
      instagram: item.instagram || "",
      isFounder: !!item.isFounder,
      order: item.order ?? 0,
      published: item.published !== false,
    });
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div>
        <AdminHeader title={editing ? "Edit Team Member" : "Add Team Member"} onMenuClick={() => {}} />
        <GlassCard className="max-w-2xl">
          <div className="space-y-4">
            <ImageUpload
              label="Profile Photo"
              value={form.image}
              onChange={(url) => setForm({ ...form, image: url })}
            />

            <div>
              <label className="text-xs text-muted-foreground">Full Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Role / Position</label>
              <input
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                placeholder="Co-Founder, Developer, etc."
              />
            </div>

            <div>
              <label className="text-xs text-muted-foreground">Biography</label>
              <textarea
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                rows={4}
                className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm resize-none"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">LinkedIn URL</label>
                <input
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">GitHub URL</label>
                <input
                  value={form.github}
                  onChange={(e) => setForm({ ...form, github: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Instagram URL</label>
                <input
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-muted-foreground">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className="w-full mt-1 px-3 py-3 rounded-lg bg-background border border-border text-sm min-h-[44px]"
                />
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <label className="flex items-center gap-2 text-sm min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={!!form.isFounder}
                    onChange={(e) => setForm({ ...form, isFounder: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Co-Founder
                </label>
                <label className="flex items-center gap-2 text-sm min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={!!form.published}
                    onChange={(e) => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Published on website
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button onClick={handleSave} disabled={saving || !form.name.trim()} className="min-h-[44px]">
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              className="min-h-[44px]"
              onClick={() => {
                setShowForm(false);
                setEditing(null);
                setForm(emptyItem);
              }}
            >
              Cancel
            </Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Team Members" onMenuClick={() => {}}>
        <Button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(emptyItem);
          }}
          className="min-h-[44px]"
        >
          <Plus size={16} /> Add Member
        </Button>
      </AdminHeader>

      <div className="grid gap-4 md:hidden">
        {items.map((item) => (
          <GlassCard key={item._id} className="p-4">
            <div className="flex gap-4">
              {item.image ? (
                <div className="relative w-16 h-20 rounded-lg overflow-hidden shrink-0">
                  <AppImage src={item.image} alt={item.name} fill className="object-cover" />
                </div>
              ) : null}
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{item.name}</p>
                <p className="text-sm text-gold truncate">{item.position}</p>
                {item.isFounder && <span className="text-xs text-muted-foreground">Co-Founder</span>}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" onClick={() => openEdit(item)} className="flex-1 min-h-[44px]">
                <Edit size={14} /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(item._id)} className="min-h-[44px] text-red-400">
                <Trash2 size={14} />
              </Button>
            </div>
          </GlassCard>
        ))}
        {!items.length && <p className="text-center text-muted-foreground py-12">No team members yet. Add founders and staff with photos.</p>}
      </div>

      <GlassCard className="overflow-x-auto p-0 hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="p-4">Photo</th>
              <th className="p-4">Name</th>
              <th className="p-4">Position</th>
              <th className="p-4">Founder</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-border/50">
                <td className="p-4">
                  {item.image ? (
                    <div className="relative w-10 h-12 rounded overflow-hidden">
                      <AppImage src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.position}</td>
                <td className="p-4">{item.isFounder ? "Yes" : "No"}</td>
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(item)} className="p-2 rounded hover:bg-muted min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <Edit size={14} />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 rounded hover:bg-muted text-red-400 min-w-[44px] min-h-[44px] flex items-center justify-center">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && <p className="text-center text-muted-foreground py-12">No team members yet</p>}
      </GlassCard>
    </div>
  );
}
