import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        `
        relative overflow-hidden
        rounded-lg
        bg-[#EFE9DD]

        before:absolute
        before:inset-0
        before:-translate-x-full
        before:bg-gradient-to-r
        before:from-transparent
        before:via-white/40
        before:to-transparent
        before:animate-[shimmer_1.6s_infinite]

        `,
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
