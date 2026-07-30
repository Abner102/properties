"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const variants = {
  primary: "bg-gold text-background hover:bg-gold-light font-semibold",
  secondary: "bg-foreground/5 text-foreground border border-border hover:bg-foreground/10",
  outline: "border border-gold/70 text-gold hover:bg-gold hover:text-background",
  ghost: "text-foreground hover:text-gold",
};

const sizes = {
  sm: "px-4 py-2 text-xs tracking-wide uppercase",
  md: "px-6 py-3 text-sm tracking-wide uppercase",
  lg: "px-8 py-3.5 text-sm tracking-wide uppercase",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -1 }}
        whileTap={{ y: 0 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer font-semibold",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export default Button;
