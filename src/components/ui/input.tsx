import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-11 w-full rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--text-primary)] shadow-sm outline-none transition focus:border-[color:var(--accent-primary)] focus:ring-2 focus:ring-[color:var(--accent-primary)]/20 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
