"use client";

import { useMutation } from "@tanstack/react-query";
import { SignupRequest, SignupResponse } from "@/dto/SignupRequest";
import { authService } from "../services/authService";
import { useToast } from "@/providers/ToastProvider";
import { useRouter } from "next/navigation";

/**
 * Custom hook for signup functionality
 * Uses React Query for mutation and toast for notifications
 */
export const useSignup = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const signupMutation = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: (data: SignupRequest) => authService.signup(data),
    onSuccess: (data) => {
      showToast(
        `Welcome, ${data.user.name}! Your account has been created.`,
        "success"
      );

      // Redirect to dashboard after successful signup
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    },
    onError: (error: Error) => {
      showToast(error.message || "Signup failed. Please try again.", "error");
    },
  });

  return {
    signup: signupMutation.mutate,
    isLoading: signupMutation.isPending,
    error: signupMutation.error,
    isSuccess: signupMutation.isSuccess,
  };
};
