"use client";

import React from "react";
import AuthLayout from "@/components/layout/AuthLayout";
import SignupForm from "@/features/auth/components/organisms/SignupForm";
import { AUTH_TEXT } from "@/constants/authText";

/**
 * Signup page
 */
export default function SignupPage() {
  return (
    <AuthLayout
      title={AUTH_TEXT.register.title}
      subtitle={AUTH_TEXT.register.subtitle}
    >
      \
      <SignupForm />
    </AuthLayout>
  );
}
