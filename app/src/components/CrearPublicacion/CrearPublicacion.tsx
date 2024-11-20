import React, { useState } from "react";
import "./CrearPublicacion.scss";

const CrearPublicacion = () => {
  // Estados para almacenar los datos de entrada del título, contenido y las imágenes seleccionadas
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSave = () => {
    // Simulación de guardado en la base de datos
    console.log("Guardando publicación:", { title, content, selectedImages });
    alert("Publicación guardada con éxito!");
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files); // Convertimos la lista de archivos a un array
    setSelectedImages((prevImages) => [...prevImages, ...files]); // Agregamos las nuevas imágenes
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    );
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="publi-detalle">
      <div className="detalle-publi">
        <div className="detail-psuperior">
          <h1>Título de publicaciónn</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-inputp"
            placeholder="Escribe el título aquí"
          />
        </div>

        <div className="detail-pmedio">
          <h1>Contenido</h1>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="edit-publi"
            placeholder="Escribe el contenido aquí"
          />
        </div>
        
        <div className="detail-pbutton">
          <button className="guardar-pu" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>

      <div className="publi-imagenes">
        <div className="subir-imas">
          {selectedImages.length > 0 ? (
            selectedImages.map((image, index) => (
              <div key={index} className="image-info">
                <div className="cont-pi">{image.name}</div>
                <button onClick={() => handleRemoveImage(index)} className="quitar-img">Quitar</button>
              </div>
            ))
          ) : (
            <span>No se han seleccionado imágenes.</span>
          )}
        </div>
        <div className="boton-subirimg">
          <input
            type="file"
            accept="image/*"
            multiple // Permitir múltiples archivos
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="file-upload"
          />
          <button onClick={triggerFileInput} className="subir-nimg">Subir nueva imagen</button>
        </div>
      </div>
    </div>
  );
};

export default CrearPublicacion;
