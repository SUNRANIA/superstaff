import React, { useState, useEffect } from "react";
import axios from "axios";
import "./immeuble.css";

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
            alt={`Immeuble CTT ${i}`}
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

function Immeuble() {
  const [backendGallery, setBackendGallery] = useState([]);

  // --- Load backend images from MongoDB ---
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/immeuble")
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
    <section className="immeuble">
      <div className="immeuble-header">
        <h1>Immeuble Haussmannien CTT</h1>
        <p>
          Nous proposons une gamme complète de services pour l’Immeuble
          Haussmannien CTT, afin de valoriser son style unique et son architecture
          classique.
        </p>
      </div>

      <div className="immeuble-details">
        <h2>Nos services pour l’Immeuble CTT</h2>
        <ul>
          <li>Aménagement et décoration intérieure raffinée</li>
          <li>Design de balcons et ornements extérieurs</li>
          <li>Optimisation des espaces et luminosité des appartements</li>
          <li>Création de motifs et reliefs architecturaux sur mesure</li>
          <li>Gestion et coordination de projets pour l’immeuble</li>
          <li>Conseil en valorisation patrimoniale et esthétique</li>
        </ul>
      </div>

      <div className="immeuble-gallery">
        <h2>Galerie de l’Immeuble CTT</h2>
        <div className="gallry-grid">
          {backendGallery.map((img) => (
            <GalleryCard key={img._id} images={[img]} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Immeuble;
