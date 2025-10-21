import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Forgot from "./pages/Forgot";
import Immeuble from "./components/Immeuble";
import Professionel from "./components/Professionel";
import Restauration from "./components/Restauration";
import Facades from "./components/Facades";
import Appartement from "./components/Appartement";
import Fabrication from "./components/Fabrication";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin flag from localStorage on app load
  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin");
    setIsAdmin(adminFlag === "true");
  }, []);

  return (
    <Router>
      <Navbar isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<AuthPage setIsAdmin={setIsAdmin} />} />
        <Route path="/forgot" element={<Forgot />} />

        {/* Protected Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Other pages */}
        <Route path="/immeuble" element={<Immeuble />} />
        <Route path="/professionel" element={<Professionel />} />
        <Route path="/restauration" element={<Restauration />} />
        <Route path="/appartement" element={<Appartement />} />
        <Route path="/fabrication" element={<Fabrication />} />
        <Route path="/facades" element={<Facades />} />
      </Routes>
    </Router>
  );
};

export default App;
