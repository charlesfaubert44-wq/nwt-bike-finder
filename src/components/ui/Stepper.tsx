import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                  index < currentStep
                    ? "border-[rgb(45,95,93)] bg-[rgb(45,95,93)] text-white"
                    : index === currentStep
                    ? "border-[rgb(45,95,93)] bg-white text-[rgb(45,95,93)] ring-4 ring-[rgb(45,95,93)]/20"
                    : "border-[rgb(229,233,236)] bg-white text-[rgb(148,163,184)]"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="mt-2 text-center">
                <p
                  className={cn(
                    "text-xs font-medium transition-colors",
                    index <= currentStep
                      ? "text-[rgb(44,62,80)]"
                      : "text-[rgb(148,163,184)]"
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-0.5 text-[10px] text-[rgb(148,163,184)]">
                    {step.description}
                  </p>
                )}
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="mx-2 flex-1 hidden sm:block">
                <div className="h-0.5 w-full bg-[rgb(229,233,236)]">
                  <div
                    className={cn(
                      "h-full transition-all duration-500 bg-[rgb(45,95,93)]",
                      index < currentStep ? "w-full" : "w-0"
                    )}
                  />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}