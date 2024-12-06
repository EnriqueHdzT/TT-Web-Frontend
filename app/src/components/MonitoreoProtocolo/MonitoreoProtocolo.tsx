// MonitoreoProtocolo.tsx
import "./MonitoreoProtocolo.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faAnglesDown, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from 'react-router-dom';

type Estatus = "recepcion" | "aceptado" | "rechazo" | "espera";

interface MonitoreoData {
  id: number;
  nombreproyecto: string;
  sinodal1es: string;
  estatussin1: Estatus;
  fechasinodal1: string;
  observacionsino1: string;
  sinodal2es: string;
  estatussin2: Estatus;
  fechasinodal2: string;
  observacionsino2: string;
  sinodal3es: string;
  estatussin3: Estatus;
  fechasinodal3: string;
  observacionsino3: string;
}

const MonitoreoProtocolo: React.FC = () => {
  const [monitoreoData, setMonitoreoData] = useState<MonitoreoData | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/monitoreo/${id}`)
          .then(response => {
            setMonitoreoData(response.data);
          })
          .catch(error => {
            console.error('Error al obtener los datos:', error);
          });
    }
  }, [id]);

  if (!monitoreoData) {
    return <div>Cargando...</div>;
  }

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
          <h1 className="titulo">Título de TT: {monitoreoData.nombreproyecto}</h1>
          <div className="general-contenedor">
            {/* RECEPCION DE PROTOCOLO */ }
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
                <div className="tx-info">
                  {monitoreoData.estatussin1 === "aceptado" &&
                  monitoreoData.estatussin2 === "aceptado" &&
                  monitoreoData.estatussin3 === "aceptado" ? (
                      "Tu protocolo fue recibido exitosamente, ya puedes revisar los detalles del protocolo y su seguimiento"
                  ) : (
                      "Tu protocolo aún no ha sido aceptado, por favor revisa los detalles y vuelve a intentarlo"
                  )}
                </div>
                <a href="/">
                  <button className="blue">Ver evaluación</button>
                </a>
              </div>
            </div>
            {/* EVALUACION SINODAL ACEPTADA */}
            <div className="row-container">
              <div className={
                `box status ${
                    monitoreoData.estatussin1 === "aceptado" ? "green" :
                        monitoreoData.estatussin1 === "rechazo" ? "red" :
                            "espera"
                }`
              }>
                <div className={
                  `icore ${
                      monitoreoData.estatussin1 === "aceptado" ? "ico-green" :
                          monitoreoData.estatussin1 === "rechazo" ? "ico-red" :
                              "ico-espera"
                  }`
                }>
                  <FontAwesomeIcon icon={monitoreoData.estatussin1 === "aceptado" ? faCheck : monitoreoData.estatussin1 === "rechazo" ? faXmark : faAnglesDown}/>
                </div>
                <div className="text-pro">
                  Sinodal 1 - {monitoreoData.sinodal1es}
                  <p>{monitoreoData.fechasinodal1}</p>
                </div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {monitoreoData.estatussin1 === "aceptado" ?
                      "Tu protocolo fue recibido exitosamente: " + monitoreoData.observacionsino1 :
                      monitoreoData.estatussin1 === "rechazo" ?
                          "Tu protocolo fue rechazado: " + monitoreoData.observacionsino1 :
                          "Tu protocolo está en espera de revisión"
                  }
                </div>
                <a href="/">
                <button className={
                    monitoreoData.estatussin1 === "aceptado" ? "green" :
                        monitoreoData.estatussin1 === "rechazo" ? "red" :
                            "espera"
                  }>
                    Ver evaluación
                  </button>
                </a>
              </div>
            </div>

            {/* EVALUACION SINODAL ACEPTADA */}
            <div className="row-container">
              <div className={
                `box status ${
                    monitoreoData.estatussin2 === "aceptado" ? "green" :
                        monitoreoData.estatussin2 === "rechazo" ? "red" :
                            "espera"
                }`
              }>
                <div className={
                  `icore ${
                      monitoreoData.estatussin2 === "aceptado" ? "ico-green" :
                          monitoreoData.estatussin2 === "rechazo" ? "ico-red" :
                              "ico-espera"
                  }`
                }>
                  <FontAwesomeIcon
                      icon={monitoreoData.estatussin2 === "aceptado" ? faCheck : monitoreoData.estatussin2 === "rechazo" ? faXmark : faAnglesDown}/>
                </div>
                <div className="text-pro">
                  Sinodal 2 - {monitoreoData.sinodal2es}
                  <p>{monitoreoData.fechasinodal2}</p>
                </div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {monitoreoData.estatussin2 === "aceptado" ?
                      "Tu protocolo fue recibido exitosamente: " + monitoreoData.observacionsino2 :
                      monitoreoData.estatussin2 === "rechazo" ?
                          "Tu protocolo fue rechazado: " + monitoreoData.observacionsino2 :
                          "Tu protocolo está en espera de revisión"
                  }
                </div>
                <a href="/">
                  <button className={
                    monitoreoData.estatussin2 === "aceptado" ? "green" :
                        monitoreoData.estatussin2 === "rechazo" ? "red" :
                            "espera"
                  }>
                    Ver evaluación
                  </button>
                </a>
              </div>
            </div>

            {/* EVALUACION SINODAL RECHAZADA */}
            <div className="row-container">
              <div className={
                `box status ${
                    monitoreoData.estatussin3 === "aceptado" ? "green" :
                        monitoreoData.estatussin3 === "rechazo" ? "red" :
                            "espera"
                }`
              }>
                <div className={
                  `icore ${
                      monitoreoData.estatussin3 === "aceptado" ? "ico-green" :
                          monitoreoData.estatussin3 === "rechazo" ? "ico-red" :
                              "ico-espera"
                  }`
                }>
                  <FontAwesomeIcon
                      icon={monitoreoData.estatussin3 === "aceptado" ? faCheck : monitoreoData.estatussin3 === "rechazo" ? faXmark : faAnglesDown}/>
                </div>
                <div className="text-pro">
                  Sinodal 3 - {monitoreoData.sinodal3es}
                  <p>{monitoreoData.fechasinodal3}</p>
                </div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {monitoreoData.estatussin3 === "aceptado" ?
                      "Tu protocolo fue recibido exitosamente: " + monitoreoData.observacionsino3 :
                      monitoreoData.estatussin3 === "rechazo" ?
                          "Tu protocolo fue rechazado: " + monitoreoData.observacionsino3 :
                          "Tu protocolo está en espera de revisión"
                  }
                </div>
                <a href="/">
                  <button className={
                    monitoreoData.estatussin3 === "aceptado" ? "green" :
                        monitoreoData.estatussin3 === "rechazo" ? "red" :
                            "espera"
                  }>
                    Ver evaluación
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MonitoreoProtocolo;