import { useState, useContext } from "react";
import api from "../utils/api";
import PageWrapper from "../components/common/PageWrapper";
import { AuthContext } from "../context/AuthContext"; 


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username, password });
      // localStorage.setItem("accessToken", res.data.accessToken);
      // localStorage.setItem("refreshToken", res.data.refreshToken);
      // localStorage.setItem("username", res.data.user.username);
      // localStorage.setItem("role", res.data.user.role);
      login(res.data); //change from localStorage to context
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <PageWrapper title="Login">
      <div
        className="
          max-w-md mx-auto rounded-xl p-6 shadow-lg
          bg-sunrice-cream text-sunrice-brown
          dark:bg-opacity-5 dark:bg-sunrice-brown dark:backdrop-blur-md 
        "
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-sunrice-brown rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunrice-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-sunrice-brown rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunrice-accent"
          />
          <button
            type="submit"
            className="bg-sunrice-brown text-sunrice-cream px-4 py-2 rounded hover:bg-sunrice-accent transition"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
          <p className="dark:text-sunrice-cream">
            Don’t have an account? <a href="/signup" className="text-red-600 dark:text-red-400">Sign up here</a>
          </p>
        </form>
      </div>
    </PageWrapper>
  );
}

export default LoginPage;