import { msalInstance } from '../lib/msalInstance';
import { loginRequest } from '../lib/authConfig';

export const getAccessToken = async () => {
  const account = msalInstance.getActiveAccount();
  if (!account) throw new Error("Brak zalogowanego konta");

  const response = await msalInstance.acquireTokenSilent({
    ...loginRequest,
    account
  });

  return response.idToken;
};
