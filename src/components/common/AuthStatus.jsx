import React from "react";
import { Link, useNavigate } from "react-router-dom";

function AuthStatus() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
      {token ? (
        <>
          <span className="px-2 py-1 rounded-full bg-sunrice-accent text-sunrice-brown font-medium">
            {username ? `Welcome, ${username}` : "Logged in"}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-full bg-sunrice-brown text-sunrice-cream hover:bg-sunrice-accent transition"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          to="/login"
          className="px-3 py-1 rounded-full bg-sunrice-accent text-sunrice-brown hover:bg-sunrice-brown hover:text-sunrice-cream transition"
        >
          Log in
        </Link>
      )}
    </div>
  );
}

export default AuthStatus;