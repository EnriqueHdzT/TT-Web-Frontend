import "./Avisos.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faChevronLeft,
  faChevronRight,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const Avisos = () => {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: "https://i.imgur.com/GPTo4e3.png?text=Image+1",
      titua: "Titulo del aviso",
      info: "Ultimas noticias que sube la CATT a última hora, por ejemplo algunos percances con el tiempo, nuevas fechas, cambios en el sistema, formularios para subir el protocolo, avisos sobre búsqueda de profesores que les interesa un equipo de trabajo, etc.",
      tiempo: "8 minutes ago",
    },
    {
      id: 2,
      image: "https://i.imgur.com/1TI56nh.png?text=Image+2",
      titua: "Titulo del aviso",
      info: "Información sobre el segundo aviso",
      tiempo: "8 minutes ago",
    },
    {
      id: 3,
      image: "https://i.imgur.com/wXApbD0.png?text=Image+3",
      titua: "Titulo del aviso",
      info: "Información sobre el tercer aviso",
      tiempo: "8 minutes ago",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  // useEffect para hacer el carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambia cada 5 segundos (5000 ms)

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  const agregarAviso = () => {
    const newId = slides.length > 0 ? Math.max(...slides.map((slide) => slide.id)) + 1 : 1;
    const nuevoAviso = {
      id: newId,
      image: "https://i.imgur.com/placeholder.png", // Imagen de ejemplo
      titua: `Titulo del aviso ${newId}`,
      info: `Información del aviso ${newId}`,
      tiempo: "Justo ahora",
    };
    setSlides([...slides, nuevoAviso]);
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
        <div className="caroussel-2">
          <button className="carousel-control-prevc" onClick={prevSlide}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="infoc">
            <div className="fila-superior">
              <div className="campana">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div className="titaviso">{slides[currentIndex].titua}</div>
            </div>
            <div className="fila-media">
              <div className="div-info">{slides[currentIndex].info}</div>
            </div>
            <div className="fila-inferior">
              <div className="div-tiempo">{slides[currentIndex].tiempo}</div>
              <div className="div-vermas">
                <a href="/"><button>Ver más</button></a>
              </div>
            </div>
          </div>
          <div className="imagec">
            <img
              src={slides[currentIndex].image}
              alt={`Slide ${slides[currentIndex].id}`}
            />
          </div>
          <button className="carousel-control-nextc" onClick={nextSlide}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Avisos;
