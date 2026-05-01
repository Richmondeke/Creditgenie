import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-body">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-[4px] border border-slate-border bg-white px-4 py-2 text-sm text-navy-deep font-normal placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/20 transition-all shadow-stripe-ambient",
                        icon && "pl-10",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
