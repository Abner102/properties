import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import TeamPage from "@/pages/TeamPage";
import PropertiesPage from "@/pages/PropertiesPage";
import PropertyDetailPage from "@/pages/PropertyDetailPage";
import LandPage from "@/pages/LandPage";
import CarsPage from "@/pages/CarsPage";
import CarDetailPage from "@/pages/CarDetailPage";
import SoftwarePage from "@/pages/SoftwarePage";
import PortfolioPage from "@/pages/PortfolioPage";
import PortfolioDetailPage from "@/pages/PortfolioDetailPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CareersPage from "@/pages/CareersPage";
import ContactPage from "@/pages/ContactPage";
import ContentCreationPage from "@/pages/ContentCreationPage";
import NotFoundPage from "@/pages/NotFoundPage";
import AdminPage from "@/pages/admin/AdminPage";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import { useAdminSession } from "@/hooks/useAdminSession";

function ProtectedAdminRoute() {
  const location = useLocation();
  const status = useAdminSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (status === "guest") {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return <Outlet />;
}

function AdminGuestRoute() {
  const status = useAdminSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 text-muted-foreground">
        Checking session...
      </div>
    );
  }

  if (status === "authed") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}

function PublicLayout() {
  return (
    <SiteChrome>
      <Outlet />
    </SiteChrome>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<AdminGuestRoute />}>
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/founders" element={<Navigate to="/team" replace />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
          <Route path="/land" element={<LandPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/software" element={<SoftwarePage />} />
          <Route path="/services" element={<Navigate to="/software" replace />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/content-creation" element={<ContentCreationPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}
