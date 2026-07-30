"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-3xl mx-auto text-center px-6">
        <SectionHeading title="Stay Updated" description="Get the latest on properties, tech insights, and investment opportunities." />
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-6">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full bg-background border border-border focus:outline-none focus:border-gold/50"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        {status === "success" && <p className="text-gold text-sm mt-3">Thank you for subscribing!</p>}
        {status === "error" && <p className="text-red-400 text-sm mt-3">Something went wrong. Please try again.</p>}
      </div>
    </section>
  );
}
