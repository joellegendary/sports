import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "logging" | "success">("idle");

  const navigate = useNavigate();
  const { allow } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("logging");
    setError("");

    setTimeout(() => {
      const storedData = localStorage.getItem(email.trim());

      if (storedData) {
        const parsedUser = JSON.parse(storedData);
        if (
          parsedUser.email === email.trim() &&
          parsedUser.password === password.trim()
        ) {
          allow({ email: parsedUser.email, name: parsedUser.name });
          setStatus("success");
          alert(`Welcome back, ${parsedUser.name}!`);
          navigate("/home");
          return;
        }
      }

      setError("Invalid email or password");
      setStatus("idle");
    }, 1000);
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-green-300 min-h-screen flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-green-200 bg-white/50 placeholder-green-700"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-green-200 bg-white/50 placeholder-green-700"
            required
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={status === "logging"}
            className={`w-full py-2 rounded-xl transition text-white ${
              status === "success"
                ? "bg-green-500"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {status === "logging" ? "Logging in..." : "Submit"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-green-800">Don’t have an account?</p>
          <button
            onClick={() => navigate("/signup")}
            className="mt-2 px-4 py-1 bg-green-200 text-green-800 rounded-full hover:bg-green-300 transition"
          >
            Go to Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
