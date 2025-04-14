import React from "react";

/**
 * Password validation rules interface
 */
export interface PasswordRules {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

/**
 * PasswordChecklist props interface
 */
interface PasswordChecklistProps {
  /** Password validation rules */
  rules: PasswordRules;
  /** Additional class name */
  className?: string;
}

/**
 * PasswordChecklist component
 * Shows password validation rules with checkmarks for met criteria
 */
const PasswordChecklist: React.FC<PasswordChecklistProps> = ({
  rules,
  className = "",
}) => {
  const checkItems = [
    { rule: rules.hasMinLength, text: "At least 8 characters" },
    { rule: rules.hasUppercase, text: "At least 1 uppercase letter" },
    { rule: rules.hasLowercase, text: "At least 1 lowercase letter" },
    { rule: rules.hasNumber, text: "At least 1 number" },
    { rule: rules.hasSpecialChar, text: "At least 1 special character" },
  ];

  return (
    <ul className={`space-y-1 text-xs ${className}`}>
      {checkItems.map((item, index) => (
        <li
          key={index}
          className={`flex items-center space-x-2 ${
            item.rule
              ? "text-[var(--color-success)]"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          <span className="flex-shrink-0">
            {item.rule ? (
              <CheckIcon className="h-4 w-4" />
            ) : (
              <CircleIcon className="h-4 w-4" />
            )}
          </span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
};

// Icons for the checklist
const CheckIcon = ({ className = "" }) => (
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
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const CircleIcon = ({ className = "" }) => (
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
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default PasswordChecklist;
