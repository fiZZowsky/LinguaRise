import { PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "09e43937-7dcd-40be-b089-15c5e07af690",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "http://localhost:3000",
    postLogoutRedirectUri: "http://localhost:3000"
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  }
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: [
    "openid",
    "profile",
    "api://09e43937-7dcd-40be-b089-15c5e07af690/API.Access"
  ]
};