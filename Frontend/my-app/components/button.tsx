'use client';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "outline" | "ghost";
  size?: "sm" | "md";
};

const Button = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
  ...props
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    outline: "border border-border hover:bg-muted",
    ghost: "hover:bg-muted",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;