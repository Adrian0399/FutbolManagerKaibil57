import { User, UsersResponse } from "../types/user";
import { API_URL, getAuthHeader, handleApiError } from "../utils/api";

export const userService = {
  async getAllUsers(accessToken: string): Promise<UsersResponse> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: getAuthHeader(accessToken),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getUserById(
    id: number,
    accessToken: string
  ): Promise<{ user: User; newAccessToken?: string }> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "GET",
        headers: getAuthHeader(accessToken),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async createUser(
    userData: Omit<User, "id" | "createdAt" | "updatedAt">,
    accessToken: string
  ): Promise<{ user: User; newAccessToken?: string }> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: getAuthHeader(accessToken),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async updateUser(
    id: number,
    userData: Partial<User>,
    accessToken: string
  ): Promise<{ user: User; newAccessToken?: string }> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: getAuthHeader(accessToken),
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async deleteUser(id: number, accessToken: string): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(accessToken),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
