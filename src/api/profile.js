import React, { useEffect, useState } from "react";

const BASE_URL = "https://crypto-backend-i2i3.onrender.com";

export async function getProfile() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;