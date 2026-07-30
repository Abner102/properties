import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/site";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20Firminfinity,%20I%20would%20like%20to%20inquire%20about%20your%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
}
