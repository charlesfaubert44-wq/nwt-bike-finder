import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgb(107,114,128)]">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-11 w-full rounded-lg border-2 border-[rgb(229,233,236)] bg-white px-4 py-2 text-sm transition-all duration-200",
              "placeholder:text-[rgb(148,163,184)]",
              "focus:border-[rgb(45,95,93)] focus:outline-none focus:ring-4 focus:ring-[rgb(45,95,93)]/10",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              error && "border-[rgb(200,70,48)] focus:border-[rgb(200,70,48)] focus:ring-[rgb(200,70,48)]/10",
              icon && "pl-10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-[rgb(200,70,48)] animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };

