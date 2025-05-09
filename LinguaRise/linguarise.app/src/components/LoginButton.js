import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";

const LoginButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return (
    <button className="btn" onClick={handleLogin}>
      Zaloguj przez Microsoft
    </button>
  );
};

export default LoginButton;
