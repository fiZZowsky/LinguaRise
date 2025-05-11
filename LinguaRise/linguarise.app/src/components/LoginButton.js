import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
import "../assets/styles/NavbarButton.css";

export default function LoginButton({ label }) {
  const { instance } = useMsal();
  const handleLogin = () => {
    instance.loginRedirect(loginRequest);
  };

  return <button onClick={handleLogin}>{label}</button>;
}