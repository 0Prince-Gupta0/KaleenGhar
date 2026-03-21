import { useToast } from "@/components/ui/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

import { CheckCircle, XCircle, Info } from "lucide-react";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant, ...props }) => {
        
        const Icon =
          variant === "success"
            ? CheckCircle
            : variant === "destructive"
            ? XCircle
            : Info;

        return (
          <Toast key={id} variant={variant} {...props}>
            
            {/* 🔥 FLEX LAYOUT */}
            <div className="flex items-start gap-3 w-full">

              {/* ICON */}
              <Icon className="h-5 w-5 mt-0.5 shrink-0 opacity-90" />

              {/* CONTENT */}
              <div className="flex flex-col gap-1">
                {title && (
                  <ToastTitle className="text-sm font-semibold">
                    {title}
                  </ToastTitle>
                )}

                {description && (
                  <ToastDescription className="text-xs sm:text-sm opacity-90">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>

            {/* ACTION */}
            {action}

            {/* CLOSE */}
            <ToastClose />
          </Toast>
        );
      })}

      <ToastViewport />
    </ToastProvider>
  );
}