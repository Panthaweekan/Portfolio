import * as React from "react";
import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  noHover?: boolean;
}

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({ className, noHover = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // Use CSS variables for theme support
        "bg-white/50 dark:bg-zinc-900/50",
        "border border-zinc-200/50 dark:border-zinc-800/50",
        "backdrop-blur-sm rounded-3xl p-6",
        "flex flex-col relative overflow-hidden group transition-all duration-300",
        !noHover && [
          "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
          "hover:border-zinc-300 dark:hover:border-zinc-700",
          "hover:shadow-2xl hover:shadow-indigo-500/10"
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
BentoCard.displayName = "BentoCard";

export { BentoCard };
