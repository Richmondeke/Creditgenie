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
            primary: "bg-brand-purple text-white hover:bg-brand-purple-hover",
            secondary: "bg-brand-purple-light/20 text-brand-purple hover:bg-brand-purple-light/30",
            ghost: "bg-transparent text-slate-body hover:bg-slate-50",
            outline: "bg-transparent text-brand-purple border border-slate-100 hover:bg-slate-50 shadow-sm",
        };

        const sizes = {
            sm: "px-4 py-2 text-xs font-normal uppercase tracking-wider",
            md: "px-6 py-2.5 text-sm font-normal",
            lg: "px-8 py-3.5 text-base font-normal",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-[4px] transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
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
