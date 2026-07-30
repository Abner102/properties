"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { AdminHeader } from "./AdminSidebar";

interface Inquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
  status: string;
  reply?: string;
  createdAt: string;
}

export default function InquiryManager() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState("");

  const fetchItems = async () => {
    const res = await fetch("/api/admin/inquiries");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleReply = async () => {
    if (!selected) return;
    await fetch(`/api/admin/inquiries/${selected._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply, status: "replied" }),
    });
    setSelected(null);
    setReply("");
    fetchItems();
  };

  const handleArchive = async (id: string) => {
    await fetch(`/api/admin/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "closed" }),
    });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete inquiry?")) return;
    await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const exportCSV = () => {
    const rows = items.map((i) =>
      [i.name, i.email, i.type, i.status, i.message.replace(/,/g, ";")].join(",")
    );
    const blob = new Blob([["Name,Email,Type,Status,Message", ...rows].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "inquiries.csv";
    a.click();
  };

  return (
    <div>
      <AdminHeader title="Customer Inquiries" onMenuClick={() => {}}>
        <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
      </AdminHeader>

      <div className="grid lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="p-4">Name</th><th className="p-4">Type</th><th className="p-4">Status</th><th className="p-4">Date</th><th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className={`border-b border-border/50 cursor-pointer hover:bg-muted/30 ${selected?._id === item._id ? "bg-gold/5" : ""}`} onClick={() => setSelected(item)}>
                  <td className="p-4"><p className="font-medium">{item.name}</p><p className="text-xs text-muted-foreground">{item.email}</p></td>
                  <td className="p-4 capitalize">{item.type}</td>
                  <td className="p-4"><span className={`px-2 py-0.5 rounded-full text-xs ${item.status === "new" ? "bg-gold/10 text-gold" : item.status === "replied" ? "bg-green-500/10 text-green-400" : "bg-muted"}`}>{item.status}</span></td>
                  <td className="p-4 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => handleArchive(item._id)} className="p-1.5 rounded hover:bg-muted text-xs">Archive</button>
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded hover:bg-muted text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!items.length && <p className="text-center text-muted-foreground py-12">No inquiries yet</p>}
        </GlassCard>

        <GlassCard>
          {selected ? (
            <>
              <h3 className="font-semibold mb-2">{selected.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{selected.email} · {selected.phone}</p>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{selected.message}</p>
              {selected.reply && <p className="text-sm bg-muted p-3 rounded-lg mb-4"><strong>Reply:</strong> {selected.reply}</p>}
              <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={4} placeholder="Write a reply..." className="w-full px-3 py-2 rounded-lg bg-background border border-border text-sm resize-none mb-3" />
              <Button onClick={handleReply} className="w-full">Send Reply</Button>
            </>
          ) : (
            <p className="text-muted-foreground text-sm text-center py-8">Select an inquiry to view details and reply</p>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
