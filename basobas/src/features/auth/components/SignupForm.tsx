"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import PasswordInput from "@/components/molecules/PasswordInput";
import PasswordChecklist from "@/components/molecules/PasswordChecklist";
import PasswordStrengthBar from "@/components/molecules/PasswordStrengthBar";
import { SignupRequest } from "@/dto/SignupRequest";
import { useSignup } from "../hooks/useSignup";
import {
  evaluatePasswordRules,
  calculatePasswordStrength,
} from "@/utils/validation";
import { PasswordRules } from "@/components/molecules/PasswordChecklist";
import { PasswordStrength } from "@/components/molecules/PasswordStrengthBar";
import UserPlusIcon from "./atoms/UserPlusIcon";
import LockIcon from "./atoms/LockIcon";
import EmailIcon from "./atoms/EmailIcon";
import UserIcon from "./atoms/UserIcon";
import FormRedirectLinks from "./atoms/FormRedirectLinks";

/**
 * Signup form validation schema
 */
const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * SignupForm component
 * Uses React Hook Form for form handling and validation
 * Includes real-time password strength visualization
 */
const SignupForm: React.FC = () => {
  const { signup, isLoading } = useSignup();
  const [passwordRules, setPasswordRules] = useState<PasswordRules>({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [passwordStrength, setPasswordStrength] =
    useState<PasswordStrength>("empty");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupRequest>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  // Watch password field for live validation
  const password = watch("password");

  // Update password validation rules whenever password changes
  useEffect(() => {
    if (password) {
      const rules = evaluatePasswordRules(password);
      setPasswordRules(rules);
      setPasswordStrength(calculatePasswordStrength(password));
    } else {
      setPasswordRules({
        hasMinLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
      });
      setPasswordStrength("empty");
    }
  }, [password]);

  const onSubmit = (data: SignupRequest) => {
    signup(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 animate-fade-in"
    >
      <div>
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          leftIcon={<UserIcon />}
          {...register("name")}
          error={errors.name?.message}
        />
      </div>

      <div>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<EmailIcon />}
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-[var(--color-foreground)]"
        >
          Password
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
            <LockIcon />
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            className="pl-10"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>

        {/* Password strength indicators only show when user starts typing */}
        {password && (
          <div className="animate-fade-in">
            <div className="mt-2">
              <PasswordStrengthBar strength={passwordStrength} />
            </div>
            <div className="mt-3">
              <PasswordChecklist rules={passwordRules} />
            </div>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-1 text-sm font-medium text-[var(--color-foreground)]"
        >
          Confirm Password
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
            <LockIcon />
          </div>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            className="pl-10"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </div>
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          className="transition-transform active:scale-[0.98]"
        >
          <UserPlusIcon className="w-5 h-5 mr-2" />
          Create Account
        </Button>
      </div>

      <FormRedirectLinks isLogin={false} />
    </form>
  );
};

// Form icons

// Add new UserPlusIcon

export default SignupForm;
