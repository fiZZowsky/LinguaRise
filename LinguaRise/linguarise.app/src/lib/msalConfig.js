import { PublicClientApplication, LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "9a37fa92-f126-4c0c-87b6-c0dd6bda1038",
    authority: "https://login.microsoftonline.com/de9ba865-d428-4188-9b63-3895eb17dffa",
    redirectUri: "http://localhost:3000",
    postLogoutRedirectUri: "https://localhost:3000/",
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  // system: {
  //   loggerOptions: {
  //     loggerCallback: (level, message, piiLoggingEnabled) => {
  //       if (level === LogLevel.Error) {
  //         console.error(message);
  //       } else if (level === LogLevel.Warning) {
  //         console.warn(message);
  //       } else {
  //         console.log(message);
  //       }
  //     },
  //     LogLevel: LogLevel.Verbose,
  //     piiLoggingEnabled: false,
  //   },
  // }
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};

export const msalInstance = new PublicClientApplication(msalConfig);