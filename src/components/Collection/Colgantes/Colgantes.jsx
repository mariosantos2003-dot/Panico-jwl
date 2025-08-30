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
    const items = gsap.utils.toArray(".colgantes-section");

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
     
      <div className="colgantes-header">
        <h1 className="colgantes-title">Colgantes</h1>
      </div>

      {colgantes.map((product, index) => {
        const isEven = index % 2 === 0;
        const isCarousel = (index + 1) % 3 === 0;
        
        if (isCarousel && index < colgantes.length - 1) {
          // Cada tercer producto, crear un carousel con 3 productos
          const carouselProducts = colgantes.slice(index, index + 3);
          return (
            <div key={`carousel-${index}`} className="colgantes-carousel">
              {carouselProducts.map((carouselProduct) => (
                <Link 
                  key={carouselProduct.id} 
                  to={`/collection/${carouselProduct.id}`}
                  className="carousel-item"
                >
                  <img 
                    src={carouselProduct.img} 
                    alt={carouselProduct.nombre}
                    className="carousel-image"
                  />
                  <h3 className="carousel-title">{carouselProduct.nombre}</h3>
                </Link>
              ))}
            </div>
          );
        }

        if (!isCarousel) {
          return (
            <div 
              key={product.id} 
              className={`colgantes-section ${isEven ? 'section-left' : 'section-right'}`}
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
        }

        return null;
      })}
    </div>
  );
}
