import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; // Importa useNavigate y useLocation
import "./CrearPublicacion.scss";

const CrearPublicacion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [respuesta, setRespuesta] = useState(""); // Estado para la respuesta
  const [selectedImages, setSelectedImages] = useState([]);
  const [tipoContenido, setTipoContenido] = useState(""); // Estado para el tipo de contenido
  const navigate = useNavigate(); // Usa el hook useNavigate
  const location = useLocation(); // Usa useLocation para obtener la URL actual

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tipo = queryParams.get("tipo") || "aviso";
    setTipoContenido(tipo);
  }, [location.search]);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (tipoContenido === "pregunta") {
        formData.append("pregunta", title);
        formData.append("respuesta", respuesta);
      } else {
        formData.append("titulo", title);
        formData.append("descripcion", content);
      }
      formData.append("tipo_contenido", tipoContenido);
      if (selectedImages.length > 0) {
        formData.append("url_imagen", selectedImages[0]); // Usa la URL de la imagen
      }
      formData.append("fecha", new Date().toISOString().split("T")[0]);

      const response = await axios.post(`http://127.0.0.1:8000/api/${tipoContenido}crear`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Publicación guardada con éxito:", response.data);
      alert("Publicación guardada con éxito!");
      navigate("/"); // Navegar a la página raíz
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
      alert("Error al guardar la publicación");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("imagen", file);

        const response = await axios.post("http://127.0.0.1:8000/api/subir-imagen", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (response.data.url) {
          setSelectedImages((prev) => [...prev, response.data.url]);
          alert("Imagen subida a URL: " + response.data.url);
        } else if (response.data.error) {
          console.error("Error del servidor:", response.data.error);
          alert("Error del servidor: " + response.data.error);
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen");
      }
    }
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="publi-detalle">
      <div className="detalle-publi">
        <div className="detail-psuperior">
          <h1>{tipoContenido === "pregunta" ? "Pregunta" : "Título de publicación"}</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="edit-inputp"
            placeholder={tipoContenido === "pregunta" ? "Escribe la pregunta aquí" : "Escribe el título aquí"}
          />
        </div>

        {tipoContenido === "pregunta" ? (
          <div className="detail-pmedio">
            <h1>Respuesta</h1>
            <textarea
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              className="edit-publi"
              placeholder="Escribe la respuesta aquí"
            />
          </div>
        ) : (
          <div className="detail-pmedio">
            <h1>Contenido</h1>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="edit-publi"
              placeholder="Escribe el contenido aquí"
            />
          </div>
        )}

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
                <img src={image} alt="Uploaded" className="uploaded-image" />
                <div className="cont-pi">{image.name}</div>
                <button onClick={() => handleRemoveImage(index)} className="quitar-img">
                  Quitar
                </button>
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
          <button onClick={triggerFileInput} className="subir-nimg">
            Subir nueva imagen
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearPublicacion;
