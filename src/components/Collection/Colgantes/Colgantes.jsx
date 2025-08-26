import React, { useEffect } from "react";
import { products } from "../../../utils/products";
import "./Colgantes.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Beams from "../../React-Bits/Beams/Beams";

gsap.registerPlugin(ScrollTrigger);

export default function Colgantes() {
  useEffect(() => {
    const items = gsap.utils.toArray(".colgantes-item");

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

  const colgantes = products.filter(
    (product) => product.categoria === "colgantes"
  );

  return (
    <div className="colgantes-container">
      <div className="colgantes-content">
        <h1 className="colgantes-title">Colgantes</h1>
 
        <ul className="colgantes-list">
          {colgantes.map((product) => (
            <li key={product.id} className="colgantes-item">
              <Link to={`/product/${product.id}`}>
                <div className="image-container">
                  <img
                    src={product.img}
                    alt={product.nombre}
                    className="colgantes-image primary"
                  />
                  <img
                    src={product.img2}
                    alt={product.nombre}
                    className="colgantes-image secondary"
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
