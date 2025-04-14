"use client";

import React from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/features/auth/components/LoginForm";
import { AUTH_TEXT } from "@/constants/authText";

/**
 * Login page
 */
export default function LoginPage() {
  return (
    <AuthLayout
      title={AUTH_TEXT.login.title}
      subtitle={AUTH_TEXT.login.subtitle}
    >
      <LoginForm />
    </AuthLayout>
  );
}
