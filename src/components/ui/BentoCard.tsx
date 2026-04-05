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
        // Solid, sharp engineering aesthetic
        "bg-card text-card-foreground",
        "border border-border",
        "rounded-xl p-6",
        "flex flex-col relative overflow-hidden group transition-all duration-300",
        !noHover && [
          "hover:bg-zinc-50 dark:hover:bg-zinc-800",
          "hover:border-zinc-300 dark:hover:border-zinc-700",
          "hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
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
