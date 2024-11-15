import React, { useState } from "react";
import "./VerMas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const VerMas = () => {
  const vermas = {
    id: 1,
    image: ["https://i.imgur.com/GPTo4e3.png", "https://i.imgur.com/GPTo4e3.png", "https://i.imgur.com/GPTo4e3.png"],
    titua: "Titulo del aviso 1",
    info: "Objetivo. - Diseñar la correspondiente comunicación en red de una serie de estaciones de carga para vehículos eléctricos, para de esta manera disponer de la información en tiempo real para tomar correctas decisiones.",
    tiempo: "8 minutes ago",
  };

  const [selectedImage, setSelectedImage] = useState(null);

  // Función para abrir una imagen en grande
  const openImage = (img) => {
    setSelectedImage(img);
  };

  // Función para cerrar la imagen en grande
  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="aviso-detalle">
      <div className="detalle-info">
        <div className="detail-superior">
          <div className="detalle-bell">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="detalle-titulo">
            <h1>{vermas.titua}</h1>
            <h2>{vermas.tiempo}</h2>
          </div>
        </div>
        <div className="detail-medio">
          <p className="detalle-info-texto">{vermas.info}</p>
        </div>
      </div>

      {/* Miniaturas de imágenes con función de carrusel */}
      <div className="detalle-imagenes">
        <div className="thumbnail-container">
          {vermas.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Aviso Imagen ${index + 1}`}
              className="thumbnail"
              onClick={() => openImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Imagen grande en el centro al seleccionar */}
      {selectedImage && (
        <div className="overlay" onClick={closeImage}>
          <div className="large-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="large-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerMas;
