import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // initialize state from localStorage so it persists across reloads
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  // called after successful login
  const login = (data) => {
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("username", data.user.username);
    localStorage.setItem("role", data.user.role);

    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setUsername(data.user.username);
    setRole(data.user.role);
  };

  // called on logout
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRefreshToken(null);
    setUsername(null);
    setRole(null);
  };

  // refresh flow - if access token expires (only 30 m), refresh using refresh token (7 d)
  const refresh = async () => {
    if (!refreshToken) return null;
    try {
      const res = await fetch("/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await res.json();
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        setToken(data.accessToken);
        return data.accessToken;
      } else {
        logout();
        return null;
      }
    } catch {
      logout();
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ token, username, role, refreshToken, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}