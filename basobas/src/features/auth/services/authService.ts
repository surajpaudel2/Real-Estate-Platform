import { LoginRequest, LoginResponse } from "@/dto/LoginRequest";
import { SignupRequest, SignupResponse } from "@/dto/SignupRequest";
import { authApi } from "../api/authApi";

/**
 * Type for API-ready signup data (without confirmPassword)
 */
type ApiSignupRequest = Omit<SignupRequest, "confirmPassword">;

/**
 * Authentication service
 * Business logic layer for auth operations
 */
export const authService = {
  /**
   * Login user with credentials
   *
   * @param data - Login request data
   * @returns Promise with login response
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authApi.login(data);

      // Store token in sessionStorage
      sessionStorage.setItem("authToken", response.accessToken);

      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * Register a new user
   *
   * @param data - Signup request data
   * @returns Promise with signup response
   */
  signup: async (data: SignupRequest): Promise<SignupResponse> => {
    try {
      // Validate password match (can be done in form validation too)
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Extract apiData without the confirmPassword field
      const apiData: ApiSignupRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const response = await authApi.signup(apiData as SignupRequest);

      // Store tokens
      sessionStorage.setItem("authToken", response.accessToken);

      return response;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: (): void => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // Add any additional cleanup here
  },
};
