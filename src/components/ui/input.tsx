import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-input bg-transparent dark:bg-input/30 shadow-xs px-3",
        underlined:
          "border-0 border-b border-input bg-transparent px-1 shadow-none rounded-none focus:ring-0",
        solid:
          "rounded-md border border-transparent bg-input dark:bg-input/80 shadow-xs px-3",
      },
      inputSize: {
        sm: "h-8 text-sm py-1",
        md: "h-9 text-base py-1",
        lg: "h-10 text-lg py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, variant, inputSize, leftIcon, rightIcon, ...props },
    ref
  ) => {
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    const leftPadding = variant === "underlined" ? "pl-1" : "pl-3";
    const rightPadding = variant === "underlined" ? "pr-1" : "pr-3";
    const inputLeftPadding = variant === "underlined" ? "pl-8" : "pl-10";
    const inputRightPadding = variant === "underlined" ? "pr-8" : "pr-10";

    return (
      <div className={cn("relative flex w-full items-center", className)}>
        {hasLeftIcon && (
          <span
            className={cn(
              "pointer-events-none absolute inset-y-0 left-0 flex items-center text-muted-foreground",
              leftPadding
            )}
          >
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            inputVariants({ variant, inputSize }),
            hasLeftIcon && inputLeftPadding,
            hasRightIcon && inputRightPadding,
            variant === "underlined"
              ? "focus:border-ring"
              : "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            variant === "underlined"
              ? "aria-invalid:border-destructive"
              : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          )}
          ref={ref}
          {...props}
        />
        {hasRightIcon && (
          <span
            className={cn(
              "pointer-events-none absolute inset-y-0 right-0 flex items-center text-muted-foreground",
              rightPadding
            )}
          >
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants };
