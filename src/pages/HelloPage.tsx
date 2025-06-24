import React from "react";
import { Link } from "react-router-dom";

const HelloPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-950 text-white px-4">
      <div className="text-center animate-fadeInUp space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-300 animate-bounce">
          THE SPORTS ZONE
        </h1>
        <p className="text-lg md:text-xl text-green-100">
          Your ultimate destination for sports updates, stats, and excitement.
        </p>

        <Link
          to="/login"
          className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full transition duration-300 shadow-md hover:shadow-green-400"
        >
          Enter Sports Zone
        </Link>
      </div>

      <Link
        to="/signup"
        className="mt-6 text-sm bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-full transition duration-300 shadow hover:shadow-red-400"
      >
        Signup
      </Link>
    </div>
  );
};

export default HelloPage;
