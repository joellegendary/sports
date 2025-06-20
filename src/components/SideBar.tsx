import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    alert("You have been logged out.");
    navigate("/hello"); // adjust as needed
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed top-2 left-2 z-50 flex flex-col items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="p-6 pt-20">
          {user && (
            <div className="mb-6 border-b border-green-200 pb-4">
              <p className="text-green-800 font-semibold text-lg">
                Welcome, {user.name}
              </p>
              <p className="text-green-600 text-sm">{user.email}</p>
            </div>
          )}

          <h2 className="text-2xl font-bold text-green-700 mb-8">Navigation</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/profile"
                className="block text-green-800 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="block text-green-800 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 hover:underline"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
