import { LoginRequest, LoginResponse } from "@/dto/LoginRequest";
import { SignupRequest, SignupResponse } from "@/dto/SignupRequest";

// Note: Actual API implementation is commented out for demo purposes
// When implementing actual API calls, uncomment this:
/*
import axios from 'axios';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.basobas.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
*/

/**
 * Authentication API functions for login and signup
 */
export const authApi = {
  /**
   * Login user with credentials
   *
   * @param data - Login credentials
   * @returns Promise with login response
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    // For demo purpose, simulate a successful login
    // In a real app, replace with actual API call:
    // const response = await apiClient.post<LoginResponse>('/auth/login', data);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: "sample-jwt-token",
          refreshToken: "sample-refresh-token",
          user: {
            id: "1",
            name: "John Doe",
            email: data.email,
          },
        });
      }, 1000); // Simulate network delay
    });
  },

  /**
   * Register a new user
   *
   * @param data - Signup data
   * @returns Promise with signup response
   */
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    // For demo purpose, simulate a successful signup
    // In a real app, replace with actual API call:
    // const response = await apiClient.post<SignupResponse>('/auth/signup', data);
    // return response.data;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: "sample-jwt-token",
          refreshToken: "sample-refresh-token",
          user: {
            id: "1",
            name: data.name,
            email: data.email,
          },
        });
      }, 1000); // Simulate network delay
    });
  },
};
