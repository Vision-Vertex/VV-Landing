import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionTagProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  /** Use on dark/colored backgrounds */
  variant?: "default" | "light";
}

/**
 * Modern section label — small caps, letter-spacing, subtle decorative lines.
 * Replaces the old gradient pill badges.
 */
function SectionTag({
  children,
  icon,
  variant = "default",
  className,
  ...props
}: SectionTagProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 mb-6",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "h-px w-8 shrink-0",
          variant === "light" ? "bg-white/50" : "bg-secondary"
        )}
        aria-hidden
      />
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]",
          variant === "light" ? "text-white/90" : "text-primary"
        )}
      >
        {icon}
        {children}
      </span>
      <span
        className={cn(
          "h-px w-8 shrink-0",
          variant === "light" ? "bg-white/50" : "bg-secondary"
        )}
        aria-hidden
      />
    </div>
  );
}

export { SectionTag };
