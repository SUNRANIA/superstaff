import React, { useState } from "react";
import "./Auth.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Forgot() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setStatus("❌ Email is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setStatus("❌ Please enter a valid email.");
      return;
    }

    setStatus("📩 Sending reset link...");

    try {
      const res = await axios.post("http://localhost:5000/api/forgot-password", {
        email,
      });
      setStatus("✅ " + res.data.message);
      setEmail("");
    } catch (err) {
      setStatus("❌ Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {status && <p className="status-message">{status}</p>}
        <p style={{ marginTop: "1rem" }}>
          <span
            onClick={() => navigate("/Auth")}
            className="toggle-link"
            style={{ cursor: "pointer" }}
          >
            ← Back to login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Forgot;
