import React from "react";
import { Link } from "react-router-dom";

const Settings: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-950 text-white px-4">
      <div className="text-center animate-fadeInUp space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-300 animate-bounce">
          Settings
        </h1>
        <p className="text-lg text-green-100">
          ⚠️ Modifications are not allowed in this app. All settings are fixed.
        </p>

        <Link
          to="/home"
          className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-green-400"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Settings;
