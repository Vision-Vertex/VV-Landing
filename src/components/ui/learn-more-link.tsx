import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface LearnMoreLinkProps extends React.ComponentProps<typeof Link> {
  label?: string;
}

/**
 * Minimal text link CTA with arrow — used on service cards instead of buttons.
 */
function LearnMoreLink({
  label = "Learn More",
  className,
  children,
  ...props
}: LearnMoreLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-secondary no-underline",
        "transition-all duration-300 hover:gap-3 hover:text-secondary/80 hover:underline",
        className
      )}
      {...props}
    >
      {children ?? label}
      <ArrowRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden
      />
    </Link>
  );
}

export { LearnMoreLink };
