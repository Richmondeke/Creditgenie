import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "success" | "warning" | "error" | "neutral" | "info";
}

const Badge = ({ className, variant = "neutral", ...props }: BadgeProps) => {
    const variants = {
        success: "bg-success-green/10 text-success-text border-success-green/20",
        warning: "bg-amber-100 text-amber-700 border-amber-200",
        error: "bg-red-100 text-red-700 border-red-200",
        neutral: "bg-slate-100 text-slate-body border-slate-border",
        info: "bg-brand-purple/10 text-brand-purple border-brand-purple-light/20",
    };

    return (
        <div
            className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
                variants[variant],
                className
            )}
            {...props}
        />
    );
};

export { Badge };
