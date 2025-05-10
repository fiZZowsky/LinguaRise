import React from "react";
import { msalInstance } from '../lib/authConfig';
import "../assets/styles/Profile.css";

const getProfileData = () => {
  const account =
    msalInstance.getActiveAccount() || msalInstance.getAllAccounts()[0];

  if (!account) return null;

  const [firstName = "", lastName = ""] = account.name?.split(" ") ?? [];

  return {
    firstName,
    lastName,
    email: account.username,
    country: account.idTokenClaims?.cty
  };
};

const Profile = () => {
  const profile = getProfileData();

  if (!profile)
    return (
      <p className="profile-info">
        You need to sign in to view profile information.
      </p>
    );

  const { firstName, lastName, email, country } = profile;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <h2 className="profile-header">General Information</h2>

        <div className="profile-field">
          <label>First Name</label>
          <input value={firstName} readOnly  tabIndex={-1} />
        </div>

        <div className="profile-field">
          <label>Last Name</label>
          <input value={lastName} readOnly  tabIndex={-1} />
        </div>

        <div className="profile-field">
          <label>Email</label>
          <input value={email} readOnly  tabIndex={-1} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
