"use client";

import { useState } from "react";
import Link from "next/link";

import VideoBackground from "../../components/VideoBackground/VideoBackground";
import Button from "../../components/Button/Button";
import { getRoleFromToken } from "../../lib/auth";

import { loginUser } from "../../lib/api";
import "../../styles/login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      //redirection to dash
      const role = getRoleFromToken(data.token);

      if (role === "BUSINESS") {
        window.location.href = "/dashboard/business";
      } else {
        window.location.href = "/dashboard/customer";
      }

    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };
  

  return (
    <>
      <VideoBackground />

      <main className="login-page">
        <form className="login-card" onSubmit={handleLogin}>
        <Link href="/" className="back-home">
          ← Back to Home
        </Link>

          <h2 className="login-title">Welcome Back</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />

        {/* o auth */}
          <div className="google-icon-row" onClick={handleGoogleLogin}>
            <img
              src="/google.png"
              alt="Google"
              width="18"
              height="18"
            />
            <span>Continue with Google</span>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <Button disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="auth-switch">
            Don’t have an account? <Link href="/signup">Sign up</Link>
          </div>
        </form>
      </main>
    </>
  );
}
