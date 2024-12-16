import "./MonitoreoProtocolo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { faChevronLeft, faAnglesDown, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function MonitoreoProtocolo() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [current_status, set_current_status] = useState("selecting");
  const [previous_status, set_previous_status] = useState("");
  const [sinodals_count, set_sinodals_count] = useState(0);
  const [evaluations_count, set_evaluations_count] = useState(0);
  const [evaluations, set_evaluations] = useState([]);

  useEffect(() => {
    const fetchMonitorData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/monitoreo/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch monitor data");
        }

        const monitorData = await response.json();

        set_current_status(monitorData.current_status);
        set_previous_status(monitorData.previous_status);
        if (monitorData.sinodals_count) {
          set_sinodals_count(monitorData.sinodals_count);
        }
        if (monitorData.evaluations_count) {
          set_evaluations_count(monitorData.evaluations_count);
        }
        if (monitorData.evaluations) {
          set_evaluations(monitorData.evaluations);
        }

        console.log(monitorData.current_status);
      } catch (error) {
        navigate(-1);
        console.error("Error fetching monitor data:", error);
      }
    };

    fetchMonitorData();
  }, []);
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
                {current_status === "validating" ? "Validando protocolo..." : "Protocolo validado"}
              </div>
            </div>
            <div className="box info">
              <div className="tx-info">
                {current_status === "canceled" && previous_status === "validating"
                  ? "El protocolo no fue aceptado, para mas información contacta con la CATT."
                  : current_status === "validating"
                  ? "El protocolo se encuentra en validación, se te notificara cuando este sea validado."
                  : "El protocolo fue validado exitosamente."}
              </div>
            </div>
          </div>

          {(current_status === "selecting" ||
            current_status === "evaluatingFirst" ||
            current_status === "evaluatingSecond") && (
            <div className="row-container">
              <div className="box status green">
                <div className="icore ico-green">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div className="text-pro">
                  {current_status === "selecting" ? "Asignando sinodales..." : "Evaluando protocolo..."}
                </div>
              </div>
              <div className="box info">
                <div className="tx-info">
                  {current_status === "selecting"
                    ? `El protocolo cuenta con ${sinodals_count} de 3 sinodales asignados.`
                    : `El protocolo cuenta con ${evaluations_count} de 3 evaluaciones.`}
                </div>
              </div>
            </div>
          )}
          {evaluations.length > 0 && (
            <div className="row-container">
              {evaluations.map((evaluation) => (
                <div className="box status green">
                  <div className="text-pro">
                    {evaluation.name + evaluation.lastname + evaluation.second_lastname}
                    <p>{evaluation.result === "approved" ? "Aprobado" : "Rechazado"}</p>
                  </div>
                  <a href="/">
                    <button className="red">Ver evaluación</button>
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
                  El protocolo fue rechazado por uno o mas sinodales, esperando correcciones.
                </div>
              </div>
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
