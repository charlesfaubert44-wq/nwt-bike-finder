import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-[rgb(45,95,93)] text-white shadow-sm hover:shadow-md",
        secondary:
          "bg-[rgb(74,144,164)] text-white shadow-sm hover:shadow-md",
        accent:
          "bg-[rgb(232,180,79)] text-[rgb(44,62,80)] shadow-sm hover:shadow-md",
        success:
          "bg-[rgb(61,124,71)] text-white shadow-sm hover:shadow-md",
        danger:
          "bg-[rgb(200,70,48)] text-white shadow-sm hover:shadow-md",
        outline:
          "border-2 border-[rgb(45,95,93)] text-[rgb(45,95,93)] bg-white",
        ghost:
          "bg-[rgb(229,233,236)] text-[rgb(44,62,80)]",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };