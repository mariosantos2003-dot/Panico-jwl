import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Custom.css";

function Custom() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    descripcion: '',
    talla: '',
    material: '',
    precio: '',
  });

  useEffect(() => {
    if (!showForm) {
      // Animación de entrada para el contenedor
      gsap.fromTo(".custom-content",
        {
          opacity: 0,
          scale: 0.8,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out"
        }
      );

      // Animación para el título
      gsap.fromTo(".custom-title",
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        }
      );

      // Animación para la descripción
      gsap.fromTo(".custom-description",
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out"
        }
      );

      // Animación para el botón
      gsap.fromTo(".custom-contact-btn",
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 0.7,
          ease: "back.out(1.7)"
        }
      );
    } else {
      // Animación para el formulario
      gsap.fromTo(".custom-form",
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        }
      );
    }
  }, [showForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleBackToInfo = () => {
    setShowForm(false);
    setFormData({
      descripcion: '',
      talla: '',
      material: '',
      precio: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el mensaje para WhatsApp
    const message = `SOLICITUD DE JOYA PERSONALIZADA


 Descripción: ${formData.descripcion}
 Talla: ${formData.talla}
 Material: ${formData.material}
 Precio estimado: ${formData.precio}€


`;

    // Número de WhatsApp (reemplaza con el número real)
    const phoneNumber = "34633130711"; // 
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);

    // Crear la URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="custom-container">
      <div className="custom-content">
        {!showForm ? (
          <>
            <h1 className="custom-title">Joya Personalizada</h1>
            <p className="custom-description">
              Crea una pieza única y especial diseñada exclusivamente para ti.
              Nuestro equipo de artesanos trabajará contigo para dar vida a tus ideas
              y crear una joya que refleje tu personalidad y estilo único.
            </p>
            <p className="custom-description">
              Desde anillos de compromiso únicos hasta colgantes con significado especial,
              cada pieza es cuidadosamente elaborada con los mejores materiales y
              la máxima atención al detalle.
            </p>
            <button className="custom-contact-btn" onClick={handleShowForm}>
              Crear Joya
            </button>
          </>
        ) : (
          <form className="custom-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Diseña tu Joya Personalizada</h2>


            <div className="form-group">
              <label htmlFor="descripcion">Descripción detallada *</label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Describe tu idea: estilo, forma, detalles especiales..."
              />
            </div>

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="talla">Talla (si aplica)</label>
                <input
                  type="text"
                  id="talla"
                  name="talla"
                  value={formData.talla}
                  onChange={handleInputChange}
                  placeholder="Ej: 16, M, L..."
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="material">Material preferido *</label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  placeholder="Ej: Diamantes, Oro, Plata..."
                  required

                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Presupuesto estimado (€)</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  placeholder="Ej: 200"
                  min="0"
                />
              </div>
            </div>


            <div className="form-buttons">
              <button type="button" className="btn-secondary" onClick={handleBackToInfo}>
                Volver
              </button>
              <button type="submit" className="btn-primary">
                Enviar Solicitud por WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Custom;