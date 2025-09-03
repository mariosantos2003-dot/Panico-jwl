import React from "react";
import "./About.css";
import Beams from "../React-Bits/Beams/Beams";

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
            Joyero con taller en Barcelona. Trabajo con plata y esmalte al fuego, combinando técnicas tradicionales con nuevos enfoques. Utilizo sobretodo texturas orgánicas, evitando formas clásicas y rectas. Aunque el esmalte es una técnica añeja, busco darle un lenguaje moderno, creando piezas únicas adaptadas al ahora.
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
          <h2 className="about-section-title">Esmalte Al Fuego</h2>
          <p>
            El esmalte al fuego es una técnica milenaria que consiste en aplicar una capa de vidrio en polvo (esmalte vítreo) sobre una superficie metálica, generalmente cobre, plata u oro, para luego fundirlas a alta temperatura (750C°-900C°) en un horno/ mufla para esmaltes.
          </p>
        </div>
      </div>

      <div className="about-third-section">
        <img className="third-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-third-section">
          <h2 className="about-section-title">¿En qué consiste el proceso?</h2>
          <p>
            Preparación: Se limpia y acondiciona la superficie metálica para asegurar una buena adherencia del esmalte.

            Aplicación: El esmalte en polvo se aplica sobre la pieza mediante el tamizado o el pincelado.

            Cocción: La pieza se hornea a temperaturas que oscilan entre 750 °C y 900 °C. En este punto, el esmalte se vitrifica y se adhiere al metal.

          </p>
        </div>
      </div>
            <div className="about-third-section">
        <img className="third-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-third-section">
          <h2 className="about-section-title">¿Qué son los Colores Vitrificables?</h2>
          <p>
          Los colores vitrificables son pigmentos en polvo muy fino que contienen vidrio molido y óxidos metálicos. Al cocerse, se funden ligeramente con la base esmaltada, creando detalles finos y coloridos. Son idóneos para crear dibujos sobre el esmalte.

          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
