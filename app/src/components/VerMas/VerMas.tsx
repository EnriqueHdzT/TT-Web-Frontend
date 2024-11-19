import { useState } from "react";
import "./VerMas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const VerMas = () => {
  const vermas = {
    id: 1,
    image: [
      "https://i.imgur.com/wlo1EYZ.png",
      "https://i.imgur.com/lwBkfXj.png",
      "https://i.imgur.com/5bSp2FS.png",
    ],
    titua: "Titulo del aviso 1",
    info: "Objetivo. - Diseñar la correspondiente comunicación en red de una serie de estaciones de carga para vehículos eléctricos, para de esta manera disponer de la información en tiempo real para tomar correctas decisiones.",
    tiempo: "8 minutes ago",
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(vermas.titua);
  const [info, setInfo] = useState(vermas.info);
  const [images, setImages] = useState(vermas.image);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const toggleEdit = () => {
    if (isEditing) {
      console.log("Guardando cambios:", { title, info, images });
    }
    setIsEditing(!isEditing);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, imgIndex) => imgIndex !== index));
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
        <div className="detail-button">
          <button className="eliminar-pu">Eliminar Publicación</button>
          <button
            className={isEditing ? "guardar-publicacion" : "editar-publicacion"}
            onClick={toggleEdit}
          >
            {isEditing ? "Guardar publicación" : "Editar publicación"}
          </button>
        </div>
      </div>

      <div
        className="detalle-imagenes"
        style={{
          backgroundImage: `url(${
            images.length > 0 ? images[0] : "https://i.imgur.com/wlo1EYZ.png"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="thumbnail-container">
          {images.map((img, index) => (
            <div key={index} className="thumbnail-wrapper">
              <img
                src={img}
                alt={`Aviso Imagen ${index + 1}`}
                className="thumbnail"
                onClick={() => openImage(img)}
              />
              {isEditing && (
                <button
                  className="remove-image-btn"
                  onClick={() => removeImage(index)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <>
              <button className="add-image-btn" onClick={() => document.getElementById("fileInput").click()}>
              <FontAwesomeIcon icon={faPlus} />
              </button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="overlay" onClick={closeImage}>
          <div
            className="large-image-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selectedImage} alt="Selected" className="large-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VerMas;
