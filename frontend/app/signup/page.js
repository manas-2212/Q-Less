"use client";

import { useState } from "react";
import Link from "next/link";

import VideoBackground from "../../components/VideoBackground/VideoBackground";
import Button from "../../components/Button/Button";

import { signupUser } from "../../lib/api";
import "../../styles/signup.css";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER"); // default
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signupUser(name, email, password, role);
      window.location.href = "/login";
    } catch (err) {
      setError("Signup failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // role will be handled after OAuth (we’ll do this later)
    window.location.href = `https://q-less-gh3z.onrender.com/api/auth/google`;
  };

  return (
    <>
      <VideoBackground />

      <main className="signup-page">
        <form className="signup-card" onSubmit={handleSignup}>
        <Link href="/" className="back-home">
  ← Back to Home
</Link>

          <h2 className="signup-title">Create Account</h2>

          {/* Role selector */}
          <div className="role-selector">
            <div
              className={`role-option ${role === "CUSTOMER" ? "active" : ""}`}
              onClick={() => setRole("CUSTOMER")}
            >
              I’m a Customer
            </div>
            <div
              className={`role-option ${role === "BUSINESS" ? "active" : ""}`}
              onClick={() => setRole("BUSINESS")}
            >
              I’m a Business
            </div>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="signup-input"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="signup-input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="signup-input"
          />

          {/* Google OAuth */}
          <div className="google-icon-row" onClick={handleGoogleSignup}>
            <img src="/google.png" alt="Google" width="18" height="18" />
            <span>Sign up with Google</span>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <Button disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </Button>

          <div className="auth-switch">
            Already have an account? <Link href="/login">Login</Link>
          </div>
        </form>
      </main>
    </>
  );
}
