import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type = "text", label, error, icon, onIconClick, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label className="text-sm font-medium text-foreground">{label}</label>
        )}
        <div className="relative flex items-center">
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-input bg-white px-3 py-2 text-sm font-normal placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive/20",
              icon && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <button
              type="button"
              onClick={onIconClick}
              className="absolute right-3 h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Toggle"
            >
              {icon}
            </button>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
