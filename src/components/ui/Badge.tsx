import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "px-3 py-1 rounded-full",
        "bg-zinc-100 dark:bg-zinc-800/50",
        "border border-zinc-200 dark:border-zinc-700",
        "text-xs font-medium text-zinc-600 dark:text-zinc-300",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export { Badge };
