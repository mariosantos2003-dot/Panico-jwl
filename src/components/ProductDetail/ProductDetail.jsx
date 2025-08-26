import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../utils/products";
import "./ProductDetail.css";
import ModelViewer from "../ModelViewer/ModelViewer";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const username = "panico.jwl"
  const phoneNumber = "34123456789"; // Reemplaza con tu número de WhatsApp (con código de país sin +)
  const message = `Hola buenas, me interesaría esta joya: ${product?.nombre || 'este producto'}`
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Diferentes opciones de Instagram
  const igDirectLink = `https://ig.me/m/${username}`;
  const igProfileLink = `https://www.instagram.com/${username}/`;
  const igAppLink = `instagram://user?username=${username}`;
  
  const [showModel, setShowModel] = useState(false);

  // Función para manejar el clic de Instagram
  const handleInstagramClick = () => {
    // Primero intenta abrir la app de Instagram
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // En móvil, intenta abrir la app primero
      window.location.href = igAppLink;
      // Si no funciona, abre en navegador después de un breve delay
      setTimeout(() => {
        window.open(igDirectLink, '_blank');
      }, 1000);
    } else {
      // En desktop, abre directamente el enlace de mensajes
      window.open(igDirectLink, '_blank');
    }
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-image-container">
        <img src={product.img} alt={product.nombre} />
        <button
          className="view-button"
          onClick={() => setShowModel(!showModel)}
        >
          {showModel ? "Ocultar 3D" : "Ver en 3D"}
        </button>
        {showModel && <ModelViewer modelPath={product.model} onClose={() => setShowModel(false)} />}
      </div>

      <div className="product-info">
        <h1 className="product-title">{product.nombre}</h1>
        <p className="product-description">{product.descripcion}</p>
      </div>

      <div className="product-contact">
        <h2>Contacto</h2>
        <p>
          Si estás interesado en este producto, contáctanos:
        </p>
        <div className="contact-buttons">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-button whatsapp">
            WhatsApp
          </a>
          <div className="instagram-option">
            <h1>
              Opcion 2
            </h1>
            <button 
              className="contact-button copy-message"
              onClick={() => {
                navigator.clipboard.writeText(message);
                alert('¡Mensaje copiado! Ahora haz clic en Instagram DM para pegarlo.');
              }}
            >
            Copiar mensaje
            </button>
            <button 
              onClick={handleInstagramClick}
              className="contact-button instagram"
            >
              Envianos un Mensaje por Instagram
            </button>
          </div>
        </div>
     
      </div>
    </div>
  );
}

export default ProductDetail;