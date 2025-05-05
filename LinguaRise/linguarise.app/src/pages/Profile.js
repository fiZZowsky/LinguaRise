import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  if (!user) return <p>Ładowanie profilu…</p>;

  return (
    <div>
      <h1>Witaj, {user.displayName}</h1>
      <p>Email: {user.mail || user.userPrincipalName}</p>
      {/* inne dane z user */}
    </div>
  );
}
