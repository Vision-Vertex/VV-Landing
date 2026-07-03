import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Highlighted word/phrase rendered in accent color (no gradient) */
  accent?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  /** Accent color: primary (navy) or secondary (orange) */
  accentColor?: "primary" | "secondary";
}

/**
 * Clean section heading — solid accent color, no gradient text.
 */
function SectionTitle({
  children,
  accent,
  as: Tag = "h2",
  accentColor = "secondary",
  className,
  ...props
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight",
        className
      )}
      {...props}
    >
      {children}
      {accent != null && accent !== "" && (
        <>
          {" "}
          <span
            className={cn(
              accentColor === "secondary" ? "text-secondary" : "text-primary"
            )}
          >
            {accent}
          </span>
        </>
      )}
    </Tag>
  );
}

export { SectionTitle };
