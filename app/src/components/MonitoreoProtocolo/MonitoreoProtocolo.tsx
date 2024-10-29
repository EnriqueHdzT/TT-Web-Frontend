import "./MonitoreoProtocolo.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAnglesDown, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

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
        <div className="general-contenedor">
          <div className="row-container">
            <div className="box status blue">
              <div className="icore ico-blue">
                <FontAwesomeIcon icon={faAnglesDown} />
              </div>
              <div className="text-pro">
                Recepción de protocolo
                <p>fecha</p>
              </div>
            </div>
            <div className="box info">
            <div className="tx-info">Tu protocolo fue recibido exitosamente, ya puedes revisar los
              detalles del protocolo y su seguimiento</div>
              <a href="/"><button className="blue">Ver evaluación</button></a>
            </div>
          </div>
          <div className="row-container">
            <div className="box status green">
              <div className="icore ico-green">
              <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="text-pro">
                Sinodal 1 - Evaluación de protocolo
                <p>fecha</p>
              </div>
            </div>
            <div className="box info">
            <div className="tx-info">Tu protocolo fue evaluado exitosamente por un sinodal, espera a mayores informes.
            </div>
            <a href="/"><button className="green">Ver evaluación</button></a></div>
          </div>
          <div className="row-container">
            <div className="box status green">
              <div className="icore ico-green">
              <FontAwesomeIcon icon={faCheck} />
              </div>
              <div className="text-pro">
                Sinodal 2 - Evaluación de protocolo
                <p>fecha</p>
              </div>
            </div>
            <div className="box info">
            <div className="tx-info">Tu protocolo fue evaluado exitosamente por un sinodal, espera a mayores informes.
            </div>
            <a href="/"><button className="green">Ver evaluación</button></a>
            </div>
          </div>
          <div className="row-container">
            <div className="box status red">
              <div className="icore ico-red">
              <FontAwesomeIcon icon={faXmark} />
              </div>
              <div className="text-pro">
                Sinodal 3 - Evaluación de protocolo
                <p>fecha</p>
              </div>
            </div>
            <div className="box info">
              <div className="tx-info">Tu protocolo fue rechazado por un sinodal, espera a mayores informes.</div>
              <a href="/"><button className="red">Ver evaluación</button></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoreoProtocolo;
