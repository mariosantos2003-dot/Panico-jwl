import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../../utils/products";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);

  const username = "panico.jwl"
  const phoneNumber = "34633130711"; // Reemplaza con tu número de WhatsApp (con código de país sin +)
  const message = `Hola buenas, me interesaría esta joya: ${product?.nombre || 'este producto' || product?.img}`
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
  // Diferentes opciones de Instagram
  const igDirectLink = `https://ig.me/m/${username}`;
  const igProfileLink = `https://www.instagram.com/${username}/`;
  const igAppLink = `instagram://user?username=${username}`;
  
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
      </div>

      <div className="product-info">
        <h1 className="product-title">{product.nombre}</h1>

        <div className="description-box">
          <p className="product-description">{product.descripcion}</p>

          <div className="product-meta">
            <div className="meta-row">
              <span className="meta-label">Precio:</span>
              <span className="meta-value">{product.precio ? `€ ${product.precio}` : 'Consultar'}</span>
            </div>
          </div>

          <div className="product-contact">
            <h3>¿Te interesa esta pieza?</h3>
            <p>Contáctanos para más información o para realizar tu pedido</p>
            <div className="contact-buttons">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-button whatsapp">
                💬 Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
  </div>
  );
}

export default ProductDetail;