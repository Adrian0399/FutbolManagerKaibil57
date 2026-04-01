import { LoginCredentials, AuthResponse } from "../types/auth";
import { API_URL, handleApiError } from "../utils/api";

const TOKEN_STORAGE_KEY = "auth_tokens";
const USER_STORAGE_KEY = "auth_user";

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async refreshToken(
    refreshToken: string
  ): Promise<{ accessToken: string; newRefreshToken?: string }> {
    try {
      const response = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async logout(refreshToken: string, userId: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken, userId }),
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  storeTokens(accessToken: string, refreshToken: string) {
    const tokens = { accessToken, refreshToken };
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens));
  },

  storeUser(user: any) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  },

  getStoredTokens() {
    const tokens = localStorage.getItem(TOKEN_STORAGE_KEY);
    return tokens ? JSON.parse(tokens) : null;
  },

  getStoredUser() {
    const user = localStorage.getItem(USER_STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },

  clearTokens() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  },
};
