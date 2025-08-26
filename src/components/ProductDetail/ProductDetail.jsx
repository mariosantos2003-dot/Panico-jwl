import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../utils/products";
import "./ProductDetail.css";
import ModelViewer from "../ModelViewer/ModelViewer";

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const username = "panico.jwl"
  const message = `Hola buenas, me interesaria esta joya: ${product?.nombre || 'este producto'}`
  const igLink = `https://ig.me/m/${username}?text=${encodeURIComponent(message)}`;
  const [showModel, setShowModel] = useState(false);

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
          Si estás interesado en este producto, no dudes en enviarnos un mensaje a través de Instagram:
        </p>
        <a href={igLink} target="_blank" rel="noopener noreferrer">
          Enviar mensaje
        </a>
      </div>
    </div>
  );
}

export default ProductDetail;
