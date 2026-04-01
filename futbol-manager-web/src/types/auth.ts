export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roleId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}
