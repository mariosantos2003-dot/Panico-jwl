import React, { useEffect } from "react";
import { products } from "../../utils/products";
import "./Collection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import BlurText from "../React-Bits/Blur-Text/Blur-Text";

gsap.registerPlugin(ScrollTrigger);

function Collection() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  useEffect(() => {
    const items = gsap.utils.toArray(".collection-item");

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

    // Limpiar ScrollTrigger al desmontar
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="collection-container">
      <BlurText
        text="Collection"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="collection-title"
      />
      <BlurText
        text="Discover What We Make"
        delay={150}
        animateBy="words"
        direction="top"
        onAnimationComplete={handleAnimationComplete}
        className="collection-subtitle"
      />

      <ul className="collection-list">
        {products.map((product) => (
          <li key={product.id} className="collection-item">
            <Link to={`/collection/${product.id}`}>
              <div className="image-container">
                <img
                  loading="lazy"
                  src={product.img}
                  alt={product.nombre}
                  className="collection-image primary"
                />
                <img
                  loading="lazy"
                  src={product.img2}
                  alt={`${product.nombre} hover`}
                  className="collection-image secondary"
                />
              </div>
           
              <BlurText
                text={product.nombre}
                delay={100}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="collection-name"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Collection;
