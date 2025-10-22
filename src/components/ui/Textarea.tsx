import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border-2 border-[rgb(229,233,236)] bg-white px-4 py-3 text-sm transition-all duration-200",
            "placeholder:text-[rgb(148,163,184)]",
            "focus:border-[rgb(45,95,93)] focus:outline-none focus:ring-4 focus:ring-[rgb(45,95,93)]/10",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "resize-y",
            error && "border-[rgb(200,70,48)] focus:border-[rgb(200,70,48)] focus:ring-[rgb(200,70,48)]/10",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs text-[rgb(200,70,48)] animate-fadeIn">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };