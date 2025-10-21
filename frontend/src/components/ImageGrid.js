import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./ImageGrid.css"; // your CSS for animation & card styles

function ImageGrid({ images, onDelete }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="gallery-card">
      {images.map((img, i) => (
        <div key={i} className={`card-image-wrapper ${i === index ? "active" : ""}`}>
          <img
            src={`http://localhost:5000/uploads/${img.filename}`}
            alt={img.originalName}
            className="card-image"
          />
          {onDelete && (
            <FaTrash
              className="delete-icon"
              onClick={() => onDelete(img._id)}
              title="Delete image"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default ImageGrid
