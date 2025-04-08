import { msalInstance, loginRequest } from '../lib/msalConfig';

export const getAccessToken = async () => {
  const account = msalInstance.getActiveAccount();
  if (!account) throw new Error("Brak zalogowanego konta");

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account
  });

  return response.accessToken;
};
