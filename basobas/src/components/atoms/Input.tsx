import React, { forwardRef } from "react";

/**
 * Input component — Atomic, stateless, accessible input field with optional icons,
 * floating/standard label, tooltip, and error handling.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string | boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  label?: string;
  floatingLabel?: boolean;
  tooltip?: string;
}

// Subcomponents for readability
const Label = ({
  htmlFor,
  label,
  tooltip,
}: {
  htmlFor: string;
  label: string;
  tooltip?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className="block mb-1 text-sm font-medium text-[var(--color-foreground)] transition-colors"
  >
    {label}
    {tooltip && <Tooltip text={tooltip} />}
  </label>
);

const Tooltip = ({ text }: { text: string }) => (
  <span
    className="ml-1 inline-block cursor-help text-gray-400 hover:text-[var(--color-primary)]"
    title={text}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
  </span>
);

const FloatingLabel = ({
  htmlFor,
  label,
  value,
  placeholder,
}: {
  htmlFor: string;
  label: string;
  value?: string | number;
  placeholder?: string;
}) => (
  <label
    htmlFor={htmlFor}
    className={`absolute left-3 transition-all duration-200 pointer-events-none ${
      value || placeholder
        ? "-top-2 text-xs bg-white dark:bg-gray-800 px-1 text-[var(--color-primary)]"
        : "top-1/2 -translate-y-1/2 text-gray-500"
    }`}
  >
    {label}
  </label>
);

const Icon = ({
  position,
  children,
}: {
  position: "left" | "right";
  children: React.ReactNode;
}) => {
  const sideClass = position === "left" ? "left-3" : "right-3";
  return (
    <div
      className={`absolute ${sideClass} top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors duration-200`}
    >
      {children}
    </div>
  );
};

const ErrorMessage = ({ id, message }: { id: string; message: string }) => (
  <p id={id} className="mt-1 text-xs text-[var(--color-error)] animate-fade-in">
    {message}
  </p>
);

// Main Input component
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      error,
      rightIcon,
      leftIcon,
      label,
      floatingLabel = false,
      tooltip,
      id,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const inputId = id || Math.random().toString(36).substring(2, 9);

    const baseStyles =
      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    const errorStyles = hasError
      ? "border-[var(--color-error)] focus-visible:ring-[var(--color-error)]"
      : "border-input hover:border-[var(--color-primary)] transition-colors";

    const paddingLeft = leftIcon ? "pl-10" : "";
    const paddingRight = rightIcon ? "pr-10" : "";

    return (
      <div className="relative w-full group">
        {label && !floatingLabel && (
          <Label htmlFor={inputId} label={label} tooltip={tooltip} />
        )}

        <div className="relative">
          {leftIcon && <Icon position="left">{leftIcon}</Icon>}

          <input
            ref={ref}
            id={inputId}
            className={`${baseStyles} ${errorStyles} ${paddingLeft} ${paddingRight} ${className} transition-all duration-200`}
            suppressHydrationWarning
            aria-invalid={hasError ? "true" : "false"}
            aria-describedby={hasError ? `${inputId}-error` : undefined}
            {...props}
          />

          {label && floatingLabel && (
            <FloatingLabel
              htmlFor={inputId}
              label={label}
              value={props.value as string | number | undefined}
              placeholder={props.placeholder}
            />
          )}

          {rightIcon && <Icon position="right">{rightIcon}</Icon>}
        </div>

        {typeof error === "string" && error && (
          <ErrorMessage id={`${inputId}-error`} message={error} />
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
