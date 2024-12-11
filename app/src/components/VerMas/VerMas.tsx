import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBell } from "@fortawesome/free-solid-svg-icons";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./VerMas.scss";

// Componente VerMas
const VerMas = () => {
  const [aviso, setAviso] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { tipo, id } = useParams(); // Captura tipo y id desde los parámetros de la URL
  const navigate = useNavigate();

  const defaultImage = "https://i.imgur.com/ShRoswn.png";

  // Función para obtener el aviso según el tipo y el id
  const fetchAviso = async (tipo, id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${tipo}/${id}`);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
      }
      const data = await response.json();
      setAviso({
        ...data,
        url_imagen: data.url_imagen || defaultImage,
        image: [data.url_imagen || defaultImage]
      });
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  // Función para eliminar el aviso
  const eliminarAviso = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${tipo}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar: ${response.statusText}`);
      }
      alert("Eliminado correctamente");
      navigate('/');
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  // Función para actualizar el aviso
  const actualizarAviso = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${tipo}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aviso),
      });
      if (!response.ok) {
        throw new Error(`Error al actualizar : ${response.statusText}`);
      }
      const data = await response.json();
      setAviso(data);
      alert("Actualizado correctamente");
      navigate('/');
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  useEffect(() => {
    if (tipo && id) {
      fetchAviso(tipo, id);
    }
  }, [tipo, id]);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const toggleEdit = () => {
    if (isEditing) {
      actualizarAviso();
    }
    setIsEditing(!isEditing);
  };

  const removeImage = (index) => {
    setAviso(prevAviso => ({
      ...prevAviso,
      image: prevAviso.image.filter((_, imgIndex) => imgIndex !== index)
    }));
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
          // Asegúrate de actualizar tanto el campo de imagen como url_imagen si es necesario
          setAviso(prevAviso => ({
            ...prevAviso,
            url_imagen: response.data.url, // Aquí si necesitas establecer el campo de url_imagen
            image: [...prevAviso.image, response.data.url]
          }));
          alert("Imagen subida a URL: " + response.data.url);
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Error al subir la imagen");
      }
    }
  };


  if (!aviso) {
    return <p>Cargando informacion</p>;
  }

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
                      value={tipo === 'pregunta' ? aviso.pregunta : aviso.titulo}
                      onChange={(e) => {
                        const value = e.target.value;
                        setAviso(prevAviso => ({
                          ...prevAviso,
                          [tipo === 'pregunta' ? 'pregunta' : 'titulo']: value,
                        }));
                      }}
                      className="edit-input"
                      autoFocus
                  />
              ) : (
                  <h1>{tipo === 'pregunta' ? aviso.pregunta : aviso.titulo}</h1>
              )}
              <h2>{aviso.fecha}</h2>
            </div>
          </div>
          <div className="detail-medio">
            {isEditing ? (
                <textarea
                    value={tipo === 'pregunta' ? aviso.respuesta : aviso.descripcion}
                    onChange={(e) => {
                      const value = e.target.value;
                      setAviso(prevAviso => ({
                        ...prevAviso,
                        [tipo === 'pregunta' ? 'respuesta' : 'descripcion']: value,
                      }));
                    }}
                    className="edit-textarea"
                />
            ) : (
                <p className="detalle-info-texto">{tipo === 'pregunta' ? aviso.respuesta : aviso.descripcion}</p>
            )}
          </div>
          <div className="detail-button">
            <button className="eliminar-pu" onClick={eliminarAviso}>Eliminar Publicación</button>
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
              backgroundImage: `url(${aviso.image.length > 0 ? aviso.image[0] : defaultImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
        >
          <div className="thumbnail-container">
            {aviso.image.map((img, index) => (
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
                      onChange={handleImageUpload}
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