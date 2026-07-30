"use client";

import { useState, useEffect } from "react";
import { Bell, Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { AdminHeader } from "./AdminSidebar";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsManager() {
  const [items, setItems] = useState<Notification[]>([]);

  const fetchItems = async () => {
    const res = await fetch("/api/admin/notifications");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchItems(); }, []);

  const markRead = async (id: string) => {
    await fetch("/api/admin/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    fetchItems();
  };

  return (
    <div>
      <AdminHeader title="Notifications" onMenuClick={() => {}} />
      <div className="space-y-3">
        {items.length === 0 && (
          <GlassCard className="text-center py-12 text-muted-foreground">No notifications yet</GlassCard>
        )}
        {items.map((n) => (
          <GlassCard key={n._id} className={`flex items-start gap-4 ${!n.read ? "border-gold/30" : ""}`}>
            <Bell size={20} className={n.read ? "text-muted-foreground" : "text-gold"} />
            <div className="flex-1">
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
              <p className="text-xs text-muted-foreground mt-2 capitalize">{n.type} · {new Date(n.createdAt).toLocaleString()}</p>
            </div>
            {!n.read && (
              <button onClick={() => markRead(n._id)} className="p-2 rounded-lg glass hover:bg-muted" title="Mark as read">
                <Check size={16} />
              </button>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
