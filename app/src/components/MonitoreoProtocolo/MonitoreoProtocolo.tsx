import "./MonitoreoProtocolo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  faChevronLeft,
  faAnglesDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function MonitoreoProtocolo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [current_status, set_current_status] = useState("selecting");
  const [previous_status, set_previous_status] = useState("");
  const [sinodals_count, set_sinodals_count] = useState(0);
  const [firstEvaluationsCount, setFirstEvaluationsCount] = useState(0);
  const [secondEvaluationsCount, setSecondEvaluationsCount] = useState(0);
  const [firstEvaluations, setFirstEvaluations] = useState({});
  const [secondEvaluations, setSecondEvaluations] = useState({});	
  const [protocolUUID, setProtocolUUID] = useState("");

  useEffect(() => {
    const fetchMonitorData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/monitoreo/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch monitor data");
        }

        const monitorData = await response.json();

        setProtocolUUID(monitorData.id);
        set_current_status(monitorData.current_status);
        set_previous_status(monitorData.previous_status);
        if (monitorData.sinodals_count) {
          set_sinodals_count(monitorData.sinodals_count);
        }
        if (monitorData.firstEvaluationsCount) {
          setFirstEvaluationsCount(monitorData.firstEvaluationsCount);
        }
        if (monitorData.secondEvaluationsCount) {
          setSecondEvaluationsCount(monitorData.secondEvaluationsCount);
        }
        if (monitorData.firstEvaluations) {
          setFirstEvaluations(monitorData.firstEvaluations);
        }
        if (monitorData.secondEvaluations) {
          setSecondEvaluations(monitorData.secondEvaluations);
        }
        console.log(monitorData.secondEvaluations);
      } catch (error) {
        //navigate(-1);
        console.error("Error fetching monitor data:", error);
      }
    };

    fetchMonitorData();
  }, []);

  useEffect(() => {
    console.log(firstEvaluations);
  }, [firstEvaluations]);

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a onClick={() => navigate(-1)} className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Monitoreo de protocolo
        </div>
      </div>
      <div className="info-container">
        <div className="general-contenedor">
          <div className="row-container">
            <div className="box status gray">
              <div className="icore ico-blue">
                <FontAwesomeIcon icon={faAnglesDown} />
              </div>
              <div className="text-pro">
                {current_status === "validating"
                  ? "Validando protocolo..."
                  : "Protocolo validado"}
              </div>
            </div>
            <div className="box info">
              <div className="tx-info">
                {current_status === "canceled" &&
                previous_status === "validating"
                  ? "El protocolo no cumple con los requisitos de validación, contacta con la CATT para mas informacion."
                  : current_status === "validating"
                  ? "El protocolo esta en proceso de validación, se te notificara al finalizar."
                  : "El protocolo fue validado exitosamente."}
              </div>
            </div>
          </div>

          {current_status === "classifying" && (
            <div className="row-container">
              <div className="box status green">
                <div className="icore ico-green">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className="text-pro">Asignando academias</div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  Se estan eligiendo las academias que mas se ajusten al
                  protocolo
                </div>
              </div>
            </div>
          )}

          {(current_status === "selecting" ||
            current_status === "evaluatingFirst") && (
            <div className="row-container">
              <div className="box status green">
                <div className="icore ico-green">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className="text-pro">
                  {current_status === "selecting"
                    ? "Asignando sinodales..."
                    : "Evaluando protocolo..."}
                </div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {current_status === "selecting"
                    ? `El protocolo cuenta con ${sinodals_count} de 3 sinodales asignados.`
                    : `El protocolo cuenta con ${firstEvaluationsCount} de 3 evaluaciones.`}
                </div>
              </div>
            </div>
          )}
          {Object.keys(firstEvaluations).length == 3 && (
            <div className="row-container">
              {Object.keys(firstEvaluations).map((evaluation) => (
                <div className="box status green">
                  <div className="text-pro">
                    {firstEvaluations[evaluation].name +
                      " " +
                      firstEvaluations[evaluation].lastname}
                  </div>
                  <a>
                    <button
                      className="red"
                      onClick={() => {
                        navigate(
                          `/evaprotocolo/${protocolUUID}?sinodalID=${evaluation}&evalTime=first`
                        );
                      }}
                    >
                      Ver evaluación
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
          {current_status === "correcting" && (
            <div className="row-container">
              <div className="box status red">
                <div className="icore ico-red">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className="text-pro">Corrigiendo protocolo</div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  El protocolo fue rechazado por uno o mas sinodales, esperando
                  correcciones.
                </div>
              </div>
            </div>
          )}
          {current_status === "evaluatingSecond" && (
            <div className="row-container">
              <div className="box status green">
                <div className="icore ico-green">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className="text-pro">Evaluando protocolo...</div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {`El protocolo cuenta con ${secondEvaluationsCount} de 3 evaluaciones.`}
                </div>
              </div>
            </div>
          )}
          {Object.keys(firstEvaluations).length == 3 && (
            <div className="row-container">
              {Object.keys(secondEvaluations).map((evaluation) => (
                <div className="box status green">
                  <div className="text-pro">
                    {secondEvaluations[evaluation].name + " " +
                      secondEvaluations[evaluation].lastname
                      }
                  </div>
                  <a>
                    <button
                      className="red"
                      onClick={() => {
                        navigate(
                          `/evaprotocolo/${protocolUUID}?sinodalID=${evaluation}&evalTime=second`
                        );
                      }}
                    >
                      Ver evaluación
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}
          {(current_status === "active" || current_status === "canceled") && (
            <div className="row-container">
              <div className="box status red">
                <div className="icore ico-red">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className="text-pro">Proceso finalizado</div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {current_status === "canceled"
                    ? "El protocolo fue rechazado, intente nuevamente el siguiente semestre."
                    : "Felicidades! El protocolo fue aceptado, no olvides seguir los pasos siguientes para cursar tu TT."}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
