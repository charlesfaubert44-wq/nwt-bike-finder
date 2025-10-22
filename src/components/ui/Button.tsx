import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: 
          "bg-gradient-to-br from-[rgb(45,95,93)] to-[rgb(61,125,123)] text-white shadow-md hover:shadow-lg hover:shadow-[rgb(45,95,93)]/30 hover:-translate-y-0.5",
        destructive: 
          "bg-gradient-to-br from-[rgb(200,70,48)] to-[rgb(180,50,28)] text-white shadow-md hover:shadow-lg hover:shadow-[rgb(200,70,48)]/30 hover:-translate-y-0.5",
        outline: 
          "border-2 border-[rgb(45,95,93)] text-[rgb(45,95,93)] bg-white hover:bg-[rgb(45,95,93)] hover:text-white shadow-sm hover:shadow-md",
        secondary: 
          "bg-gradient-to-br from-[rgb(74,144,164)] to-[rgb(106,176,196)] text-white shadow-md hover:shadow-lg hover:shadow-[rgb(74,144,164)]/30 hover:-translate-y-0.5",
        accent:
          "bg-gradient-to-br from-[rgb(232,180,79)] to-[rgb(212,160,59)] text-[rgb(44,62,80)] shadow-md hover:shadow-lg hover:shadow-[rgb(232,180,79)]/30 hover:-translate-y-0.5",
        ghost: 
          "text-[rgb(44,62,80)] hover:bg-[rgb(229,233,236)] hover:text-[rgb(45,95,93)]",
        link: 
          "text-[rgb(45,95,93)] underline-offset-4 hover:underline hover:text-[rgb(61,125,123)]",
        glass:
          "bg-white/70 backdrop-blur-md border border-white/30 text-[rgb(44,62,80)] hover:bg-white/90 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-11 px-6 py-2 rounded-lg text-sm",
        sm: "h-9 px-4 rounded-md text-xs",
        lg: "h-12 px-8 rounded-xl text-base",
        xl: "h-14 px-10 rounded-xl text-lg",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

