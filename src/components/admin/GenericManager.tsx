"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { AdminHeader } from "./AdminSidebar";

interface GenericItem {
  _id: string;
  [key: string]: unknown;
}

interface Column {
  key: string;
  label: string;
  render?: (item: GenericItem) => React.ReactNode;
}

interface GenericManagerProps {
  title: string;
  apiEndpoint: string;
  columns: Column[];
  formFields: { key: string; label: string; type?: string }[];
  emptyItem: Record<string, unknown>;
}

export default function GenericManager({ title, apiEndpoint, columns, formFields, emptyItem }: GenericManagerProps) {
  const [items, setItems] = useState<GenericItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<GenericItem | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(emptyItem);

  const fetchItems = async () => {
    try {
      const res = await fetch(apiEndpoint);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : data.items || data.posts || []);
    } catch {
      setItems([]);
    }
  };

  useEffect(() => { fetchItems(); }, [apiEndpoint]);

  const handleSave = async () => {
    const url = editing ? `${apiEndpoint}/${editing._id}` : apiEndpoint;
    await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowForm(false);
    setEditing(null);
    setForm(emptyItem);
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`${apiEndpoint}/${id}`, { method: "DELETE" });
    fetchItems();
  };

  if (showForm) {
    return (
      <div>
        <AdminHeader title={editing ? `Edit ${title}` : `Add ${title}`} onMenuClick={() => {}} />
        <GlassCard className="max-w-2xl">
          <div className="space-y-4">
            {formFields.map((f) => (
              <div key={f.key}>
                <label className="text-xs text-muted-foreground">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea value={(form[f.key] as string) || ""} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm resize-none" />
                ) : (
                  <input type={f.type || "text"} value={(form[f.key] as string | number) ?? ""} onChange={(e) => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })} className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm" />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>Cancel</Button>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title={title} onMenuClick={() => {}}>
        <Button onClick={() => { setShowForm(true); setEditing(null); setForm(emptyItem); }}><Plus size={16} /> Add</Button>
      </AdminHeader>
      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              {columns.map((c) => <th key={c.key} className="p-4">{c.label}</th>)}
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id} className="border-b border-border/50">
                {columns.map((c) => (
                  <td key={c.key} className="p-4">
                    {c.render ? c.render(item) : String(item[c.key] ?? "")}
                  </td>
                ))}
                <td className="p-4">
                  <div className="flex gap-1">
                    <button onClick={() => { setEditing(item); setForm(item); setShowForm(true); }} className="p-1.5 rounded hover:bg-muted"><Edit size={14} /></button>
                    <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded hover:bg-muted text-red-400"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && <p className="text-center text-muted-foreground py-12">No items yet</p>}
      </GlassCard>
    </div>
  );
}
