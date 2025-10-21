import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Restauration.css";

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
            alt={`Restauration ${i}`}
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

function Restauration() {
  // 🧹 Default images deleted
  const [gallery, setGallery] = useState([]);
  const [backendGallery, setBackendGallery] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/images/restauration")
      .then((res) => {
        const backendImgs = res.data.map((img) => ({
          ...img,
          url: `http://localhost:5000/uploads/${img.filename}`,
        }));
        setBackendGallery(backendImgs);
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
    <section className="restauration">
      <div className="restauration-header ">
        <h1>Restauration et Rénovation</h1>
        <p>
          Nous redonnons vie à vos espaces à travers des projets de restauration 
          et de rénovation sur mesure, combinant savoir-faire artisanal et technologies modernes.
        </p>
      </div>

      <div className="restauration-details">
        <h2>Nos services de restauration</h2>
        <ul>
          <li>Restauration de plafonds décoratifs en plâtre</li>
          <li>Reproduction fidèle de moulures anciennes</li>
          <li>Nettoyage et remise à neuf des structures ornementales</li>
          <li>Rénovation complète de murs et corniches</li>
          <li>Finitions artistiques et patines traditionnelles</li>
          <li>Gestion de projets de restauration haut de gamme</li>
        </ul>
      </div>

      <div className="restauration-gallery">
        <h2>Galerie de Restauration</h2>
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

export default Restauration;
