import * as React from "react";

export function Badge({ className = "", children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={`inline-flex items-center rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] px-2.5 py-1 text-xs font-medium text-[color:var(--text-secondary)] ${className}`} {...props}>
      {children}
    </span>
  );
}
