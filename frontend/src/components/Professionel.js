import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./profesionnel.css";

function GalleryCard({ images, onDelete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="gallery-card">
      {images.map((img, i) => (
        <div
          key={img._id || img.id}
          className={`card-wrapper ${i === index ? "active" : "hidden"}`}
        >
          <img
            src={img.url || img}
            alt={`Appartement ${i}`}
            className="card-img"
          />
          <button
            className="delete-btn"
            onClick={() => onDelete(img._id || img.id)}
          >
            🗑
          </button>
        </div>
      ))}
    </div>
  );
}

function Professionnel() {
    const [gallery, setGallery] = useState([]);
  
  // Handle delete (remove the whole card)
  const handleDelete = (index) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="professionnel">
      <div className="professionnel-header">
        <h1>Espaces Professionnels</h1>
        <p>
          Nous réalisons des aménagements sur mesure pour les espaces professionnels tels que 
          les restaurants, bureaux et hôtels. Nos créations allient design, fonctionnalité et confort.
        </p>
      </div>

      <div className="professionnel-details">
        <h2>Nos services professionnels</h2>
        <ul>
          <li>Aménagement intérieur pour restaurants et cafés</li>
          <li>Design fonctionnel pour bureaux modernes</li>
          <li>Décoration et optimisation des espaces d’hôtels</li>
          <li>Création de plafonds, murs et décors personnalisés</li>
          <li>Choix des matériaux adaptés à chaque activité</li>
          <li>Suivi complet de la conception à l’installation</li>
        </ul>
      </div>

      <div className="professionnel-gallery">
        <h2>Galerie des projets professionnels</h2>
        <div className="gallery-grid">
          {gallery.map((group, i) => (
            <GalleryCard key={i} images={group} onDelete={() => handleDelete(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Professionnel;
