export const msalConfig = {
  auth: {
    clientId: "9a37fa92-f126-4c0c-87b6-c0dd6bda1038",
    authority: "https://login.microsoftonline.com/de9ba865-d428-4188-9b63-3895eb17dffa",
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
