import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechIconProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  label: string;
  highlight?: boolean;
  subtitle?: string;
}

const TechIcon = React.forwardRef<HTMLDivElement, TechIconProps>(
  ({ className, icon: Icon, label, highlight, subtitle, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center gap-1.5 group/icon", className)} {...props}>
      <div className={cn(
        "p-2.5 rounded-xl border transition-all duration-300",
        highlight 
          ? "bg-indigo-500/10 border-indigo-500/30 text-indigo-500 dark:text-indigo-400" 
          : "bg-zinc-100 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400",
        "group-hover/icon:text-indigo-500 dark:group-hover/icon:text-indigo-400 group-hover/icon:bg-indigo-500/10 group-hover/icon:border-indigo-500/20"
      )}>
        <Icon size={18} />
      </div>
      <div className="text-center">
        <span className={cn(
          "text-[9px] uppercase tracking-wider font-semibold transition-colors block",
          highlight 
            ? "text-indigo-500 dark:text-indigo-400" 
            : "text-zinc-500 dark:text-zinc-500 group-hover/icon:text-zinc-700 dark:group-hover/icon:text-zinc-300"
        )}>
          {label}
        </span>
        {subtitle && (
          <span className="text-[8px] text-zinc-400 dark:text-zinc-600 italic">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  )
);
TechIcon.displayName = "TechIcon";

export { TechIcon };
