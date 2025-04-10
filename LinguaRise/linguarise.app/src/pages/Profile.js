import React, { useEffect, useState } from "react";
import api from "../services/Api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setProfile(res.data);
      } catch (error) {
        console.error("Błąd podczas pobierania profilu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Ładowanie profilu...</p>;

  return (
    <div>
      <h1>Twój profil</h1>
      {profile ? (
        <div>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      ) : (
        <p>Nie udało się załadować profilu.</p>
      )}
    </div>
  );
}
