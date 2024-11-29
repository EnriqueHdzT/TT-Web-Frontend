import "./Avisos.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faChevronLeft, faChevronRight, faBell } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Avisos = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const defaultImage = "https://i.imgur.com/ShRoswn.png";

  // Función para obtener los datos de la base de datos
  const fetchAvisos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/aviso');
      const data = await response.json();

      const filteredData = data.filter(item => item.tipo_contenido === 'aviso');

      const processedData = filteredData.map((item) => ({
        ...item,
        url_imagen: item.url_imagen.replace(/\\/g, '') || defaultImage
      }));

      setSlides(processedData);
    } catch (error) {
      console.error('Error al obtener los avisos:', error);
    }
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // useEffect para hacer el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos (5000 ms)

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [slides]);

  const agregarAviso = () => {
    const newId = slides.length > 0 ? Math.max(...slides.map((slide) => slide.id_contenido)) + 1 : 1;
    const nuevoAviso = {
      id_contenido: newId,
      url_imagen: "https://i.imgur.com/placeholder.png",
      titulo: `Titulo del aviso ${newId}`,
      descripcion: `Información del aviso ${newId}`,
      fecha: "Justo ahora",
    };
    setSlides([...slides, nuevoAviso]);
    navigate('/crear_publicacion?tipo=aviso'); // Navega a la página de crear publicación con el tipo de contenido
  };

  return (
      <div className="avisos-ppg">
        <div className="aviso-top">
          <div className="aviso-title">Avisos Recientes</div>
          <div className="add-button-container">
            <button className="add-button" onClick={agregarAviso}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
        </div>
        <div className="caroussel">
          {slides.length > 0 ? (
              <div className="caroussel-2">
                <button className="carousel-control-prevc" onClick={prevSlide}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="infoc">
                  <div className="fila-superior">
                    <div className="campana">
                      <FontAwesomeIcon icon={faBell} />
                    </div>
                    <div className="titaviso">{slides[currentIndex].titulo}</div>
                  </div>
                  <div className="fila-media">
                    <div className="div-info">{slides[currentIndex].descripcion}</div>
                  </div>
                  <div className="fila-inferior">
                    <div className="div-tiempo">{slides[currentIndex].fecha}</div>
                    <div className="div-vermas">
                      <button onClick={() => navigate(`/vermas/aviso/${slides[currentIndex].id_contenido}`)}>Ver más</button>
                    </div>
                  </div>
                </div>
                <div className="imagec">
                  <img
                      src={slides[currentIndex].url_imagen || defaultImage}
                      alt={`Slide ${slides[currentIndex].id}`}
                  />
                </div>
                <button className="carousel-control-nextc" onClick={nextSlide}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
          ) : (
              <p>No hay avisos</p>
          )}
        </div>
      </div>
  );
};

export default Avisos;