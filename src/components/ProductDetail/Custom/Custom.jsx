import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "./Custom.css";

function Custom() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: '',
    talla: '',
    material: '',
    precio: '',
    observaciones: ''
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
      nombre: '',
      descripcion: '',
      categoria: '',
      talla: '',
      material: '',
      precio: '',
      observaciones: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear el mensaje para WhatsApp
    const message = `🌟SOLICITUD DE JOYA PERSONALIZADA🌟

📝 Detalles de la joya:

💎 Nombre: ${formData.nombre}
📋 Descripción: ${formData.descripcion}
🏷️ Categoría: ${formData.categoria}
📏 Talla: ${formData.talla}
⚡ Material: ${formData.material}
💰 Precio estimado: ${formData.precio}€
💬 Observaciones adicionales: ${formData.observaciones}

¡Espero tu respuesta para comenzar a crear esta pieza única! ✨`;

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
              <label htmlFor="nombre">Nombre de la joya *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                placeholder="Ej: Anillo de compromiso único"
              />
            </div>

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
                <label htmlFor="categoria">Categoría *</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona categoría</option>
                  <option value="anillos">Anillos</option>
                  <option value="colgantes">Colgantes</option>
                  <option value="pendientes">Pendientes</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

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
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona material</option>
                 
                </select>
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

            <div className="form-group">
              <label htmlFor="observaciones">Observaciones adicionales</label>
              <textarea
                id="observaciones"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleInputChange}
                rows="3"
                placeholder="Cualquier detalle adicional, fecha límite, inspiración..."
              />
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