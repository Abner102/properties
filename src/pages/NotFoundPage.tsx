import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center">
        <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">404</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    </section>
  );
}
