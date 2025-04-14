/**
 * Login request data transfer object
 * Used for the login form input and API requests
 */
export interface LoginRequest {
  /** User email */
  email: string;
  /** User password */
  password: string;
}

/**
 * Login response data transfer object
 * Used for API responses
 */
export interface LoginResponse {
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
