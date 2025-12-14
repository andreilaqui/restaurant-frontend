import { useState } from "react";
import api from "../utils/api";
import PageWrapper from "../components/common/PageWrapper";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const validateForm = () => {
    const errors = [];

    if (!username.trim()) {
      errors.push("Username is required");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Invalid email address");
    }

    if (phone && !/^\+?[0-9]{7,15}$/.test(phone)) {
      errors.push("Invalid phone number");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await api.post("/auth/signup", {
        username,
        email,
        phone,
        password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      window.location.href = "/menu"; // redirect after signup
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
      console.error("Signup error:", err.response?.data);
    }
  };

  return (
    <PageWrapper title="Sign Up">
      <div
        className="
          max-w-md mx-auto rounded-xl p-6 shadow-lg
          bg-sunrice-cream text-sunrice-brown
          dark:bg-opacity-30 dark:bg-sunrice-brown dark:backdrop-blur-md dark:text-sunrice-cream
        "
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-sunrice-brown rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunrice-accent"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-sunrice-brown rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunrice-accent"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-sunrice-brown rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunrice-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-sunrice-brown rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunrice-accent"
            required
          />
          <button
            type="submit"
            className="bg-sunrice-brown text-sunrice-cream px-4 py-2 rounded hover:bg-sunrice-accent transition"
          >
            Sign Up
          </button>

          {validationErrors.length > 0 && (
            <ul className="text-red-500 list-disc pl-5">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <p>
            Already have an account? <a href="/login">Log in here</a>
          </p>
        </form>
      </div>
    </PageWrapper>
  );
}

export default SignupPage;