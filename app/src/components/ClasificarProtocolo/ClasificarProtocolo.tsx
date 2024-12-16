import "./ClasificarProtocolo.scss";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Interfaces para tipos
interface Protocolo {
  id: string;
  protocol_id: string;
  title: string;
  resume: string;
  period: string;
  keywords: string[];
}

interface AcademiaOption {
  value: string;
  label: string;
}

interface FormData {
  academiaselect: AcademiaOption[];
}

const ClasificarProtocolo: React.FC = () => {
  const { id: protocolId } = useParams<{ id: string }>(); // Identificador del protocolo
  const navigate = useNavigate();

  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState<FormData>({ academiaselect: [] });
  const [protocolo, setProtocolo] = useState<Protocolo | null>(null);
  const [academiasOptions, setAcademiasOptions] = useState<AcademiaOption[]>([]); // Opciones dinámicas
  const [loading, setLoading] = useState(true); // Estado de carga del PDF
  const [pdfUrl, setPdfUrl] = useState<string>(""); // URL del PDF generado a partir del blob

  // Obtener datos del protocolo
  useEffect(() => {
    const fetchProtocolo = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/clasicar/${protocolId}`);
        setProtocolo({
          ...response.data.protocolo,
          keywords: JSON.parse(response.data.protocolo.keywords), // Si las keywords vienen como JSON
        });
      } catch (error) {
        console.error("Error al cargar el protocolo:", error);
      }
    };

    if (protocolId) {
      fetchProtocolo(); // Cargar el protocolo
      fetchDocument();  // Cargar el documento asociado
    }
  }, [protocolId]);

  // Obtener opciones de academias
  useEffect(() => {
    const fetchAcademias = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/academias");
        if (response.data.academies) {
          // Mapear los datos de la academia al formato requerido por react-select
          const data = response.data.academies.map((academia: { id: string; name: string }) => ({
            value: academia.id,
            label: academia.name,
          }));
          setAcademiasOptions(data);
        }
      } catch (error) {
        console.error("Error al cargar las academias:", error);
      }
    };

    fetchAcademias();
  }, []);

  // Cargar documento PDF
  const fetchDocument = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No tienes acceso al documento. Inicia sesión.");
      return;
    }
    try {
      setLoading(true); // Inicia el estado de carga
      const response = await fetch(`http://127.0.0.1:8000/api/getProDoc/${protocolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error al cargar el documento: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob); // Crear URL a partir del blob
      setPdfUrl(url); // Establecer la URL generada
    } catch (error: unknown) { // Cambiar never a unknown
      console.error("Error al cargar el documento:", error);

      // Verificar el tipo del error antes de usar sus propiedades
      if (error instanceof Error) {
        alert(
            error.message || "Hubo un problema al cargar el documento. Por favor, inténtalo de nuevo."
        );
      } else {
        alert("Hubo un problema desconocido al cargar el documento. Intenta nuevamente.");
      }
    } finally {
      setLoading(false); // Completa el estado de carga
    }
  };
  // Manejar cambios en el selector de academias
  const handleSelectChange = (selectedOptions: any, name: "academiaselect") => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedOptions || [],
    }));
  };

  // Manejar el formulario al enviar
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.academiaselect.length) {
      alert("Selecciona al menos una academia.");
      return;
    }

    try {
      const requests = formData.academiaselect.map((academia) =>
          axios.post("http://127.0.0.1:8000/api/clasificarProtocolo", {
            protocol_id: protocolId,
            academia_id: academia.value,
          })
      );

      await Promise.all(requests); // Esperar todas las solicitudes
      alert("Protocolo enviado a todas las academias.");
      navigate(-2); // Volver a la página anterior
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Minimizar/Maximizar el panel izquierdo
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
      <div>
        {protocolo ? (
            <>
              <div className="headdocumento">
                <div className="tt-a">
                  <a href="/" className="button-icon">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </a>{" "}
                  Clasificar
                </div>
              </div>
              <div className="split-container">
                {/* Panel Izquierdo */}
                <div className={`left-panel ${isMinimized ? "minimized" : ""}`}>
                  <div className="info-container">
                    <h1 className="titulo">Título de TT: {protocolo.title}</h1>
                    <p className="identificador">
                      Núm. de Registro de TT: {protocolo.protocol_id}
                    </p>
                    <p className="fecha-evaluacion">Fecha de Evaluación: {protocolo.period || "2024-01-01"}</p>
                    <div className="palabras-clave">
                      Palabras Clave:
                      <div className="palabra-clave-contenedor">
                        {protocolo.keywords.map((palabra, index) => (
                            <p key={index} className="palabra-clave-item">
                              {palabra}
                            </p>
                        ))}
                      </div>
                    </div>
                    <div className="academias">
                      <form onSubmit={handleSubmit}>
                        <div>
                          <label>Selecciona las academias a enviar:</label>
                          <Select
                              isMulti
                              name="academiaselect"
                              options={academiasOptions} // Opciones cargadas dinámicamente
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
                {/* Botón Minimizar */}
                <button className="minimize-button" onClick={toggleMinimize}>
                  <FontAwesomeIcon icon={isMinimized ? faChevronRight : faChevronLeft} />
                </button>
                {/* Panel de Visualización del PDF */}
                <div className={`pdf-panel ${isMinimized ? "full-width" : ""}`}>
                  {loading ? (
                      <span>Cargando PDF...</span>
                  ) : pdfUrl ? (
                      <iframe src={pdfUrl} title="PDF Viewer" className="pdf-viewer" />
                  ) : (
                      <span>Error al cargar el documento</span>
                  )}
                </div>
              </div>
            </>
        ) : (
            <p>Cargando protocolo...</p>
        )}
      </div>
  );
};

export default ClasificarProtocolo;