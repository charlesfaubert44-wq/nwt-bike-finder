import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showPercentage?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showPercentage = false, variant = "default", ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    
    const variantClasses = {
      default: "bg-gradient-to-r from-[rgb(45,95,93)] to-[rgb(61,125,123)]",
      success: "bg-gradient-to-r from-[rgb(61,124,71)] to-[rgb(81,144,91)]",
      warning: "bg-gradient-to-r from-[rgb(232,180,79)] to-[rgb(212,160,59)]",
      danger: "bg-gradient-to-r from-[rgb(200,70,48)] to-[rgb(180,50,28)]",
    };

    return (
      <div
        ref={ref}
        className={cn("relative w-full", className)}
        {...props}
      >
        <div className="h-3 w-full overflow-hidden rounded-full bg-[rgb(229,233,236)]">
          <div
            className={cn(
              "h-full transition-all duration-500 ease-out rounded-full",
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showPercentage && (
          <span className="mt-1 block text-right text-xs font-medium text-[rgb(107,114,128)]">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };