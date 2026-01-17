import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/* ================= ROOT ================= */
const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      `
      relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full
      border border-[#E6DED1]
      bg-[#FFFCF7]
      shadow-sm
      transition-all duration-300
      hover:shadow-md hover:scale-[1.03]
      `,
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

/* ================= IMAGE ================= */
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(
      "aspect-square h-full w-full object-cover",
      className
    )}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

/* ================= FALLBACK ================= */
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      `
      flex h-full w-full items-center justify-center rounded-full
      bg-gradient-to-br from-[#1F2933] to-[#111827]
      text-[#E0C36A]
      font-semibold uppercase tracking-wide
      `,
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
