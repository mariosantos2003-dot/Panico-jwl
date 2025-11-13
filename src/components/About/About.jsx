import React, { useEffect, useRef } from "react";
import "./About.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function About() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const firstSectionRef = useRef(null);
  const carouselRef = useRef(null);
  const secondSectionRef = useRef(null);
  const thirdSectionRef = useRef(null);
  const fourthSectionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    if (!container) return;

    // Animación del header
    gsap.fromTo(headerRef.current, 
      {
        opacity: 0,
        y: -50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la primera sección
    /*
    gsap.fromTo(firstSectionRef.current.querySelector('.first-image'),
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: firstSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(firstSectionRef.current.querySelector('.about-text-first-section'),
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: firstSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
*/
    // Animación del carousel
    gsap.fromTo(carouselRef.current.querySelectorAll('.carousel-image'),
      {
        opacity: 0,
        scale: 0.8,
        y: 50
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la segunda sección
    gsap.fromTo(secondSectionRef.current.querySelector('.second-image'),
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(secondSectionRef.current.querySelector('.about-text-second-section'),
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: secondSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la tercera sección
    gsap.fromTo(thirdSectionRef.current.querySelector('.third-image'),
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(thirdSectionRef.current.querySelector('.about-text-third-section'),
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: thirdSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de la cuarta sección
    gsap.fromTo(fourthSectionRef.current.querySelector('.third-image'),
      {
        opacity: 0,
        x: 100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: fourthSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(fourthSectionRef.current.querySelector('.about-text-third-section'),
      {
        opacity: 0,
        x: -100
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: fourthSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <div className="about-header" ref={headerRef}>
        <h1 className="about-title">SOBRE MI</h1>
      </div>

      <div className="about-first-section" ref={firstSectionRef}>
        <img className="first-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-first-section">
          <h2 className="about-section-title">Inicios</h2>
          <p>
            Joyero con taller en Barcelona. Trabajo con plata y esmalte al fuego, combinando técnicas tradicionales con nuevos enfoques. Utilizo sobretodo texturas orgánicas, evitando formas clásicas y rectas. Aunque el esmalte es una técnica añeja, busco darle un lenguaje moderno, creando piezas únicas adaptadas al ahora.
          </p>
        </div>
      </div>

      <div className="about-image-carousel" ref={carouselRef}>
        <img className="carousel-image" src="/assets/anillo2.webp" alt="Carousel 1" />
        <img className="carousel-image" src="/assets/anillo2.webp" alt="Carousel 2" />
        <img className="carousel-image" src="/assets/anillo2.webp" alt="Carousel 3" />
      </div>

      <div className="about-second-section" ref={secondSectionRef}>
        <img className="second-image" src="/assets/anillo-test.webp" alt="Sobre Mi" />
        <div className="about-text-second-section">
          <h2 className="about-section-title">Esmalte Al Fuego</h2>
          <p>
            El esmalte al fuego es una técnica milenaria que consiste en aplicar una capa de vidrio en polvo (esmalte vítreo) sobre una superficie metálica, generalmente cobre, plata u oro, para luego fundirlas a alta temperatura (750C°-900C°) en un horno/ mufla para esmaltes.
          </p>
        </div>
      </div>

      <div className="about-third-section" ref={thirdSectionRef}>
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

      <div className="about-third-section" ref={fourthSectionRef}>
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
