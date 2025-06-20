import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { allow } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    const userData = { email, name };

    // Save user info in localStorage using email as key
    localStorage.setItem(email, JSON.stringify(userData));

    // Set user in auth context
    allow(userData);

    alert("Signup successful!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Signup
        </h2>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white/60 placeholder-green-700"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white/60 placeholder-green-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white/60 placeholder-green-700"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border border-green-200 bg-white/60 placeholder-green-700"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-green-800">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-2 px-4 py-1 bg-green-200 text-green-800 rounded-full hover:bg-green-300 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
