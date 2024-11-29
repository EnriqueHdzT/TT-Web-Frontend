import React, { useState, useEffect } from "react";
import "./Preguntas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faChevronRight,
  faChevronLeft,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Preguntas = () => {
  const [botones, setBotones] = useState([]);
  const [pagina, setPagina] = useState(0);
  const navigate = useNavigate();

  const botonesPorPagina = 4;

  // Función para obtener los datos de la base de datos
  const fetchPreguntas = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/pregunta');
      const data = await response.json();

      const filteredData = data.filter(item => item.tipo_contenido === 'pregunta');
      setBotones(filteredData); // Guarda el dato completo

    } catch (error) {
      console.error('Error al obtener las preguntas:', error);
    }
  };

  useEffect(() => {
    fetchPreguntas();
  }, []);

  const maxPaginas = Math.ceil(botones.length / botonesPorPagina);

  const botonesActuales = botones.slice(
      pagina * botonesPorPagina,
      (pagina + 1) * botonesPorPagina
  );

  const siguientePagina = () => {
    if (pagina < maxPaginas - 1) setPagina(pagina + 1);
  };

  const paginaAnterior = () => {
    if (pagina > 0) setPagina(pagina - 1);
  };

  const agregarBoton = () => {
    const nuevaOpcion = { id_contenido: botones.length + 1, pregunta: `Pregunta ${botones.length + 1}`, tipo_contenido: 'pregunta' };;
    setBotones([...botones, nuevaOpcion]);
    navigate('/crear_publicacion?tipo=pregunta'); // Navega a la página de crear publicación con el tipo de contenido
  };

  return (
      <div className="preg-container">
        <div className="preg-top">
          <div className="preg-title">Preguntas y Respuestas</div>
          <div className="add-button-container">
            <button className="add-button" onClick={agregarBoton}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
        </div>
        <div className="preg-content">
          <div className="preg-iz">
            <img
                src="https://i.imgur.com/ShRoswn.png"
                alt="Imagen de ejemplo"
                className="imagen-preg-iz"
            />
          </div>
          <div className="preg-der">
            <div className="top-p">
              <button
                  className="buuton-preg"
                  onClick={paginaAnterior}
                  disabled={pagina === 0}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <div className="botones-container">
                {botones.length === 0 ? (
                    <p>No hay preguntas</p>
                ) : (
                    botonesActuales.map((boton, index) => (
                        <button
                            key={index}
                            className="boton-preg"
                            onClick={() => navigate(`/vermas/pregunta/${boton.id_contenido}`)} // Redirige con tipo e id
                        >
                          {boton.pregunta}
                        </button>
                    ))
                )}
              </div>
              <button
                  className="buuton-preg"
                  onClick={siguientePagina}
                  disabled={pagina === maxPaginas - 1}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
            <div className="bottom-p">
              <div className="avip">
                <div className="texp">
                  Si tienes una pregunta y no se encuentra en el listado te
                  invitamos a enviarnos un mensaje en el buzón de ayuda.
                </div>
                <a href="/buzon">
                  <button className="imgp">
                    <FontAwesomeIcon icon={faInbox} />
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Preguntas;