import { User, UsersResponse } from "../types/user";
import { API_URL, getAuthHeader, handleApiError, fetchWithAuth } from "../utils/api";

export const userService = {
  async getAllUsers(accessToken: string): Promise<UsersResponse> {
    try {
      const response = await fetchWithAuth(`${API_URL}/users`, {
        method: "GET",
        headers: getAuthHeader(accessToken),
      });

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
      const response = await fetchWithAuth(`${API_URL}/users/${id}`, {
        method: "GET",
        headers: getAuthHeader(accessToken),
      });

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
      const response = await fetchWithAuth(`${API_URL}/users`, {
        method: "POST",
        headers: getAuthHeader(accessToken),
        body: JSON.stringify(userData),
      });

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
      const response = await fetchWithAuth(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: getAuthHeader(accessToken),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async deleteUser(id: number, accessToken: string): Promise<void> {
    try {
      await fetchWithAuth(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(accessToken),
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};