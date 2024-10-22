import "./ClasificarProtocolo.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface ClasificarProtocoloProps {
  pdfClasificar: string;
  titulo: string;
  identificador: string;
  palabraClave: string[]; // Palabras clave como array
  fechaEvaluacion: string;
}

const ClasificarProtocolo: React.FC<ClasificarProtocoloProps> = ({
  pdfClasificar,
  titulo,
  identificador,
  palabraClave = ["Innovación", "Tecnología", "Investigación"], // Palabras clave como array
  fechaEvaluacion,
}) => {
  const [isMinimized, setIsMinimized] = useState(false); // Controla si el panel izquierdo está minimizado

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar y expandir
  };

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a href="/" className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Evaluar
        </div>
      </div>
      <div className="split-container">
        {/* Sección izquierda */}
        <div className={`left-panel ${isMinimized ? "minimized" : ""}`}>
          <div className="info-container">
            <h1 className="titulo">Título de TT: {titulo}</h1>
            <p className="identificador">
              Núm. de Registro de TT: {identificador}
            </p>
            <p className="fecha-evaluacion">
              Fecha de Evaluación: {fechaEvaluacion}
            </p>

            {/* Palabras Clave */}
            <div className="palabras-clave">
              Palabras Clave:
              <ul>
               <li>{palabraClave}</li>
              </ul>
            </div>
          </div>
        </div>
        <button className="minimize-button" onClick={toggleMinimize}>
          <FontAwesomeIcon
            icon={isMinimized ? faChevronRight : faChevronLeft}
          />
        </button>
        {/* Sección derecha con el PDF */}
        <div className={`pdf-panel ${isMinimized ? "full-width" : ""}`}>
          <iframe
            src={pdfClasificar}
            title="PDF Viewer"
            className="pdf-viewer"
          />
        </div>
      </div>
    </div>
  );
};

export default ClasificarProtocolo;
