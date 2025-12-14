import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // adjust path if needed

function AuthStatus() {
  const { token, username, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // clears auth state + localStorage
    navigate("/login"); // redirect to login page
  };


  return (
    <div className="flex items-center gap-2 text-sm whitespace-nowrap">
      {token ? (
        <>
          <span className="px-2 py-1 rounded-full bg-sunrice-accent text-sunrice-brown dark:text-sunrice-green font-medium">
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