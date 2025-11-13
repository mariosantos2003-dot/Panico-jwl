import React, { useEffect } from "react";
import { products } from "../../../utils/products";
import "./Anillos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function Anillos() {
  useEffect(() => {
    const sections = gsap.utils.toArray(".anillos-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, []);

  const anillos = products.filter((product) => product.categoria === "anillos");

  return (
    <div className="anillos-container">
      <div className="anillos-header">
        <h1 className="anillos-title">ANILLOS</h1>
      </div>

      {anillos.map((product, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div 
            key={product.id} 
            className={`anillos-section ${isEven ? 'section-left' : 'section-right'}`}
          >
            <Link to={`/collection/${product.id}`} className="product-image-link">
              <img 
                src={product.img} 
                alt={product.nombre}
                className="section-image"
              />
            </Link>
            <div className="product-info-section">
              <h2 className="product-section-title">{product.nombre}</h2>
              <p className="product-description">{product.descripcion}</p>
              <Link 
                to={`/collection/${product.id}`}
                className="view-product-btn"
              >
                Ver Producto
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
