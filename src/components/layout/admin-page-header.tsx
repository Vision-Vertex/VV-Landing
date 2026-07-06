import * as React from "react";
import { SectionTag } from "@/components/ui/section-tag";

interface AdminPageHeaderProps {
  tag: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

function AdminPageHeader({
  tag,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-2">
        <SectionTag className="mb-0">{tag}</SectionTag>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500 max-w-2xl">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export { AdminPageHeader };
