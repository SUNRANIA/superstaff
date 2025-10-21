import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import "./Service.css";

const services = [
  {
    id: 1,
    title: "Apartement Haussmanniens",
    description:
      "Des embellissements préservant leur style classique et le charme de l’ancien.",
    image: require("../assets/immeuble2.jpg"),
    link: "/Immeuble",
  },
  {
    id: 2,
    title: "Restauration",
    description: "Préservation et restauration des moulures et plafonds anciens.",
    image: require("../assets/restauration1.1.jpg"),
    link: "/Restauration",
  },
  {
    id: 3,
    title: "Appartement Contemporains",
    description:
      "Décorations modernes et raffinées pour appartements contemporains.",
    image: require("../assets/appartement6.jpg"),
    link: "/Appartement",
  },
  {
    id: 4,
    title: "Professionel",
    description:
      "Décorations en staff élégantes pour vos espaces professionnels.",
    image: require("../assets/professionel2.jpg"),
    link: "/Professionel",
  },
  {
    id: 5,
    title: "Facades",
    description: "Ornements et rénovations pour sublimer vos façades.",
    image: require("../assets/facades2.jpg"),
    link: "/Facades",
  },
  {
    id: 6,
    title: "Fabrication Sur Mesure",
    description:
      "Éléments décoratifs en staff conçus sur mesure selon vos besoins.",
    image: require("../assets/mesure1.jpg"),
    link: "/Fabrication",
  },
];

function Service() {
  const controls = useAnimation();
  const speedRef = useRef(10); // vitesse automatique lente
  const positionRef = useRef(0);

  useEffect(() => {
    let frame;
    const move = () => {
      positionRef.current -= speedRef.current / 100;
      controls.start({
        x: `${positionRef.current}%`,
        transition: { ease: "linear", duration: 0 },
      });
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);

    // gestion des touches clavier
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        speedRef.current = 40; // plus rapide quand on clique
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        speedRef.current = 10; // revient lentement
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [controls]);

  return (
    <section className="services" id="services">
      <h2 className="services-title">Nos services Gypsum</h2>

      <div className="carousel-wrapper">
        <motion.div className="services-carousel" animate={controls}>
          {[...services, ...services].map((item, index) => (
            <Link key={index} to={item.link} className="service-card-link">
              <div className="service-card">
                <img src={item.image} alt={item.title} className="service-img" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="arrow-link">
                  <FaArrowRight size={15} />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Service;
