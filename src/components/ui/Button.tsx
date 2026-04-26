import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        const variants = {
            primary: "bg-brand-purple text-white hover:bg-brand-purple-hover stripe-shadow",
            secondary: "bg-brand-purple-light/20 text-brand-purple hover:bg-brand-purple-light/30",
            ghost: "bg-transparent text-slate-body hover:bg-slate-border/50",
            outline: "bg-transparent text-brand-purple border border-brand-purple-light hover:bg-brand-purple/5",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-xs font-medium",
            md: "px-4 py-2 text-sm font-medium",
            lg: "px-6 py-3 text-base font-medium",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-stripe transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
