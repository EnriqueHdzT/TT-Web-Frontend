import "./EvaluarPro.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface ReplyToQuestion {
  validation: boolean | null;
  comment: string | null;
}

interface FormData {
  tituloProducto: string;
  observacionesTitulo: string;
  resumenPropuesta: string;
  observacionesResumen: string;
  palabrasClasificadas: string;
  observacionesPalabras: string;
  presentacionComprensible: string;
  observacionesPresentacion: string;
  objetivoPreciso: string;
  observacionesObjetivo: string;
  problemaClaro: string;
  observacionesProblema: string;
  contribucionJustificada: string;
  observacionesContribucion: string;
  viabilidadAdecuada: string;
  observacionesViabilidad: string;
  propuestaPertinente: string;
  observacionesPropuesta: string;
  calendarioAdecuado: string;
  observacionesCalendario: string;
  aprobadoProtocolo: string;
  recomendacionAdicional: string;
}

export default function EvaluarPro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false); // Controla si el panel izquierdo está minimizado
  const [title, setTitle] = useState("");
  const [identificador, setIdentificador] = useState("");
  const [fechaEvaluacion, setFechaEvaluacion] = useState<Date | null>(null);
  const [pdf, setPdf] = useState("");
  const [userType, setUserType] = useState<string | null>(null);
  const [editAllowed, setEditAllowed] = useState(false);
  const [questionsList, setQuestionsList] = useState<string[]>([]);
  const [replyToQuestion, setReplyToQuestion] = useState<ReplyToQuestion[]>([]);
  const [formData, setFormData] = useState<FormData>({
    tituloProducto: "",
    observacionesTitulo: "",
    resumenPropuesta: "",
    observacionesResumen: "",
    palabrasClasificadas: "",
    observacionesPalabras: "",
    presentacionComprensible: "",
    observacionesPresentacion: "",
    objetivoPreciso: "",
    observacionesObjetivo: "",
    problemaClaro: "",
    observacionesProblema: "",
    contribucionJustificada: "",
    observacionesContribucion: "",
    viabilidadAdecuada: "",
    observacionesViabilidad: "",
    propuestaPertinente: "",
    observacionesPropuesta: "",
    calendarioAdecuado: "",
    observacionesCalendario: "",
    aprobadoProtocolo: "",
    recomendacionAdicional: "",
  });

  useEffect(() => {
    const getQuestionare = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/getQuestionare",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setQuestionsList(Object.keys(data));
        for (const key in data) {
          setReplyToQuestion((prev) => [
            ...prev,
            { validation: null, comment: null },
          ]);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    const getResponses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/getResponses", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setTitle(data.titulo);
        setIdentificador(data.identificador);
        setFechaEvaluacion(data.fechaEvaluacion);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    const getPdf = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getProtocolDocByID/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.blob();
        const url = URL.createObjectURL(data);
        setPdf(url);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    const isUserAllow = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/allowedEval/${id}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        if (data.permissions === "not allowed") {
          navigate(-1);
          return;
        }
        if (data.permissions === "write") {
          console.log("setting editAllowed to true");
          setEditAllowed(true);
          getQuestionare();
          getPdf();
        } else {
          getResponses();
          getPdf();
        }
      } catch (error) {
        navigate(-1);
        console.error("User not allowed", error);
      }
    };

    isUserAllow();
    if (localStorage.getItem("userType")) {
      setUserType(localStorage.getItem("userType"));
    }
  }, []);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar y expandir
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    console.log("Datos del documento:", {
      pdf,
      title,
      identificador,
      fechaEvaluacion,
    });
    // Aquí se puede añadir la lógica para enviar los datos a una base de datos o entre usuarios
  };

  const updateValidation = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newReplyToQuestion = [...replyToQuestion];
    newReplyToQuestion[index].validation =
      e.target.value === "Si" ? true : false;
    setReplyToQuestion(newReplyToQuestion);
  };

  const updateComment = (
    index: number,
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newReplyToQuestion = [...replyToQuestion];
    newReplyToQuestion[index].comment = e.target.value;
    setReplyToQuestion(newReplyToQuestion);
  };

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a href="/" className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Evaluar
        </div>
      </div>
      <div className="split_container">
        {/* Sección izquierda */}
        <div className={`left_panel ${isMinimized ? "minimized" : ""}`}>
          <div className="info_containerd">
            <h1 className="titulo">Título de TT: {title}</h1>
            <p className="identificadord">
              Núm. de Registro de TT: {identificador}
            </p>
            <p className="palabra-claved">
              Fecha de Evaluación: {fechaEvaluacion}
            </p>

            {/* Formulario de evaluación */}
            <form onSubmit={handleSubmit}>
              {questionsList.map((question, index) => (
                <>
                  <label key={index}>
                    {" "}
                    {index === questionsList.length - 1
                      ? ""
                      : index + 1 + "."}{" "}
                    {question}
                  </label>
                  <br />
                  <select
                    name={question}
                    value={
                      replyToQuestion[index].validation === null
                        ? ""
                        : replyToQuestion[index].validation
                        ? "Si"
                        : "No"
                    }
                    onChange={(e) => {
                      updateValidation(index, e);
                    }}
                    disabled={!editAllowed}
                  >
                    <option value="" disabled hidden>
                      Seleccione una opcion
                    </option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </select>
                  <label>Observaciones:</label>
                  <br />
                  <textarea
                    name={question}
                    value={replyToQuestion[index].comment ?? ""}
                    onChange={(e) => {
                      updateComment(index, e);
                    }}
                    placeholder="Escribe tus observaciones"
                    disabled={!editAllowed}
                  />
                </>
              ))}
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <button className="minimize-button" onClick={toggleMinimize}>
          <FontAwesomeIcon
            icon={isMinimized ? faChevronRight : faChevronLeft}
          />
        </button>
        {/* Sección derecha con el PDF */}
        <div className={`pdf-panel ${isMinimized ? "full-width" : ""}`}>
          <iframe src={pdf} title="PDF Evaluar" className="pdf-viewer" />
        </div>
      </div>
    </div>
  );
}
