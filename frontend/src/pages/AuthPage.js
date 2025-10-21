import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";
import logo from "../assets/logo.png";

const AuthPage = ({ setIsAdmin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setStatus("❌Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setStatus("❌ Format d’email invalide.");
      return;
    }

    if (form.password.length < 6) {
      setStatus("❌ Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setStatus("🔄 Traitement en cours...");

    try {
      const url = `http://localhost:5000/api/${isLogin ? "login" : "signup"}`;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const response = await axios.post(url, payload);

      setStatus("✅ " + response.data.message);

      if (isLogin) {
        const admin = response.data.isAdmin;

        // Save flags
        localStorage.setItem("isAdmin", admin ? "true" : "false");
        localStorage.setItem("isLoggedIn", "true");
        setIsAdmin(admin); // update App state

        navigate(admin ? "/dashboard" : "/");
      } else {
        setIsLogin(true); // switch to login after signup
      }

      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      const errMsg =
        error.response?.data?.error || "Une erreur s’est produite. Veuillez réessayer.";
      setStatus("❌ " + errMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Logo" className="auth-logo" />
        <h1>{isLogin ? "Se connecter" : "S’inscrire"}</h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Nom"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="mot de passe"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide Password" : "Show Password"}
              style={{ cursor: "pointer" }}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {isLogin && (
            <div className="forgot-password">
              <span
                onClick={() => navigate("/forgot")}
                className="toggle-link"
                style={{ cursor: "pointer" }}
              >
                Mot de passe oublié ?
              </span>
            </div>
          )}

          <button type="submit">{isLogin ? "Connexion" : "S’inscrire"}</button>
        </form>

        {status && <p className="status-message">{status}</p>}

        <p>
          {isLogin ? "Vous n’avez pas de compte ?" : "Vous avez déjà un compte ?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="toggle-link"
            style={{ cursor: "pointer" }}
          >
            {isLogin ? "S’inscrire" : "Connexion"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
