import React, { createContext, useState, useEffect } from "react";
import {
  AuthContextType,
  AuthResponse,
  LoginCredentials,
  User,
} from "../types/auth";
import { authService } from "../services/authService";
import { setLogoutCallback } from "../utils/api";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedTokens = authService.getStoredTokens();
    const storedUser = authService.getStoredUser();

    if (storedTokens && storedTokens.accessToken && storedUser) {
      setAccessToken(storedTokens.accessToken);
      setRefreshToken(storedTokens.refreshToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response: AuthResponse = await authService.login(credentials);
      setUser(response.user);
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      authService.storeTokens(response.accessToken, response.refreshToken);
      authService.storeUser(response.user);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (refreshToken && user) {
        await authService.logout(refreshToken, user.id);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      authService.clearTokens();
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) return;

    try {
      const response = await authService.refreshToken(refreshToken);
      setAccessToken(response.accessToken);
      if (response.newRefreshToken) {
        setRefreshToken(response.newRefreshToken);
      }
      authService.storeTokens(response.accessToken, refreshToken);
    } catch (error) {
      // If refresh fails, logout user
      await logout();
      throw error;
    }
  };

  // Registrar callback de logout global para manejar 403
  useEffect(() => {
    setLogoutCallback(logout);
  }, []);

  const value: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    isLoading,
    isAuthenticated: !!user && !!accessToken,
    login,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};