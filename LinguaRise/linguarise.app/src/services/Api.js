import { getCurrentLanguage } from "../context/LanguageContext";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const BASE_URL = 'https://localhost:7049/api';

const getAccessToken = async () => {
  const { instance, accounts } = useMsal();

  if (accounts == null || accounts[0] == null) return;

  try {
    const response = await instance.acquireTokenSilent({
    ...loginRequest,
    account: accounts[0],
   });

   return response.accessToken;
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) return null;
    throw err;
  }
}

const getHeaders = async (token, isJson = true) => {
  const selectedLang = getCurrentLanguage();
  const headers = {};

  if (isJson) headers['Content-Type'] = 'application/json';
  headers["Accept-Language"] = selectedLang;
  if (token) headers["Authorization"] = 'Bearer ${token}';

  return headers;
};

const request = async (method, endpoint, data = null, isJson = true) => {
  const token = await getAccessToken();
  const config = {
    method,
    headers: getHeaders(token, isJson),
  };

  if (data) {
    config.body = isJson ? JSON.stringify(data) : data;
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, config);

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Wystąpił błąd');
  }

  return response.status !== 204 ? await response.json() : null;
};

const api = {
  get: (endpoint) => request('GET', endpoint),
  post: (endpoint, data) => request('POST', endpoint, data),
  put: (endpoint, data) => request('PUT', endpoint, data),
  delete: (endpoint) => request('DELETE', endpoint),
};

export default api;
