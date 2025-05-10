import { useMsal } from "@azure/msal-react";

const LogoutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    instance.logoutRedirect({ postLogoutRedirectUri: "/" });
  };

  return (
    <button className="btn" onClick={handleLogout}>
      Wyloguj
    </button>
  );
};

export default LogoutButton;
