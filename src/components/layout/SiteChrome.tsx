import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
