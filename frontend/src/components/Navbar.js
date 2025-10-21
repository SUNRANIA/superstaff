import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";
import { AiOutlineLogout } from 'react-icons/ai';          


const Navbar = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); // refresh state
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <nav className="navbar">
      <img src={logo} alt="Logo" className="aulogo" />

      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/about">À propos de moi</Link>
        <Link to="/contact">Contactez-moi</Link>

        {isAdmin && <Link to="/dashboard">Dashboard</Link>}

        {!isLoggedIn ? (
          <Link to="/login">Connexion</Link>
        ) : (
          <button className="logout-btn" onClick={handleLogout}>
            <AiOutlineLogout size={20} title="Logout" />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
