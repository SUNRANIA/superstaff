import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Appartement.css"; // Keep your custom CSS file

function GalleryCard({ images, onDelete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="gallry-card">
      {images.map((img, i) => (
        <div
          key={img._id || img.id}
          className={`card-wrapper ${i === index ? "active" : "hidden"}`}
        >
          <img
            src={img.url || img}
            alt={`Appartement ${i}`}
            className="card-imag"
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

function Appartement() {
  const [backendGallery, setBackendGallery] = useState([]);

  // --- Load backend images from MongoDB ---
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/appartement")
      .then((res) => {
        const backendImgs = res.data.map((img) => ({
          ...img,
          url: `http://localhost:5000/uploads/${img.filename}`,
        }));
        setBackendGallery(backendImgs);
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des images :", err)
      );
  }, []);

  // --- Delete image from backend ---
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${id}`);
      setBackendGallery(backendGallery.filter((img) => img._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l’image :", error);
    }
  };

  return (
    <section className="appartement">
      <div className="appartement-header">
        <h1>Appartements Modernes CTT</h1>
        <p>
          Découvrez nos services dédiés à la conception et à la décoration
          d’appartements modernes. Nous créons des espaces élégants, fonctionnels
          et adaptés à votre style de vie.
        </p>
      </div>

      <div className="appartement-details">
        <h2>Nos services pour les Appartements</h2>
        <ul>
          <li>Aménagement intérieur moderne et personnalisé</li>
          <li>Installation de plafonds en plâtre décoratif</li>
          <li>Optimisation de la lumière et de l’espace</li>
          <li>Décoration et choix des matériaux contemporains</li>
          <li>Création d’espaces fonctionnels et confortables</li>
          <li>Conseil en design et harmonie des couleurs</li>
        </ul>
      </div>

      <div className="appartement-gallery">
        <h2>Galerie des Appartements</h2>
        <div className="gallry-grid">
          {backendGallery.map((img) => (
            <GalleryCard key={img._id} images={[img]} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Appartement;
