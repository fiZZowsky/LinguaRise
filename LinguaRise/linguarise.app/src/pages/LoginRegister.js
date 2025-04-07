import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../lib/authConfig";
const { instance, accounts } = useMsal();
import '../assets/styles/LoginRegister.css';

const handleMicrosoftLogin = async () => {
  try {
    const loginResponse = await instance.loginPopup(loginRequest);
    console.log("Zalogowano:", loginResponse.account);

    const tokenResponse = await instance.acquireTokenSilent({
      ...loginRequest,
      account: loginResponse.account,
    });

    console.log("Token:", tokenResponse.accessToken);

    const response = await fetch("http://localhost:5000/api/user/profile", {
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
      },
    });

    const data = await response.json();
    console.log("Dane z backendu:", data);

    // tutaj możesz zapisać dane użytkownika do contextu / localStorage / itp.
  } catch (err) {
    console.error("Błąd logowania:", err);
  }
};

export default function LoginRegister() {
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
            <div className="signup-link">Don't have an account? <a href="#">Sign up</a></div>
          </form>

          <button type="button" className="submit" onClick={handleMicrosoftLogin}>
            Log in with Microsoft
          </button>
        </div>
      );
}
