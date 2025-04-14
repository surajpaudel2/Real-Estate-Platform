import React, { forwardRef, useState } from "react";
import Input from "../atoms/Input";

/**
 * PasswordInput props interface
 */
interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error state with optional message */
  error?: string | boolean;
  /** Optional label for the input */
  label?: string;
  /** Optional tooltip for the label */
  tooltip?: string;
  /** Optional left icon */
  leftIcon?: React.ReactNode;
  /** Use floating label style */
  floatingLabel?: boolean;
}

/**
 * PasswordInput component
 * Molecule component combining Input with password visibility toggle
 */
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className = "",
      label,
      tooltip,
      leftIcon,
      floatingLabel = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={className}
        label={label}
        tooltip={tooltip}
        leftIcon={leftIcon}
        floatingLabel={floatingLabel}
        rightIcon={
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="flex items-center justify-center text-gray-500 hover:text-[var(--color-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 rounded transition-colors duration-200 cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
            suppressHydrationWarning
          >
            <div className="relative w-5 h-5 flex items-center justify-center">
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  showPassword ? "opacity-100" : "opacity-0"
                }`}
              >
                <EyeOffIcon className="h-5 w-5" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                  showPassword ? "opacity-0" : "opacity-100"
                }`}
              >
                <EyeIcon className="h-5 w-5" />
              </span>
            </div>
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

// Eye and EyeOff icon components
const EyeIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

export default PasswordInput;
