import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ================= PROVIDER ================= */
const ToastProvider = ToastPrimitives.Provider;

/* ================= VIEWPORT ================= */
const ToastViewport = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
      ref={ref}
      className={cn(
        `
          fixed z-50 flex flex-col gap-3 p-4

  /* MOBILE FIX */
  bottom-4 left-0 right-0 px-4

  /* DESKTOP */
  sm:left-auto sm:right-4 sm:max-w-[380px]
      `,
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/* ================= VARIANTS ================= */
const toastVariants = cva(
  `
  relative flex w-full items-start justify-between gap-3

  rounded-xl border px-4 py-3

  shadow-[0_12px_30px_rgba(0,0,0,0.12)]
  backdrop-blur-md

  transition-all duration-300
  data-[state=open]:animate-in
  data-[state=closed]:animate-out
  data-[state=open]:slide-in-from-right-full
  `,
  {
    variants: {
      variant: {
        default:
          "bg-white text-[#1F2933] border-[#E6DED1]",

        success:
          "bg-[#1F5132] text-white border-[#1F5132]",

        destructive:
          "bg-[#7F1D1D] text-white border-[#7F1D1D]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/* ================= ROOT ================= */
const Toast = React.forwardRef(
  ({ className, variant, ...props }, ref) => (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
);
Toast.displayName = ToastPrimitives.Root.displayName;

/* ================= TITLE ================= */
const ToastTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Title
      ref={ref}
      className={cn(
        "text-sm font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
ToastTitle.displayName = ToastPrimitives.Title.displayName;

/* ================= DESCRIPTION ================= */
const ToastDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Description
      ref={ref}
      className={cn(
        "text-xs sm:text-sm opacity-90 leading-relaxed",
        className
      )}
      {...props}
    />
  )
);
ToastDescription.displayName =
  ToastPrimitives.Description.displayName;

/* ================= CLOSE ================= */
const ToastClose = React.forwardRef(
  ({ className, ...props }, ref) => (
    <ToastPrimitives.Close
      ref={ref}
      className={cn(
        `
        absolute right-3 top-3

        text-white/70 hover:text-white

        rounded-md
        transition-colors

        focus:outline-none
      `,
        className
      )}
      {...props}
    >
      ✕
    </ToastPrimitives.Close>
  )
);
ToastClose.displayName = ToastPrimitives.Close.displayName;

/* ================= EXPORTS ================= */
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};