import "./ValidarProtocolo.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface ValidarProtocoloProps {
  pdfValidar: string;
  titulo: string;
  identificador: string;
  palabraClave: string[]; // Palabras clave como array
  fechaEvaluacion: string;
}

const ValidarProtocolo: React.FC<ValidarProtocoloProps> = ({
  pdfValidar,
  titulo,
  identificador,
  palabraClave = [
    "Innovación",
    "Tecnología",
    "Investigación",
    "Application Development",
    "Artificial Intelligence",
  ], // Palabras clave como array
  fechaEvaluacion,
}) => {
  const [isMinimized, setIsMinimized] = useState(false); // Controla si el panel izquierdo está minimizado

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar y expandir
  };

  const handleValidar = () => {
    console.log("Datos validados");
    // Aquí irá la lógica de validación cuando tengas la base de datos
  };

  const handleRechazar = () => {
    console.log("Datos rechazados");
    // Aquí irá la lógica de rechazo cuando tengas la base de datos
  };

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a href="/" className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Clasificar
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
              <div className="palabra-clave-contenedor">
                {palabraClave.map((palabra, index) => (
                  <p key={index} className="palabra-clave-item">
                    {palabra}
                  </p>
                ))}
              </div>
            </div>

            {/* Validado  o rechazar*/}
            <div className="button-vr">
            <button onClick={handleValidar}>Validar</button>
            <button onClick={handleRechazar}>Rechazar</button>
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
          <iframe src={pdfValidar} title="PDF Viewer" className="pdf-viewer" />
        </div>
      </div>
    </div>
  );
};

export default ValidarProtocolo;
