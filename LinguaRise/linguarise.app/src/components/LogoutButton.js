import { useMsal } from "@azure/msal-react";
import "../assets/styles/NavbarButton.css";

const LogoutButton = ({ label }) => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  return (
    <button className="navbar-btn" onClick={handleLogout}>
      {label}
    </button>
  );
};

export default LogoutButton;
