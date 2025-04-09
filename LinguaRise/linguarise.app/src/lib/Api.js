import axios from "axios";
import { msalInstance } from "./MsalConfig";
import { loginRequest } from "./MsalConfig";

const api = axios.create({
  baseURL: "https://localhost:7049/api",
});

api.interceptors.request.use(async (config) => {
    const account = msalInstance.getActiveAccount();
    if (!account) return config;
  
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account,
      });
  
      config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
    } catch (error) {
      console.error("Nie udało się pobrać tokenu:", error);
    }
  
    return config;
  });
  
  // Obsługa błędów 401/403
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      // Jeżeli dostaniemy 401 i jeszcze nie próbowaliśmy odświeżenia
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