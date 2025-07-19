import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Mi</h1>
      </div>
      
      <div className="about-first-section">
        <img className="first-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-first-section">
          <h2 className="about-section-title">Inicios</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="about-image-carousel">
        <img className="carousel-image" src="/assets/anillo2.webp" alt="Carousel 1" />
        <img className="carousel-image" src="/assets/anillo2.webp" alt="Carousel 2" />
        <img className="carousel-image" src="/assets/anillo2.webp" alt="Carousel 3" />
      </div>

      <div className="about-second-section">
        <img className="second-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-second-section">
          <h2 className="about-section-title">Mi Evolución</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="about-third-section">
        <img className="third-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-third-section">
          <h2 className="about-section-title">Mi Presente</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
