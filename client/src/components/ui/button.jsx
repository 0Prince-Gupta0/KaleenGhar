import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
    inline-flex items-center justify-center whitespace-nowrap
    rounded-full
    text-sm font-medium
    ring-offset-background
    transition-all duration-300
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          bg-[#C9A24D]
          text-black
          shadow-sm
          hover:bg-[#B08B3C]
          hover:shadow-md
        `,
        destructive: `
          bg-[#7F1D1D]
          text-white
          hover:bg-[#991B1B]
        `,
        outline: `
          border border-[#E6DED1]
          bg-[#FFFCF7]
          text-[#1F2933]
          hover:bg-[#F5EFE6]
        `,
        secondary: `
          bg-[#1F2933]
          text-[#E0C36A]
          hover:bg-[#111827]
        `,
        ghost: `
          bg-transparent
          text-[#1F2933]
          hover:bg-[#F5EFE6]
        `,
        link: `
          text-[#C9A24D]
          underline-offset-4
          hover:underline
        `,
      },
      size: {
        default: "h-10 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
