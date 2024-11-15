import React, { useState } from "react";
import "./VerMas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const VerMas = () => {
  const vermas = {
    id: 1,
    image: [
      "https://i.imgur.com/wlo1EYZ.png",
      "https://i.imgur.com/lwBkfXj.png",
      "https://i.imgur.com/5bSp2FS.png"
    ],
    titua: "Titulo del aviso 1",
    info: "Objetivo. - Diseñar la correspondiente comunicación en red de una serie de estaciones de carga para vehículos eléctricos, para de esta manera disponer de la información en tiempo real para tomar correctas decisiones.",
    tiempo: "8 minutes ago",
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(vermas.titua);
  const [info, setInfo] = useState(vermas.info);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Guardando cambios:", { title, info });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="aviso-detalle">
      <div className="detalle-info">
        <div className="detail-superior">
          <div className="detalle-bell">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="detalle-titulo">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={isEditing ? "edit-input" : ""}
                autoFocus
              />
            ) : (
              <h1>{title}</h1>
            )}
            <h2>{vermas.tiempo}</h2>
          </div>
        </div>
        <div className="detail-medio">
          {isEditing ? (
            <textarea
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              className={isEditing ? "edit-textarea" : ""}
            />
          ) : (
            <p className="detalle-info-texto">{info}</p>
          )}
        </div>

        <button className={isEditing ? "guardar-publicacion" : "editar-publicacion"} onClick={toggleEdit}>
          {isEditing ? "Guardar publicación" : "Editar publicación"}
        </button>
        <button className="eliminar">
          Eliminar Publicación
        </button>
      </div>

      <div
        className="detalle-imagenes"
        style={{
          backgroundImage: `url(${
            vermas.image.length > 0 ? vermas.image[0] : "https://i.imgur.com/wlo1EYZ.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
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
