// components/ui/Button.tsx
import React, { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader } from "lucide-react";

type Variant = "primary" | "secondary" | "danger";
type Size = "sm" | "md" | "lg";
type Type = "button" | "submit";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  type?: Type;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition duration-200 focus:outline-none";

    const variants: Record<Variant, string> = {
      primary: "bg-emerald-600 text-white hover:bg-emerald-700",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes: Record<Size, string> = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`cursor-pointer ${baseStyles} ${variants[variant]} ${sizes[size]} ${
          disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin">
            <Loader />
          </span>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
