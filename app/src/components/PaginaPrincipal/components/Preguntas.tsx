import { useState } from "react";
import "./Preguntas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faChevronRight,
  faChevronLeft,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";

const Preguntas = () => {
  // Estado para almacenar los botones actuales
  const [botones, setBotones] = useState([
    "¿Cómo subo un protocolo en ESCATT?",
    "¿Cómo asigno un director?",
    "¿Dónde se encuentra la CATT?",
    "Título de la pregunta",
    "Título de la pregunta",
    "Título de la pregunta",
  ]);
  const [pagina, setPagina] = useState(0);

  const botonesPorPagina = 4; // Número de botones visibles por página
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
    const nuevaOpcion = `${botones.length + 1}`;
    setBotones([...botones, nuevaOpcion]);
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
            src="https://i.imgur.com/ShRoswn.png" // Imagen de relleno
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
              {botonesActuales.map((boton, index) => (
                <button key={index} className="boton-preg">
                  {boton}
                </button>
              ))}
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
              <a href="/">
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
