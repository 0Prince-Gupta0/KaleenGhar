import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        `
        flex h-11 w-full
        rounded-lg
        border border-[#E6DED1]
        bg-[#FFFCF7]
        px-4 py-2
        text-sm text-[#1F2933]

        placeholder:text-[#9CA3AF]

        transition-all duration-200 ease-in-out

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#C9A24D]/40
        focus-visible:border-[#C9A24D]

        hover:border-[#C9A24D]/70

        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
