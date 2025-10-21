import React from "react";
import "./About.css";
import img1 from "../assets/maker1.png";
import img2 from "../assets/maker2.png";
import img3 from "../assets/maker3.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
        <h1>À propos de SUPERSTAFF</h1>
          
          <p>
          Depuis plus de 20 ans, <strong>SUPERSTAFF</strong> réunit des artisans
          staffeurs passionnés et qualifiés, dédiés à l’art du staff. Notre
          mission est d’accompagner nos clients dans leurs projets de création,
          d’amélioration et de rénovation, en apportant des solutions sur mesure
          qui allient tradition et modernité.
        </p>
        <p>
          Présents partout en France métropolitaine, nous mettons un point
          d’honneur à perpétuer un savoir-faire artisanal reconnu, tout en
          respectant vos attentes les plus exigeantes. La qualité étant au cœur
          de nos valeurs, nous sélectionnons avec soin nos partenaires et
          privilégions exclusivement des fournisseurs français, gage de confiance
          et d’authenticité.
        </p>
        <p>
          Choisir <strong>SUPERSTAFF</strong>, c’est opter pour des finitions
          soignées, des délais respectés et l’assurance d’un travail réalisé avec
          passion et professionnalisme.
        </p>



        </div>

       
        <Carousel showArrows={true} autoPlay infiniteLoop>
      <div>
        <img src={img1} alt="1" />
      </div>
      <div>
        <img src={img2} alt="2" />
      </div>
      <div>
        <img src={img3} alt="3" />
      </div>
    </Carousel>
      </div>
      
    </section>
    
  );
}

export default About;
