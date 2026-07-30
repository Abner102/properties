import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar, { AdminHeader, type AdminSection } from "@/components/admin/AdminSidebar";
import DashboardOverview from "@/components/admin/DashboardOverview";
import ProductManager from "@/components/admin/ProductManager";
import GenericManager from "@/components/admin/GenericManager";
import SoftwareProjectManager from "@/components/admin/SoftwareProjectManager";
import InquiryManager from "@/components/admin/InquiryManager";
import TeamManager from "@/components/admin/TeamManager";
import SettingsManager from "@/components/admin/SettingsManager";
import NotificationsManager from "@/components/admin/NotificationsManager";
import { GlobalSearch } from "@/components/admin/GlobalSearch";
import GlassCard from "@/components/ui/GlassCard";
import { useRealtime } from "@/hooks/useRealtime";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState<AdminSection>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<Record<string, unknown> | null>(null);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats", { credentials: "include" });
      if (res.status === 401) { navigate("/admin/login"); return; }
      const data = await res.json();
      setDashboardData(data);
    } catch { /* */ }
  }, [navigate]);

  useRealtime(fetchDashboard, 30000);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    navigate("/admin/login");
  };

  const sectionTitles: Record<AdminSection, string> = {
    dashboard: "Dashboard", products: "Products", categories: "Categories",
    projects: "Software Projects", portfolio: "Portfolio", blog: "Blog",
    testimonials: "Testimonials", media: "Media Library", inquiries: "Inquiries",
    messages: "Messages", newsletter: "Newsletter", team: "Team", users: "Users",
    analytics: "Analytics", notifications: "Notifications", settings: "Settings",
    security: "Security", backup: "Backup",
  };

  const renderSection = () => {
    switch (active) {
      case "dashboard":
        return <DashboardOverview data={dashboardData} />;
      case "products":
        return <ProductManager />;
      case "blog":
        return (
          <GenericManager
            title="Blog Posts"
            apiEndpoint="/api/admin/blog"
            columns={[
              { key: "title", label: "Title" },
              { key: "category", label: "Category" },
              { key: "author", label: "Author" },
              { key: "published", label: "Published", render: (i) => i.published ? "Yes" : "Draft" },
            ]}
            formFields={[
              { key: "title", label: "Title" },
              { key: "slug", label: "Slug" },
              { key: "excerpt", label: "Excerpt", type: "textarea" },
              { key: "content", label: "Content", type: "textarea" },
              { key: "category", label: "Category" },
              { key: "author", label: "Author" },
              { key: "image", label: "Featured Image URL" },
            ]}
            emptyItem={{ title: "", slug: "", excerpt: "", content: "", category: "real-estate", author: "Admin", published: false }}
          />
        );
      case "team":
        return <TeamManager />;
      case "inquiries":
        return <InquiryManager />;
      case "categories":
        return (
          <GenericManager
            title="Categories"
            apiEndpoint="/api/admin/categories"
            columns={[
              { key: "name", label: "Name" },
              { key: "slug", label: "Slug" },
              { key: "type", label: "Type" },
            ]}
            formFields={[
              { key: "name", label: "Name" },
              { key: "slug", label: "Slug" },
              { key: "type", label: "Type (product/blog)" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
            emptyItem={{ name: "", slug: "", type: "product", description: "", order: 0 }}
          />
        );
      case "projects":
      case "portfolio":
        return <SoftwareProjectManager />;
      case "newsletter":
        return (
          <GenericManager
            title="Newsletter Subscribers"
            apiEndpoint="/api/admin/newsletter"
            columns={[
              { key: "email", label: "Email" },
              { key: "name", label: "Name" },
              { key: "createdAt", label: "Subscribed", render: (i) => new Date(i.createdAt as string).toLocaleDateString() },
            ]}
            formFields={[]}
            emptyItem={{}}
          />
        );
      case "users":
        return (
          <GenericManager
            title="Users"
            apiEndpoint="/api/admin/users"
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "role", label: "Role" },
            ]}
            formFields={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "password", label: "Password" },
              { key: "role", label: "Role" },
            ]}
            emptyItem={{ name: "", email: "", password: "", role: "editor" }}
          />
        );
      case "notifications":
        return <NotificationsManager />;
      case "testimonials":
        return (
          <GenericManager
            title="Testimonials"
            apiEndpoint="/api/admin/testimonials"
            columns={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "rating", label: "Rating" },
            ]}
            formFields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "content", label: "Review", type: "textarea" },
              { key: "rating", label: "Rating (1-5)", type: "number" },
              { key: "image", label: "Photo URL" },
            ]}
            emptyItem={{ name: "", role: "", content: "", rating: 5, published: true }}
          />
        );
      case "settings":
        return <SettingsManager />;
      case "security":
        return (
          <div>
            <AdminHeader title="Security" onMenuClick={() => setSidebarOpen(true)} />
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard>
                <h3 className="font-semibold mb-3">Authentication</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>JWT Access + Refresh Tokens</li>
                  <li>bcrypt Password Hashing</li>
                  <li>Role-Based Permissions (8 roles)</li>
                  <li>Session Management</li>
                  <li>Login History Tracking</li>
                  <li>Failed Login Attempts Logged</li>
                </ul>
              </GlassCard>
              <GlassCard>
                <h3 className="font-semibold mb-3">Roles</h3>
                <div className="flex flex-wrap gap-2">
                  {["Super Admin", "Admin", "Property Manager", "Vehicle Manager", "Content Manager", "Software Manager", "Marketing Manager", "Editor"].map((r) => (
                    <span key={r} className="px-3 py-1 rounded-full glass text-xs">{r}</span>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        );
      case "backup":
        return (
          <div>
            <AdminHeader title="Backup & Restore" onMenuClick={() => setSidebarOpen(true)} />
            <GlassCard>
              <p className="text-muted-foreground mb-4">Database backup and restore for MongoDB Atlas.</p>
              <div className="flex gap-3">
                <button className="px-4 py-2 rounded-lg bg-gold text-background text-sm font-semibold">Backup Database</button>
                <button className="px-4 py-2 rounded-lg glass text-sm">Restore Database</button>
                <button className="px-4 py-2 rounded-lg glass text-sm">Download Backup</button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Automatic daily backups available with MongoDB Atlas M10+ cluster.</p>
            </GlassCard>
          </div>
        );
      case "analytics":
        return <DashboardOverview data={dashboardData} />;
      default:
        return (
          <div>
            <AdminHeader title={sectionTitles[active]} onMenuClick={() => setSidebarOpen(true)} />
            <GlassCard className="text-center py-16">
              <p className="text-muted-foreground">{sectionTitles[active]} module — connect to /api/admin/{active}</p>
              <p className="text-sm text-gold mt-2">Use the Products module for unified property, land, and car management.</p>
            </GlassCard>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <AdminSidebar
        active={active}
        onChange={setActive}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        unreadNotifications={Array.isArray(dashboardData?.notifications) ? dashboardData.notifications.length : 0}
      />

      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <GlobalSearch />
        {renderSection()}
      </main>
    </div>
  );
}
