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
    <section className="section-padding">
      <div className="max-w-2xl mx-auto text-center px-6">
        <SectionHeading
          title="Stay informed"
          description="Market notes, new listings, and technology insights — delivered sparingly."
        />
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 border border-border overflow-hidden mt-2">
          <input
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 bg-transparent focus:outline-none text-sm"
          />
          <Button type="submit" disabled={status === "loading"} className="rounded-none sm:min-w-[140px]">
            {status === "loading" ? "..." : "Subscribe"}
          </Button>
        </form>
        {status === "success" && <p className="text-gold text-sm mt-4">Thank you for subscribing.</p>}
        {status === "error" && <p className="text-red-400 text-sm mt-4">Something went wrong. Please try again.</p>}
      </div>
    </section>
  );
}
