import { RegisterRequest, OtpResponse, RegisterResponse } from "../types/register";
import { API_URL, handleApiError } from "../utils/api";

export const registerService = {
  async requestOtp(phoneNumber: string): Promise<OtpResponse> {
    try {
      const response = await fetch(`${API_URL}/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to request OTP");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async registerUser(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to register");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};