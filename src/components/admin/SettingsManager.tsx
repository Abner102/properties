"use client";

import { useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";
import { AdminHeader } from "./AdminSidebar";
import { siteConfig } from "@/data/site";

interface SettingsData {
  companyName?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  tagline?: string;
}

export default function SettingsManager() {
  const [form, setForm] = useState<SettingsData>({
    companyName: siteConfig.name,
    phone: siteConfig.phone,
    whatsapp: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address,
    tagline: siteConfig.tagline,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data) setForm((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
  };

  const fields: { key: keyof SettingsData; label: string }[] = [
    { key: "companyName", label: "Company Name" },
    { key: "tagline", label: "Tagline" },
    { key: "phone", label: "Phone" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
  ];

  return (
    <div>
      <AdminHeader title="Company Settings" onMenuClick={() => {}} />
      <GlassCard>
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground">{f.label}</label>
              <input
                value={form[f.key] || ""}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-background border border-border text-sm"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-6">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
          {saved && <span className="text-sm text-green-500">Settings saved to MongoDB</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Settings are applied site-wide. Configure Cloudinary, SMTP, and analytics in environment variables.
        </p>
      </GlassCard>
    </div>
  );
}
