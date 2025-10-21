import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Facades.css";

const generateId = () => "_" + Math.random().toString(36).substr(2, 9);

function GalleryCard({ images, onDelete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
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
            alt={`Façades ${i}`}
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

function Facades() {
  // 🧹 Default images removed
  const [gallery, setGallery] = useState([]);
  const [backendGallery, setBackendGallery] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/facades")
      .then((res) => {
        if (res.data.length > 0) {
          const backendImgs = res.data.map((img) => ({
            ...img,
            url: `http://localhost:5000/uploads/${img.filename}`,
          }));
          setBackendGallery(backendImgs);
        }
      })
      .catch(() => {});
  }, []);

  const handleDelete = async (id) => {
    const backendImg = backendGallery.find((img) => img._id === id);
    if (backendImg) {
      try {
        await axios.delete(`http://localhost:5000/api/images/${id}`);
        setBackendGallery(backendGallery.filter((img) => img._id !== id));
      } catch {}
    } else {
      setGallery(
        gallery
          .map((group) =>
            group.filter((img) => (img.id || img._id) !== id)
          )
          .filter((group) => group.length > 0)
      );
    }
  };

  return (
    <section className="facades">
      <div className="facades-header">
        <h1>Façades et Extérieurs</h1>
        <p>
          Sublimez l’extérieur de vos bâtiments avec des façades élégantes et durables. 
          Nous associons design, savoir-faire et matériaux de qualité pour offrir une finition 
          esthétique et résistante aux intempéries.
        </p>
      </div>

      <div className="facades-details">
        <h2>Nos services pour les façades</h2>
        <ul>
          <li>Conception et habillage décoratif de façades</li>
          <li>Rénovation complète des extérieurs</li>
          <li>Travaux d’enduits et finitions haut de gamme</li>
          <li>Création d’ornements architecturaux personnalisés</li>
          <li>Isolation et protection contre l’humidité</li>
          <li>Peinture, patine et restauration de façades anciennes</li>
        </ul>
      </div>

      <div className="facades-gallery">
        <h2>Galerie des Façades</h2>
        <div className="gallry-grid">
          {gallery.map((group, i) => (
            <GalleryCard key={`default-${i}`} images={group} onDelete={handleDelete} />
          ))}

          {backendGallery.map((img) => (
            <GalleryCard key={img._id} images={[img]} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Facades;
