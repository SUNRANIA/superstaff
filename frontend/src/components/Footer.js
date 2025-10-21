import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTiktok,
} from "react-icons/fa";

function Footer() {
  const adresse = "Rue Léopold Vendries Paris, France";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-column">
          <img src={logo} alt="SuperStaff Logo" className="footer-logo" />
          <h2 className="footer-title">SUPERSTAFF</h2>
          <p className="footer-text">
            Artisans staffeurs qualifiés depuis plus de 20 ans, nous réalisons vos projets de
            création, d’amélioration et de rénovation avec passion et excellence, partout en France.
          </p>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h3 className="footer-heading">Contact</h3>
          <ul className="contact-list">
            <li>
              <FaPhoneAlt className="icon" /> +33 758 880 671
            </li>
            <li>
              <FaEnvelope className="icon" /> sas.superstaff@gmail.com
            </li>
            <li>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <FaMapMarkerAlt className="icon location" />
                {adresse}
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-column">
          <h3 className="footer-heading">Suivez-nous</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/profile.php?id=61581627287473&mibextid=rS40aB7S9Ucbxw6v" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <FaTiktok />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} SUPERSTAFF — Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
