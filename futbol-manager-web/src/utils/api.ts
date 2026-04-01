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

// Callback global para manejar logouts
let logoutCallback: (() => void) | null = null;

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback;
};

// Función mejorada de fetch que maneja 403
export const fetchWithAuth = async (
  url: string,
  options: RequestInit & { headers?: Record<string, string> } = {}
): Promise<Response> => {
  try {
    const response = await fetch(url, options);

    // Si recibimos 403, cerrar sesión automáticamente
    if (response.status === 403) {
      console.warn("Session expired (403 Forbidden). Logging out automatically...");
      if (logoutCallback) {
        logoutCallback();
      }
      throw new Error("Session expired. Please login again.");
    }

    // Otros errores HTTP
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};