const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("./models/user"); // lowercase to match user.js
const path = require("path");
const imagesRouter = require("./routes/images");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Constants ---
const ADMIN_EMAIL = "sas.superstaff@gmail.com";
//--------------------------------//////////
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required." });

  try {
    await transporter.sendMail({
      from: email,
      to: ADMIN_EMAIL,
      subject: `Contact from ${name}`,
      text: message,
    });
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
  } catch (error) {
    console.error("Email sending failed:", error);
    res
      .status(500)
      .json({ error: "Failed to send email.", details: error.message });
  }
});

// --- Nodemailer transporter (shared for all routes) ---
// --- Nodemailer transporter ---
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ADMIN_EMAIL,
    pass: "mnre hfxq igai cviz", // Your Gmail App Password
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Nodemailer error:", error);
  } else {
    console.log("✅ Nodemailer is ready to send emails");
  }
});

// ✅ === CONTACT FORM ===
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, postalCode, objectif, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Nom, e-mail et message sont obligatoires.",
    });
  }

  try {
    const emailBody = `
      💬 Nouveau message reçu depuis le formulaire :

      👤 Nom complet : ${name}
      📧 E-mail : ${email}
      📞 Numéro de téléphone : ${phone || "Non renseigné"}
      📮 Code postal : ${postalCode || "Non renseigné"}
      🎯 Objectif : ${objectif || "Non renseigné"}

      📝 Message :
      ${message}
    `;

    await transporter.sendMail({
      from: `"Formulaire SuperStaff" <${ADMIN_EMAIL}>`,
      replyTo: email,
      to: ADMIN_EMAIL,
      subject: `📩 Nouveau contact de ${name}`,
      text: emailBody,
    });

    res
      .status(200)
      .json({ success: true, message: "✅ Email envoyé avec succès" });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({
      error: "Échec de l'envoi de l'email.",
      details: error.message,
    });
  }
});

// === SIGNUP ===
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ error: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful." });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// === LOGIN ===
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password." });
    }

    const isAdmin = email === ADMIN_EMAIL;
    res.status(200).json({ message: "Login successful.", isAdmin });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// === FORGOT PASSWORD ===
app.post("/api/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: email,
      subject: "Reset Your Password",
      text: `Hello,\n\nHere is your password reset link (dummy): http://localhost:3000/reset\n\nBest regards`,
    });

    res.status(200).json({ message: "Reset link sent." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ error: "Failed to send reset link." });
  }
});

// === CONNECT TO MONGODB AND START SERVER ===
mongoose
  .connect(
    "mongodb+srv://raniajebnouni1:dCgcsXFqk4v82W7E@gypsum.fvdhrlo.mongodb.net/?retryWrites=true&w=majority&appName=gypsum",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("✅ MongoDB Atlas connected");
    app.listen(5000, () =>
      console.log("Backend running on http://localhost:5000")
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/images", imagesRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log("🚀 Server running on port", process.env.PORT)
    );
  })
  .catch((err) => console.error(err));

// Serve React frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
