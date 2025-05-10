import { getCurrentLanguage } from "../context/LanguageContext";
import { msalInstance, loginRequest } from "../lib/authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const BASE_URL = "https://localhost:7049/api";

async function getAccessToken() {
  // Pobieramy konto z globalnej instancji MSAL
  const account =
    msalInstance.getActiveAccount() ||
    msalInstance.getAllAccounts()[0] ||
    null;

  if (!account) return null;  // brak zalogowanego użytkownika

  try {
    const resp = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return resp.accessToken;
  } catch (err) {
    // gdy potrzebna interakcja (np. wygaśnięty token), zwracamy null
    if (err instanceof InteractionRequiredAuthError) {
      return null;
    }
    throw err;
  }
}

function getHeaders(token, isJson = true) {
  const headers = {};
  const lang = getCurrentLanguage();

  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  headers["Accept-Language"] = lang;

  if (token) {
    // BACKTICKS zamiast cudzysłowów
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

async function request(method, endpoint, data = null, isJson = true) {
  const token = await getAccessToken();
  const headers = getHeaders(token, isJson);

  const config = {
    method,
    headers,
    body: data ? (isJson ? JSON.stringify(data) : data) : undefined,
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, config);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || `API error ${res.status}`);
  }
  // brak treści przy 204
  return res.status !== 204 ? await res.json() : null;
}

const api = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  put: (endpoint, data) => request("PUT", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),
};

export default api;
