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
                        "flex h-10 w-full rounded-stripe border border-slate-border bg-white px-3 py-2 text-sm text-navy-deep ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/20 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
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
