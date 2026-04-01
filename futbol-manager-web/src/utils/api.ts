export const API_URL = "http://localhost:3000/api";

export const getAuthHeader = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const handleApiError = (error: any): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unexpected error occurred";
};
