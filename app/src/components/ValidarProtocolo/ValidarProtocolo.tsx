import "./ValidarProtocolo.scss";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

interface ValidarProtocoloProps {
  pdfUrl: string;
}

const ValidarProtocolo: React.FC<ValidarProtocoloProps> = (props) => {
  const [loading, setLoading] = useState(true); // Maneja la carga del PDF
  const [pdfUrl, setPdfUrl] = useState(""); // URL del PDF generado
  const [protocolData, setProtocolData] = useState<any>(null); // Datos del protocolo
  const [protocolStatus, setProtocolStatus] = useState<any>(null); // Datos del estado del protocolo

  const { id: protocolId } = useParams(); // Obtiene el ID del protocolo desde la URL
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  const fetchProtocolData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getProtocol/${protocolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // Si keywords es una cadena JSON, convertirla a un objeto/array
      if (typeof data.keywords === "string") {
        try {
          data.keywords = JSON.parse(data.keywords);
        } catch (error) {
          console.error("Error al analizar keywords como JSON:", error);
          data.keywords = [];
        }
      }
      setProtocolData(data);

      // Ahora buscar los datos de protocol_status usando protocol_id
      fetchProtocolStatus(String(data.id));
    } catch (error) {
      console.log("Error al obtener los datos del protocolo:", error);
    }
  };

  const fetchProtocolStatus = async (protocolId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const response = await fetch(
            `http://127.0.0.1:8000/api/getProtocolStatus/${protocolId}`,
            {
                headers: {
                    Authorization: 'Bearer ${token}',
                },
            }
        );

        if (!response.ok) {
            const errorMessage = `Error: ${response.status} ${response.statusText}`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        const data = await response.json();
        setProtocolStatus(data);
        console.log("Datos de protocol_status:", data);
    } catch (error) {
        console.error("Error al obtener los datos del estado del protocolo:", error);
        alert("Hubo un error al obtener los datos del estado del protocolo. Por favor, intente de nuevo.");
    }
};

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getProtocolDoc/${protocolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProtocolData();
    fetchData();
  }, []);

  // Alternar minimización del panel izquierdo
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a className="button-icon" onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Validar
        </div>
      </div>
      <div className="split-container">
        {/* Sección izquierda */}
        <div className={`left-panel ${isMinimized ? "minimized" : ""}`}>
          <div className="info-container">
            <h1 className="titulo">
              Título de TT: {protocolData?.title}
            </h1>
            <p className="identificador">
              Núm. de Registro de TT: {protocolData?.protocol_id}
            </p>

            {/* Palabras Clave */}
            <div className="palabras-clave">
              Palabras Clave:
              <div className="palabra-clave-contenedor">
                {Array.isArray(protocolData?.keywords) ? (
                  protocolData.keywords.map((keyword: string, index: number) => (
                    <p className="palabra-clave-item" key={index}>
                      {keyword}
                    </p>
                  ))
                ) : (
                  <p className="palabra-clave-item">Sin palabras clave</p>
                )}
              </div>
            </div>

            {/* Botones Validar o Rechazar */}
            <div className="button-vr">
              <button>Validar</button>
              <button>Rechazar</button>
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
          {loading ? null : pdfUrl ? (
            <iframe src={pdfUrl} title="PDF Viewer" className="pdf-viewer" />
          ) : (
            <span>Error al cargar el documento</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ValidarProtocolo;
