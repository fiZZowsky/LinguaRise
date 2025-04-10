import axios from "axios";
import { loginRequest, msalInstance } from "../lib/MsalConfig";

const api = axios.create({
  baseURL: "https://localhost:7049/api",
});

// Dodaj token do każdego zapytania
api.interceptors.request.use(async (config) => {
  const account = msalInstance.getActiveAccount();
  if (!account) return config;

  try {
    const tokenResponse = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });

    console.log("Token:", tokenResponse.accessToken);
    config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
  } catch (error) {
    console.error("Nie udało się pobrać tokenu:", error);
  }

  return config;
});

// Obsługa błędów autoryzacji
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const account = msalInstance.getActiveAccount();
        if (!account) throw new Error("Brak aktywnego konta");

        const tokenResponse = await msalInstance.acquireTokenSilent({
          ...loginRequest,
          account,
          forceRefresh: true,
        });

        originalRequest.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Nie udało się odświeżyć tokenu:", refreshError);
        msalInstance.logoutRedirect({ postLogoutRedirectUri: "/" });
      }
    }

    if (error.response?.status === 403) {
      console.warn("Brak dostępu (403). Przekierowanie...");
      msalInstance.logoutRedirect({ postLogoutRedirectUri: "/" });
    }

    return Promise.reject(error);
  }
);

export default api;
