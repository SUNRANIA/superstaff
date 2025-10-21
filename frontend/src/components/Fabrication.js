import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Fabrication.css";

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
            alt={`Fabrication ${i}`}
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

function Fabrication() {
  const [backendGallery, setBackendGallery] = useState([]);

  // --- Load backend images from MongoDB ---
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/fabrication")
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
    <section className="fabrication">
      <div className="fabrication-header">
        <h1>Fabrication sur mesure</h1>
        <p>
          Nous réalisons des créations uniques et personnalisées, conçues pour
          sublimer vos espaces. Chaque projet est fabriqué avec précision et
          souci du détail pour refléter votre style.
        </p>
      </div>

      <div className="fabrication-details">
        <h2>Nos services de fabrication</h2>
        <ul>
          <li>Conception et moulures sur mesure</li>
          <li>Création de plafonds et décors uniques</li>
          <li>Éléments décoratifs adaptés à chaque espace</li>
          <li>Consultation et accompagnement personnalisé</li>
          <li>Choix des textures, matériaux et finitions</li>
          <li>Fabrication et installation complète</li>
        </ul>
      </div>

      <div className="fabrication-gallery">
        <h2>Galerie de Fabrication</h2>
        <div className="gallry-grid">
          {backendGallery.map((img) => (
            <GalleryCard key={img._id} images={[img]} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Fabrication;
