import React, { useEffect } from "react";
import { products } from "../../../utils/products";
import "./Anillos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Beams from "../../React-Bits/Beams/Beams";

gsap.registerPlugin(ScrollTrigger);

export default function Anillos() {
  useEffect(() => {
    const items = gsap.utils.toArray(".anillos-item");

    items.forEach((item) => {
      gsap.fromTo(
        item,
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
            trigger: item,
            start: "top 90%",
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
      <div className="anillos-content">
        <h1 className="anillos-title">Anillos</h1>
        <h2 className="anillos-subtitle">
          Hechos a mano con materiales de alta calidad, nuestros anillos son el
          complemento perfecto para cualquier ocasión.
        </h2>
        <ul className="anillos-list">
          {anillos.map((product) => (
            <li key={product.id} className="anillos-item">
              <Link to={`/product/${product.id}`}>
                <div className="image-container">
                  <img
                    src={product.img}
                    alt={product.nombre}
                    className="anillos-image primary"
                  />
                  <img
                    src={product.img2}
                    alt={product.nombre}
                    className="anillos-image secondary"
                  />
                </div>
                <h3>{product.nombre}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
