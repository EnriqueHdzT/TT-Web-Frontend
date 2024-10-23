import "./MonitoreoProtocolo.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAnglesDown } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";

// Tipo literal para el estatus
type Estatus = "recepcion" | "evaluacion" | "rechazo";

interface MonitoreoProtocoloProps {
  titulo: string;
  fechas: {
    recepcion: string | null; // Almacena la fecha en formato string
    evaluacion: string | null;
    rechazo: string | null;
  };
}

const MonitoreoProtocolo: React.FC<MonitoreoProtocoloProps> = ({ titulo }) => {
  // Estado para manejar los estatus, inicialmente en "recepcion"
  const [estatus, setEstatus] = useState<Estatus>("recepcion");

  // Simulación de recepción de datos de la base de datos
  useEffect(() => {
    // Simulación de una lógica para cambiar el estatus en diferentes momentos

    // Simula que el protocolo pasa a evaluación después de 3 segundos
    const timerEvaluacion = setTimeout(() => {
      setEstatus("evaluacion");
    }, 3000);

    // Simula que el protocolo pasa a rechazo después de 6 segundos
    const timerRechazo = setTimeout(() => {
      setEstatus("rechazo");
    }, 6000);

    // Limpia los temporizadores al desmontar el componente
    return () => {
      clearTimeout(timerEvaluacion);
      clearTimeout(timerRechazo);
    };
  }, []); // Dependencias vacías para ejecutar solo una vez al montar el componente

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a href="/" className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Monitoreo de protocolo
        </div>
      </div>
      <div className="info-container">
        <h1 className="titulo">Título de TT: {titulo}</h1>
        <div className="estatus-contenedor">

          <div className="estatus-columna">

            <div className="estatus-recepcion">
            <div className="icore"><FontAwesomeIcon icon={faAnglesDown} /></div>
              <div className="text-pro">Recepción de protocolo
              <p>fecha</p></div>
            </div>

            <div className="estatus-evaluacion">
            <div className="icore"><FontAwesomeIcon icon={faStar} /></div>
              <div className="text-pro">Evaluación de protocolo
              <p>fecha</p></div>
            </div>

            <div className="estatus-evaluacion">
            <div className="icore"><FontAwesomeIcon icon={faStar} /></div>
              <div className="text-pro">Evaluación de protocolo
              <p>fecha</p></div>
            </div>

            <div className="estatus-rechazo">
            <div className="icore"><FontAwesomeIcon icon={faStar} /></div>
              <div className="text-pro">Rechazo de protocolo
              <p>fecha</p></div>
            </div>
          </div>

          <div className="estatus-columna2">
            <div className="estatus-recepcion">
              <p>{estatus === "recepcion" ? "En proceso" : "Tu protocolo fue recibido exitosamente, ya puedes revisar los detalles del protocolo y su seguimiento "}</p>
            </div>

            <div className="estatus-evaluacion">
              <p>{estatus === "evaluacion" ? "En proceso" : estatus === "rechazo" ? "Pendiente" : "Completado"}</p>
            </div>

            <div className="estatus-evaluacion">
              <p>{estatus === "evaluacion" ? "En proceso" : estatus === "rechazo" ? "Pendiente" : "Completado"}</p>
            </div>

            <div className="estatus-rechazo">
              <p>{estatus === "rechazo" ? "En proceso" : "Pendiente"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoreoProtocolo;
