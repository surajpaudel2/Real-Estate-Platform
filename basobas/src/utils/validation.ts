import { PasswordRules } from "../components/molecules/PasswordChecklist";
import { PasswordStrength } from "../components/molecules/PasswordStrengthBar";

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

/**
 * Password validation regex patterns
 */
const PASSWORD_PATTERNS = {
  minLength: /.{8,}/,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  specialChar: /[^A-Za-z0-9]/,
};

/**
 * Validates an email address format
 *
 * @param email - Email to validate
 * @returns boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Evaluates password rules based on requirements
 *
 * @param password - Password to validate
 * @returns Object with boolean flags for each validation rule
 */
export const evaluatePasswordRules = (password: string): PasswordRules => {
  return {
    hasMinLength: PASSWORD_PATTERNS.minLength.test(password),
    hasUppercase: PASSWORD_PATTERNS.uppercase.test(password),
    hasLowercase: PASSWORD_PATTERNS.lowercase.test(password),
    hasNumber: PASSWORD_PATTERNS.number.test(password),
    hasSpecialChar: PASSWORD_PATTERNS.specialChar.test(password),
  };
};

/**
 * Calculates password strength based on validation rules
 *
 * @param password - Password to evaluate
 * @returns PasswordStrength enum value
 */
export const calculatePasswordStrength = (
  password: string
): PasswordStrength => {
  if (!password) return "empty";

  const rules = evaluatePasswordRules(password);
  const ruleCount = Object.values(rules).filter(Boolean).length;

  if (ruleCount <= 2) return "weak";
  if (ruleCount <= 3) return "medium";
  if (ruleCount === 4) return "strong";
  return "very-strong";
};
