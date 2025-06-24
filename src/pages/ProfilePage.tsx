import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-600 text-xl">
          You must be logged in to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="relative bg-white/30 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-sm">
        {/* X icon as a Link to HomePage */}
        <Link
          to="/Home"
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition"
        >
          <X size={24} />
        </Link>

        {/* User Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-md">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Your Profile
        </h2>

        <p className="text-green-900 mb-2">
          Name: <strong>{user.name}</strong>
        </p>
        <p className="text-green-900 mb-6">
          Email: <strong>{user.email}</strong>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
