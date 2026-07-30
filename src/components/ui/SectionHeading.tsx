"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center mx-auto max-w-3xl",
        className
      )}
    >
      {subtitle && (
        <p className="text-gold text-[11px] font-semibold tracking-[0.22em] uppercase mb-4">
          {subtitle}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
