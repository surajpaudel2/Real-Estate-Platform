"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import PasswordInput from "@/components/molecules/PasswordInput";
import { LoginRequest } from "@/dto/LoginRequest";
import { useLogin } from "../hooks/useLogin";
import GoogleIcon from "./atoms/GoogleIcon";
import SignInIcon from "./atoms/SignInIcon";
import LockIcon from "./atoms/LockIcon";
import EmailIcon from "./atoms/EmailIcon";
import FormRedirectLinks from "./atoms/FormRedirectLinks";

/**
 * Login form validation schema
 */
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

/**
 * LoginForm component
 * Uses React Hook Form for form handling and validation
 */
const LoginForm: React.FC = () => {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginRequest) => {
    login(data);
  };

  const handleGoogleLogin = () => {
    // Implement Google OAuth login
    console.log("Google login clicked");
    // Add your Google OAuth logic here
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 animate-fade-in"
    >
      <div>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          leftIcon={<EmailIcon />}
          {...register("email")}
          error={errors.email?.message}
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[var(--color-foreground)]"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10">
            <LockIcon />
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            className="pl-10 mt-1"
            {...register("password")}
            error={errors.password?.message}
          />
        </div>
        <div className="flex justify-end mt-1">
          <Link
            href="/forgot-password"
            className="text-xs text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline"
            title="Reset your password"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          leftIcon={<SignInIcon />}
          className="transition-transform active:scale-[0.98]"
        >
          Sign In
        </Button>
      </div>
      <ContinueWith />
      <div>
        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleGoogleLogin}
          leftIcon={<GoogleIcon />}
          className="transition-transform active:scale-[0.98]"
        >
          Continue with Google
        </Button>
      </div>

      <FormRedirectLinks isLogin={true} />
    </form>
  );
};

const ContinueWith: React.FC = () => {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span className="mx-4 flex-shrink text-xs text-gray-500 dark:text-gray-400">
        or continue with
      </span>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>
  );
};

export default LoginForm;
