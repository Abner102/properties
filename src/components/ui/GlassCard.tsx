"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className, hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={cn("glass rounded-2xl p-6", className)}
    >
      {children}
    </motion.div>
  );
}
