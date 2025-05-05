import { getCurrentLanguage } from "../context/LanguageContext";
import { msalInstance } from "../lib/msalInstance";
import { apiRequest } from "../lib/authConfig";

const BASE_URL = 'https://localhost:7049/api';

const getHeaders = (isJson = true) => {
  const selectedLang = getCurrentLanguage();
  const headers = {};

  if (isJson) headers['Content-Type'] = 'application/json';

  headers["Accept-Language"] = selectedLang;

  return headers;
};

const request = async (method, endpoint, data = null, isJson = true) => {
  const config = {
    method,
    headers: getHeaders(isJson),
  };

  const accounts = msalInstance.getAllAccounts();
  console.log("Accounts:", accounts);
  if (accounts.length > 0) {
    const resp = await msalInstance.acquireTokenSilent({
     scopes: apiRequest.scopes,
     account: accounts[0]
    });
    console.log("Access token:", resp.accessToken);
   config.headers["Authorization"] = `Bearer ${resp.accessToken}`;
  } else {
    console.log("Brak zalogowanego konta, nie dodano tokena");
  }

  if (data) {
    config.body = isJson ? JSON.stringify(data) : data;
  }
  console.log("Final headers:", config.headers);
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
