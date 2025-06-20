import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-xl">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login"); // or wherever your login page is
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Your Profile
        </h2>

        <p className="text-green-900 mb-2">
          Name: <strong>{user.name}</strong>
        </p>
        <p className="text-green-900 mb-6">
          Email: <strong>{user.email}</strong>
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
