// Dashboard.js
import React, { useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
  const [category, setCategory] = useState("restauration");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [msg, setMsg] = useState("");

  const categories = [
    "facades",
    "restauration",
    "immeuble",
    "professionel",
    "appartement",
    "fabrication",
  ];

  const handleUpload = async () => {
    if (!selectedFiles.length) return setMsg("❌ Choose at least one file");

    const formData = new FormData();
    for (const file of selectedFiles) formData.append("images", file);
    formData.append("category", category);

    try {
      await axios.post("http://localhost:5000/api/images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg(`✅ Uploaded ${selectedFiles.length} image(s) successfully!`);
      setSelectedFiles([]);
    } catch (err) {
      console.error(err);
      setMsg("❌ Upload failed");
    }
  };

  return (
    <div className="dashboard">
      <h1>📸 Dashboard - Image Upload</h1>

      <div className="upload-section">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="file"
          multiple
          onChange={(e) => setSelectedFiles(e.target.files)}
        />

        <button onClick={handleUpload}>Upload</button>
      </div>

      {msg && <p className="msg">{msg}</p>}
    </div>
  );
}

export default Dashboard;
