import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base = "inline-flex items-center justify-center rounded-md text-sm font-medium px-4 py-2";
    const style =
      variant === "outline"
        ? "border border-neutral-300 bg-white hover:bg-neutral-100"
        : "bg-neutral-900 text-white hover:bg-neutral-800";
    return <button ref={ref} className={cn(base, style, className)} {...props} />;
  }
);
Button.displayName = "Button";
