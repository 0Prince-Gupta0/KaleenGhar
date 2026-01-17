import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  `
    inline-flex items-center
    rounded-full
    border
    px-3 py-1
    text-xs font-medium
    tracking-wide
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
  `,
  {
    variants: {
      variant: {
        default: `
          bg-[#1F2933]
          text-[#E0C36A]
          border-[#1F2933]
        `,
        secondary: `
          bg-[#FFFCF7]
          text-[#1F2933]
          border-[#E6DED1]
        `,
        destructive: `
          bg-[#7F1D1D]
          text-white
          border-[#7F1D1D]
        `,
        outline: `
          bg-transparent
          text-[#1F2933]
          border-[#E6DED1]
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
