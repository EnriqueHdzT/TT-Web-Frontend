import "./ClasificarProtocolo.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select"; // Importar React Select

// Opciones de academias con formato para React Select
const academiasOptions = [
  { value: "ISC", label: "ISC" },
  { value: "SCCS", label: "SCCS" },
  { value: "SIC", label: "SIC" },
];

interface ClasificarProtocoloProps {
  pdfClasificar: string;
  titulo: string;
  identificador: string;
  palabraClave: string[]; // Palabras clave como array
  fechaEvaluacion: string;
}

interface FormData {
  academiaselect: { value: string; label: string }[];
}

const ClasificarProtocolo: React.FC<ClasificarProtocoloProps> = ({
  pdfClasificar,
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
  const [formData, setFormData] = useState<FormData>({
    academiaselect: [],
  });

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar y expandir
  };

  const handleSelectChange = (selectedOptions: any, name: "academiaselect") => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions || [], // Manejar null cuando no hay selección
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes añadir la lógica para enviar los datos a la base de datos en el futuro
    console.log("Datos enviados:", formData);
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

            {/* Academias */}
            <div className="academias">
              <form onSubmit={handleSubmit}>
                <div>
                  <label>Selecciona las academias a enviar</label>
                  <Select
                    isMulti
                    name="academiaselect"
                    options={academiasOptions}
                    value={formData.academiaselect}
                    onChange={(selectedOptions) =>
                      handleSelectChange(selectedOptions, "academiaselect")
                    }
                  />
                </div>
                <button type="submit">Enviar</button>
              </form>
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
