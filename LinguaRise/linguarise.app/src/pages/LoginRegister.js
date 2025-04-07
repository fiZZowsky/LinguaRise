import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
import '../assets/styles/LoginRegister.css';

export default function LoginRegister() {
  const { instance } = useMsal();
  const [localLogin, setLocalLogin] = useState({ email: "", password: "" });

  const handleMicrosoftLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      console.log("Zalogowano:", loginResponse.account);

      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account: loginResponse.account,
      });

      console.log("Token JWT:", tokenResponse.accessToken);

      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });

      const data = await response.json();
      console.log("Dane z backendu:", data);
    } catch (error) {
      console.error("Błąd logowania Microsoft:", error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Logowanie lokalne (dodasz później)
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-heading">Login</div>
        <div className="input-group">
          <label className="label" htmlFor="email">Email</label>
          <input
            required
            placeholder="Enter your email"
            name="email"
            id="email"
            type="email"
            value={localLogin.email}
            onChange={(e) => setLocalLogin({ ...localLogin, email: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label className="label" htmlFor="password">Password</label>
          <input
            required
            placeholder="Enter your password"
            name="password"
            id="password"
            type="password"
            value={localLogin.password}
            onChange={(e) => setLocalLogin({ ...localLogin, password: e.target.value })}
          />
        </div>
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
        <button className="submit" type="submit">Log In</button>

        <div className="divider">or</div>

        <button className="submit" type="button" onClick={handleMicrosoftLogin}>
          Log in with Microsoft
        </button>

        <div className="signup-link">Don't have an account? <a href="#">Sign up</a></div>
      </form>
    </div>
  );
}