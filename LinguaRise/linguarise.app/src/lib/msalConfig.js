export const msalConfig = {
  auth: {
    clientId: "9a37fa92-f126-4c0c-87b6-c0dd6bda1038",
    authority: "https://login.microsoftonline.com/dcb8e9ae-a107-4a18-bf63-65886a797086",
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
