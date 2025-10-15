import React, { useEffect, useState } from "react";
import { products } from "../../utils/products";
import "./Collection.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import BlurText from "../React-Bits/Blur-Text/Blur-Text";


gsap.registerPlugin(ScrollTrigger);

function Collection() {
  const [columns, setColumns] = useState(3); // Estado para controlar el número de columnas
  const [selectedCategory, setSelectedCategory] = useState('todos'); // Estado para el filtro de categoría
  
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const handleViewChange = (numColumns) => {
    setColumns(numColumns);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory === 'todos' 
    ? products 
    : products.filter(product => product.categoria === selectedCategory);
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
  }, [filteredProducts]); // Dependencia actualizada para re-ejecutar cuando cambien los productos filtrados

  return (
    <div className="collection-container">

      <div className="collection-content">
        <BlurText
          text="Joyas"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="collection-title"
        />



        <div className="collection-display">
          <p>Vista</p>
          <button 
            className={`button-display ${columns === 2 ? 'active' : ''}`}
            onClick={() => handleViewChange(2)}
          >
            2
          </button>
          <p>|</p>
          <button 
            className={`button-display ${columns === 3 ? 'active' : ''}`}
            onClick={() => handleViewChange(3)}
          >
            3
          </button>
          

        </div>

        <div className="collection-filter">
          <button 
            className={selectedCategory === 'todos' ? 'active' : ''}
            onClick={() => handleCategoryFilter('todos')}
          >
            Todos
          </button>
          <p>|</p>
          <button 
            className={selectedCategory === 'anillos' ? 'active' : ''}
            onClick={() => handleCategoryFilter('anillos')}
          >
            Anillos
          </button>
          <p>|</p>
          <button 
            className={selectedCategory === 'colgantes' ? 'active' : ''}
            onClick={() => handleCategoryFilter('colgantes')}
          >
            Colgantes
          </button>
          <p>|</p>
          <button 
            className={selectedCategory === 'pendientes' ? 'active' : ''}
            onClick={() => handleCategoryFilter('pendientes')}
          >
            Pendientes
          </button>
        </div>



        <ul 
          className="collection-list" 
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {filteredProducts.map((product) => (
            <li key={product.id} className="collection-item">
              <Link to={product.id === 11 ? "/custom" : `/collection/${product.id}`}>
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
    </div>
  );
}

export default Collection;
