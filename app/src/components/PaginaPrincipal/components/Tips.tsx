import React, { useState } from "react";
import "./Tips.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus, faBell
} from "@fortawesome/free-solid-svg-icons";

const Tips = () => {
  const [buttons, setButtons] = useState([
    "¿Cómo escoger a tu director?",
    "¿Cómo registrarme a ESCATT?",
    "¿Cómo registrar un protocolo?",
    "Ruta de protocolo",
    "Tip 5",
    "Tip 6",
    "Tip 7",
    "Tip 8",
  ]); // Ejemplo de datos; se cargarían desde la base de datos

  const [currentPage, setCurrentPage] = useState(0);
  const buttonsPerPage = 3; // Número de botones visibles por página

  const addButton = () => {
    const newButton = `${buttons.length + 1}`;
    setButtons([...buttons, newButton]);
  };

  const maxPages = Math.ceil(buttons.length / buttonsPerPage);

  const currentButtons = buttons.slice(
    currentPage * buttonsPerPage,
    (currentPage + 1) * buttonsPerPage
  );

  const nextPage = () => {
    if (currentPage < maxPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="tips-container">
      <div className="tips-top">
        <div className="tips-title">Tips Recientes</div>
        <div className="add-button-container">
          <button className="add-button" onClick={addButton}>
          <FontAwesomeIcon icon={faCirclePlus} />
          </button>
        </div>
      </div>
      <div className="tips-content">
        <div className="button-grid">
          {currentButtons.map((buttonText, index) => (
            <button key={index} className="tip-button">
             <div className="campana">
                <FontAwesomeIcon icon={faBell} />
              </div> <div className="titip">{buttonText}</div>
            </button>
          ))}
        </div>
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 0}>
            Anterior
          </button>
          <button onClick={nextPage} disabled={currentPage === maxPages - 1}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tips;
