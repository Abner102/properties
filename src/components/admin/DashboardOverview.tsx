"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { Package, Users, MessageSquare, Eye, TrendingUp, DollarSign } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { formatPrice } from "@/lib/utils";

interface DashboardData {
  totals: Record<string, number>;
  monthlyVisitors: { month: string; visitors: number; views: number }[];
  topProperties: { name: string; views: number; category: string; price: number }[];
  inquiryAnalytics: { type: string; count: number }[];
  recentProducts: { name: string; category: string; status: string; price: number; createdAt: string }[];
  recentActivity: { name: string; type: string; status: string; createdAt: string }[];
}

const COLORS = ["#D4AF37", "#E8C547", "#B8962E", "#FFFFFF80", "#666666"];

export default function DashboardOverview({ data }: { data: Record<string, unknown> | null }) {
  const t = (data?.totals || {}) as Record<string, number>;

  const statCards = [
    { label: "Total Products", value: t.products || 0, icon: Package, color: "text-gold" },
    { label: "Properties", value: (t.houses || 0) + (t.apartments || 0) + (t.commercial || 0), icon: Package },
    { label: "Lands", value: t.lands || 0, icon: Package },
    { label: "Cars", value: t.cars || 0, icon: Package },
    { label: "Software Projects", value: t.projects || 0, icon: TrendingUp },
    { label: "Blog Posts", value: t.blogs || 0, icon: Package },
    { label: "Team Members", value: t.team || 0, icon: Users },
    { label: "Users", value: t.users || 0, icon: Users },
    { label: "Inquiries", value: t.inquiries || 0, icon: MessageSquare },
    { label: "New Messages", value: t.messages || 0, icon: MessageSquare },
    { label: "Visitors", value: t.visitors || 0, icon: Eye },
    { label: "Revenue", value: formatPrice(t.revenue || 0), icon: DollarSign, isPrice: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <GlassCard key={s.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} className="text-gold" />
              </div>
              <p className="text-2xl font-bold">{s.isPrice ? s.value : s.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </GlassCard>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold mb-4">Monthly Visitors</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={(data?.monthlyVisitors as DashboardData["monthlyVisitors"]) || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333" }} />
              <Line type="monotone" dataKey="visitors" stroke="#D4AF37" strokeWidth={2} />
              <Line type="monotone" dataKey="views" stroke="#888" strokeWidth={1} strokeDasharray="4 4" />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-4">Inquiry Analytics</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={(data?.inquiryAnalytics as DashboardData["inquiryAnalytics"]) || []} dataKey="count" nameKey="type" cx="50%" cy="50%" outerRadius={80}>
                {((data?.inquiryAnalytics as DashboardData["inquiryAnalytics"]) || []).map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333" }} />
            </PieChart>
          </ResponsiveContainer>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold mb-4">Most Viewed Products</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={(data?.topProperties as DashboardData["topProperties"]) || []} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis type="number" stroke="#888" fontSize={12} />
              <YAxis type="category" dataKey="name" stroke="#888" fontSize={10} width={100} />
              <Tooltip contentStyle={{ background: "#1A1A1A", border: "1px solid #333" }} />
              <Bar dataKey="views" fill="#D4AF37" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {["Add Product", "Add Blog Post", "Add Team Member", "View Inquiries", "Upload Media", "Export Data"].map((a) => (
              <button key={a} className="px-4 py-3 rounded-xl glass text-sm hover:bg-gold/10 hover:text-gold transition-colors text-left">{a}</button>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-semibold mb-4">Recently Added Products</h3>
          <div className="space-y-3">
            {((data?.recentProducts as DashboardData["recentProducts"]) || []).map((p, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{p.category} · {p.status}</p>
                </div>
                <span className="text-gold text-xs">{formatPrice(p.price || 0)}</span>
              </div>
            ))}
            {!((data?.recentProducts as DashboardData["recentProducts"]) || []).length && <p className="text-muted-foreground text-sm">No products yet</p>}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {((data?.recentActivity as DashboardData["recentActivity"]) || []).map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0 text-sm">
                <div>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{a.type}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${a.status === "new" ? "bg-gold/10 text-gold" : "bg-muted text-muted-foreground"}`}>{a.status}</span>
              </div>
            ))}
            {!((data?.recentActivity as DashboardData["recentActivity"]) || []).length && <p className="text-muted-foreground text-sm">No recent activity</p>}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
