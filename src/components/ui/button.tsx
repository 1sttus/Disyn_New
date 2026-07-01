import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[color:var(--accent-primary)] text-[color:var(--text-on-accent)] shadow-sm hover:opacity-90",
        secondary: "border-[color:var(--border-soft)] bg-[color:var(--surface-soft)] text-[color:var(--text-primary)] hover:bg-[color:var(--surface-hover)]",
        ghost: "border-transparent bg-transparent text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-soft)]",
        outline: "border-[color:var(--border-soft)] bg-transparent text-[color:var(--text-primary)] hover:bg-[color:var(--surface-soft)]",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-5 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />;
}
