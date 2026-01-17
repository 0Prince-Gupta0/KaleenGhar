import * as React from "react";
import { cn } from "@/lib/utils";

/* ================= ROOT ================= */
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `
      rounded-2xl
      border border-[#E6DED1]
      bg-[#FFFCF7]
      text-[#1F2933]
      shadow-sm
      transition-all duration-300
      hover:shadow-lg
      `,
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/* ================= HEADER ================= */
const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-2 p-6",
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ================= TITLE ================= */
const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      `
      text-xl font-semibold
      tracking-tight
      text-[#1F2933]
      `,
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ================= DESCRIPTION ================= */
const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm leading-relaxed text-[#6B7280]",
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ================= CONTENT ================= */
const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ================= FOOTER ================= */
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
