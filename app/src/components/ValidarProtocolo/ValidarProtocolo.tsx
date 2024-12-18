import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import "./ValidarProtocolo.scss";
import axios from "axios";

interface ValidarProtocoloProps {
  pdfUrl: string;
}

const ValidarProtocolo: React.FC<ValidarProtocoloProps> = () => {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState("");
  const [protocolData, setProtocolData] = useState<any>(null);
  const { id: protocolId } = useParams();
  const navigate = useNavigate();
  const [elementLoading, setElementLoading] = useState("");

  if (!protocolId) {
    console.error("El ID del protocolo no está definido.");
    return null;
  }

  const goBack = () => {
    navigate(-1);
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
        throw new Error(`Error al obtener el protocolo: ${response.status}`);
      }

      const data = await response.json();

      if (typeof data.keywords === "string") {
        try {
          data.keywords = JSON.parse(data.keywords);
        } catch (error) {
          console.error("Error al analizar keywords como JSON:", error);
          data.keywords = [];
        }
      }

      setProtocolData(data);
    } catch (error) {
      console.error("Error al obtener los datos del protocolo:", error);
      alert("No se pudo obtener la información del protocolo.");
    }
  };

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/getProtocolDocByID/${protocolId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error al cargar el documento: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (error) {
      console.error("Error al cargar el documento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProtocolData();
    fetchData();
  }, []);

  const [isMinimized, setIsMinimized] = useState(false);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  function validateProtocol() {
    setElementLoading('validar');
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.put(`http://127.0.0.1:8000/api/validateProtocol/${protocolId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      alert("Protocolo validado exitosamente.");
      navigate("/protocolos");
    })
    .catch((error) => {
      alert("No se pudo validar el protocolo.");
    }).finally(() => {
      setElementLoading('');
    });
  }

  return (
    <div>
      <div className="contvali">
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
                Título de TT: {protocolData?.title || "Cargando..."}
              </h1>
              <p className="identificador">
                Núm. de Registro de TT:{" "}
                {protocolData?.protocol_id || "Cargando..."}
              </p>

              {/* Palabras clave */}
              <div className="palabras-clave">
                Palabras Clave:
                <div className="palabra-clave-contenedor">
                  {Array.isArray(protocolData?.keywords) ? (
                    protocolData.keywords.map(
                      (keyword: string, index: number) => (
                        <p className="palabra-clave-item" key={index}>
                          {keyword}
                        </p>
                      )
                    )
                  ) : (
                    <p className="palabra-clave-item">Sin palabras clave</p>
                  )}
                </div>
              </div>

              {/* Botones de Validar/Rechazar */}
              <div className="button-vrs">
                <button disabled={loading || elementLoading !== ''} onClick={validateProtocol}>
                  {elementLoading == 'validar' ? 'Validando...' : 'Validar'}
                </button>
                <button disabled={loading || elementLoading !== ''}>
                  {elementLoading == 'rechazar' ? 'Rechazando...' : 'Rechazar'}
                </button>
              </div>
            </div>
          </div>
          <button className="minimize-button" onClick={toggleMinimize}>
            <FontAwesomeIcon
              icon={isMinimized ? faChevronRight : faChevronLeft}
            />
          </button>
          {/* Sección derecha con el visor de PDF */}
          <div className={`pdf-panel ${isMinimized ? "full-width" : ""}`}>
            {loading ? (
              <span>Cargando...</span>
            ) : pdfUrl ? (
              <iframe src={pdfUrl} title="PDF Viewer" className="pdf-viewer" />
            ) : (
              <span>Error al cargar el documento</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidarProtocolo;
