import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  className,
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded",
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black",
    "disabled:opacity-50 disabled:cursor-not-allowed"
  );

  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-red-600 text-white hover:bg-red-700",
    outline:
      "border-2 border-black text-black hover:bg-black hover:text-white",
    ghost: "text-black hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}






