export const msalConfig = {
    auth: {
      clientId: '79765299-b3c3-42f4-998a-1ff6c326dd5a',
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message) => {
          if (level === 'Error') console.error(message);
        },
        piiLoggingEnabled: false,
      }
    }
  };
  
  export const apiRequest = {
    scopes: ["api://79765299-b3c3-42f4-998a-1ff6c326dd5a/access_as_logged_user"]
  };
  
  export const loginRequest = {
    scopes: [
      "User.Read",
      ...apiRequest.scopes
    ]
  };