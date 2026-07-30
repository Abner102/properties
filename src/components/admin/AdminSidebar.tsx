"use client";

import {
  LayoutDashboard, Package, FolderTree, Code2, Briefcase, FileText,
  MessageSquare, MessagesSquare, Users, Star, Image, BarChart3, Bell,
  Mail, Settings, Shield, Database, Search, LogOut, Menu, X, Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ADMIN_SECTIONS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "main" },
  { id: "products", label: "Products", icon: Package, group: "catalog" },
  { id: "categories", label: "Categories", icon: FolderTree, group: "catalog" },
  { id: "projects", label: "Software Projects", icon: Code2, group: "catalog" },
  { id: "portfolio", label: "Portfolio", icon: Briefcase, group: "catalog" },
  { id: "blog", label: "Blog", icon: FileText, group: "content" },
  { id: "testimonials", label: "Testimonials", icon: Star, group: "content" },
  { id: "media", label: "Media Library", icon: Image, group: "content" },
  { id: "inquiries", label: "Inquiries", icon: MessageSquare, group: "crm" },
  { id: "messages", label: "Messages", icon: MessagesSquare, group: "crm" },
  { id: "newsletter", label: "Newsletter", icon: Mail, group: "crm" },
  { id: "team", label: "Team", icon: Users, group: "people" },
  { id: "users", label: "Users", icon: Shield, group: "people" },
  { id: "analytics", label: "Analytics", icon: BarChart3, group: "insights" },
  { id: "notifications", label: "Notifications", icon: Bell, group: "insights" },
  { id: "settings", label: "Settings", icon: Settings, group: "system" },
  { id: "security", label: "Security", icon: Shield, group: "system" },
  { id: "backup", label: "Backup", icon: Database, group: "system" },
] as const;

export type AdminSection = (typeof ADMIN_SECTIONS)[number]["id"];

interface AdminSidebarProps {
  active: AdminSection;
  onChange: (section: AdminSection) => void;
  open: boolean;
  onClose: () => void;
  onLogout: () => void;
  unreadNotifications?: number;
}

const GROUPS = [
  { key: "main", label: "Overview" },
  { key: "catalog", label: "Catalog" },
  { key: "content", label: "Content" },
  { key: "crm", label: "CRM" },
  { key: "people", label: "People" },
  { key: "insights", label: "Insights" },
  { key: "system", label: "System" },
];

export default function AdminSidebar({ active, onChange, open, onClose, onLogout, unreadNotifications = 0 }: AdminSidebarProps) {
  return (
    <>
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-muted border-r border-border flex flex-col transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-5 border-b border-border shrink-0">
          <h1 className="text-lg font-display font-bold">Endless <span className="text-gold">Infinity</span></h1>
          <p className="text-xs text-muted-foreground">Enterprise Admin</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {GROUPS.map((group) => {
            const items = ADMIN_SECTIONS.filter((s) => s.group === group.key);
            if (!items.length) return null;
            return (
              <div key={group.key}>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground px-3 mb-1">{group.label}</p>
                <div className="space-y-0.5">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => { onChange(item.id); onClose(); }}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          active === item.id ? "bg-gold/10 text-gold" : "text-muted-foreground hover:bg-background"
                        )}
                      >
                        <Icon size={16} />
                        <span className="flex-1 text-left">{item.label}</span>
                        {item.id === "notifications" && unreadNotifications > 0 && (
                          <span className="w-5 h-5 rounded-full bg-gold text-background text-[10px] flex items-center justify-center font-bold">
                            {unreadNotifications}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border shrink-0">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onClose} />}
    </>
  );
}

export function AdminHeader({ title, onMenuClick, children }: { title: string; onMenuClick: () => void; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6 gap-4">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg glass"><Menu size={20} /></button>
        <h2 className="text-xl font-display font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
