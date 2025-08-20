import React, { useEffect } from "react";
import { products } from "../../../utils/products";
import "./Pendientes.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Beams from "../../React-Bits/Beams/Beams";

gsap.registerPlugin(ScrollTrigger);

export default function Pendientes() {
  useEffect(() => {
    const items = gsap.utils.toArray(".pendientes-item");

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

  const pendientes = products.filter(
    (product) => product.categoria === "pendientes"
  );

  return (
    <div className="pendientes-container">
      <div className="pendientes-content">
        <h1 className="pendientes-title">Pendientes</h1>
        <h2 className="pendientes-subtitle">
          Diseños que capturan la luz y enmarcan tu rostro, creados para realzar
          tu belleza con un toque de distinción.
        </h2>
        <ul className="pendientes-list">
          {pendientes.map((product) => (
            <li key={product.id} className="pendientes-item">
              <Link to={`/product/${product.id}`}>
                <div className="image-container">
                  <img
                    src={product.img}
                    alt={product.nombre}
                    className="pendientes-image primary"
                  />
                  <img
                    src={product.img2}
                    alt={product.nombre}
                    className="pendientes-image secondary"
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
