import * as React from "react";

export function Progress({ value = 0, className = "" }: { value?: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-[color:var(--surface-soft)] ${className}`}>
      <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--accent-primary),var(--accent-secondary))] transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
