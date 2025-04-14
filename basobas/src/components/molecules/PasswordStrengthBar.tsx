import React from "react";

/**
 * Password strength levels
 */
export type PasswordStrength =
  | "weak"
  | "medium"
  | "strong"
  | "very-strong"
  | "empty";

/**
 * PasswordStrengthBar props interface
 */
interface PasswordStrengthBarProps {
  /** Current password strength */
  strength: PasswordStrength;
  /** Show strength text */
  showText?: boolean;
  /** Additional class names */
  className?: string;
}

/**
 * Get color and width based on password strength
 */
const getStrengthStyles = (strength: PasswordStrength) => {
  switch (strength) {
    case "weak":
      return { color: "var(--color-error)", width: "25%", text: "Weak" };
    case "medium":
      return { color: "var(--color-warning)", width: "50%", text: "Medium" };
    case "strong":
      return { color: "var(--color-success)", width: "75%", text: "Strong" };
    case "very-strong":
      return {
        color: "var(--color-success)",
        width: "100%",
        text: "Very Strong",
      };
    default:
      return { color: "#e2e8f0", width: "0%", text: "" };
  }
};

/**
 * PasswordStrengthBar component
 * Shows visual indicator of password strength
 */
const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  strength,
  showText = true,
  className = "",
}) => {
  const { color, width, text } = getStrengthStyles(strength);

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-in-out"
          style={{
            width,
            backgroundColor: color,
          }}
        />
      </div>

      {showText && strength !== "empty" && (
        <p className="text-xs font-medium" style={{ color }}>
          {text}
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthBar;
