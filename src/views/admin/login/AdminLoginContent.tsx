import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { refreshAdminSession } from "@/hooks/useAdminSession";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";

export default function AdminLoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      const authed = await refreshAdminSession();
      if (!authed) {
        setError("Signed in, but session was not saved. Restart the dev server and try again.");
        return;
      }

      window.location.href = "/admin";
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-muted/30 relative">
      <Link
        to="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors text-sm"
      >
        <ArrowLeft size={16} />
        Back to site
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold">
            Endless <span className="text-gold">Infinity</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Admin Dashboard</p>
        </div>

        <GlassCard>
          <h2 className="font-display text-xl font-bold mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50"
                placeholder="endlessinfinity16@gmail.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:border-gold/50"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            <a href="#" className="hover:text-gold transition-colors">Forgot Password?</a>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
}
