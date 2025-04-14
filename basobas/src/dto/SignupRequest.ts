/**
 * Signup request data transfer object
 * Used for the signup form input and API requests
 */
export interface SignupRequest {
  /** User full name */
  name: string;
  /** User email */
  email: string;
  /** User password */
  password: string;
  /** Password confirmation */
  confirmPassword: string;
}

/**
 * Signup response data transfer object
 * Used for API responses
 */
export interface SignupResponse {
  /** Access token */
  accessToken: string;
  /** Refresh token */
  refreshToken?: string;
  /** User information */
  user: {
    /** User ID */
    id: string;
    /** User name */
    name: string;
    /** User email */
    email: string;
  };
}
