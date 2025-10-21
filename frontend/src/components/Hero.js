import React, { useState, useEffect } from "react";
import "./Hero.css";
import hero4 from "../assets/immeuble3.jpg";
import hero2 from "../assets/hero2.jpg";

function Hero() {
  const images = [ hero2, hero4];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className="hero-overlay">
        <div className="hero-text">
          <h1>Créations Gypsum Élégantes</h1>
          <p>
            Nous proposons des solutions complètes en staff et plâtre décoratif,
            alliant élégance, modernité et savoir-faire artisanal. Qu’il s’agisse
            de décoration intérieure ou extérieure, de restauration ou de fabrication
            sur mesure, nos réalisations apportent raffinement, style et confort à
            chaque espace.
          </p>
          <a href="#services">
            <button className="hero-button">Nos Services</button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
