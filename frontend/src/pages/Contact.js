import React, { useState } from "react"; 
import axios from "axios";
import "./Contact.css";
import contactImg from "../assets/heropic.png";

function Contact() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    postalCode: "", 
    objectif: "", 
    message: "" 
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("Sending...");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", form);
      if (res.data.success) {
        setStatus("✅ Message sent!");
        setForm({ name: "", email: "", phone: "", postalCode: "", objectif: "", message: "" });
      } else {
        setStatus("❌ Failed to send message.");
      }
    } catch (err) {
      setStatus("⚠️ Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-card">
        <div className="contact-image">
          <img src={contactImg} alt="Gypsum decor" />
        </div>

        <div className="contact-form-area">
          <h1>Contactez-moi</h1>
          <p>Donnons vie à votre idée de design en gypse.</p>

          <form onSubmit={handleSubmit}>
            <label>
             Nom
              <input
                type="text"
                name="name"
                placeholder="le nom complet"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
            E-mail
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
            Numéro de téléphone
              <input
                type="tel"
                name="phone"
                placeholder="+216 12 345 678"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>

            <label>
            Code postal
              <input
                type="text"
                name="postalCode"
                placeholder="e.g. 75000"
                value={form.postalCode}
                onChange={handleChange}
                required
              />
            </label>

            <label>
            objectif
              <input
                type="text"
                name="objectif"
                placeholder="Votre objectif"
                value={form.objectif}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message
              <textarea
                name="message"
                placeholder="Écrivez votre message ici..."
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" disabled={loading}>
              {loading ? "En cours d’envoi..." : "Envoyer "}
            </button>
          </form>

          {status && <p className="status">{status}</p>}
        </div>
      </div>
    </section>
  );
}

export default Contact;
