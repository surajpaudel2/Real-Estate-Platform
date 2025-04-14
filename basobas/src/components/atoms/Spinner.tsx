import React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg" | string; // tailwind classes or preset
  colorClass?: string; // custom text/border color
  className?: string; // extra custom styling
};

const sizeMap: Record<string, string> = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

const Spinner = ({
  size = "md",
  colorClass = "border-[var(--color-primary)]",
  className = "",
}: SpinnerProps) => {
  const spinnerSize = sizeMap[size] || size;

  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${spinnerSize} ${colorClass} ${className}`}
    />
  );
};

export default Spinner;
