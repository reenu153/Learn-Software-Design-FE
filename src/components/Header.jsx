import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const user = JSON.parse(localStorage.getItem("user")) || { name: "User" };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleLogout = () => {
    if (window.confirm("Logout?")) {    
        localStorage.removeItem("token");
        navigate("/login");
    }
  };

  return (
    <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md sticky top-0 z-50">
      
      {/* Left: Back or Home */}
      <div>
        {isHome ? (
          <button
            onClick={handleHome}
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            🏠 Home
          </button>
        ) : (
          <button
            onClick={handleBack}
            className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            ← Back
          </button>
        )}
      </div>

      {/* Center: App Name */}
      <div className="text-xl font-bold">
        UML Academy
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary-100 text-white flex items-center justify-center">
            {user?.charAt(0).toUpperCase()}
          </div>

          {/* Username */}
          <span className="hidden sm:block text-sm font-medium">
            {user}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="hidden sm:block text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}