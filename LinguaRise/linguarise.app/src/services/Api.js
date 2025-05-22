import { getCurrentLanguage } from "../context/LanguageContext";
import { msalInstance, loginRequest } from "../lib/authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const BASE_URL = "https://localhost:7049/api";

async function getAccessToken() {
  const account =
    msalInstance.getActiveAccount() ||
    msalInstance.getAllAccounts()[0] ||
    null;

  if (!account) return null;

  try {
    const resp = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account,
    });
    return resp.accessToken;
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      const resp = await msalInstance.acquireTokenRedirect({
        ...loginRequest,
        account,
      });
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

  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

const api = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data, isJson = true) => request("POST", endpoint, data, isJson),
  put: (endpoint, data, isJson = true) => request("PUT", endpoint, data, isJson),
  delete: (endpoint) => request("DELETE", endpoint),
};

export default api;
