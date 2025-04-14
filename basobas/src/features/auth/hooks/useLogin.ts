"use client";

import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "@/dto/LoginRequest";
import { authService } from "../services/authService";
import { useRouter } from "next/navigation";
import { useToast } from "@/providers/ToastProvider";

/**
 * Custom hook for login functionality
 * Uses React Query for mutation and toast for notifications
 */
export const useLogin = () => {
  const { showToast } = useToast();
  const router = useRouter();

  const loginMutation = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (data) => {
      showToast(`Welcome back, ${data.user.name}!`, "success");

      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    },
    onError: (error: Error) => {
      showToast(error.message || "Login failed. Please try again.", "error");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
  };
};
