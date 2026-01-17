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
        "fixed top-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  )
);
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

/* ================= VARIANTS ================= */
const toastVariants = cva(
  "relative flex w-full items-center justify-between rounded-md border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success:
          "border-green-800 bg-green-800 text-white",
        destructive:
          "border-red-800 bg-red-800 text-white",
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
      className={cn("text-sm font-semibold", className)}
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
      className={cn("text-sm opacity-90", className)}
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
        "absolute right-3 top-3 rounded-md text-white/70 hover:text-white focus:outline-none",
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
