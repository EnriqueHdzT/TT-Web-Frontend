import "./EvaluarPro.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface ReplyToQuestion {
  validation: boolean | null;
  comment: string | null;
}

export default function EvaluarPro() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false); // Controla si el panel izquierdo está minimizado
  const [identificador, setIdentificador] = useState("");
  const [pdf, setPdf] = useState("");
  const [editAllowed, setEditAllowed] = useState(false);
  const [questionsList, setQuestionsList] = useState<string[]>([]);
  const [replyToQuestion, setReplyToQuestion] = useState<ReplyToQuestion[]>([]);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
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
        setReplyToQuestion([]);
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

    const getResponses = async (sinodalID: string) => {
      try {
        const formData = new URLSearchParams();
        formData.append("id", id as string);
        formData.append("sinodal_id", sinodalID);

        const response = await fetch("http://127.0.0.1:8000/api/getResponses", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData as BodyInit,
        });
        if (!response.ok) {
          throw new Error("Error al obtener los datos");
        }
        const data = await response.json();
        setQuestionsList(Object.keys(data));
        setReplyToQuestion([]);
        for (const key in data) {
          setReplyToQuestion((prev) => [
            ...prev,
            { validation: data[key].validation, comment: data[key].comment },
          ]);
        }
      } catch (error) {
        navigate(-1);
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

    const getProtocolData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/getEvalProtData/${id}`,
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
        setIdentificador(data.protocol_id);
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
          getProtocolData();
        } else {
          const queryParams = new URLSearchParams(location.search);
          const sinodalID = queryParams.get("sinodalID");
          if (!sinodalID){
            navigate(-1);
            return;
          } else {
            getResponses(sinodalID);
            getPdf();
            getProtocolData();  
          }
          
        }
      } catch (error) {
        console.error("User not allowed", error);
      }
    };

    isUserAllow();
  }, []);

  // useeffect if replyToQuestion values null keep isSendButtonDisabled true
  useEffect(() => {
    // Check if all fields have valid values (not null or empty)
    const allFieldsFilled = replyToQuestion.every(
      (reply) => reply.validation !== null
    );

    // Disable the send button if all fields are not filled
    setIsSendButtonDisabled(!allFieldsFilled);
  }, [replyToQuestion]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar y expandir
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    interface Reply {
      [key: string]: {
        validation: boolean;
        comment: string;
      };
    }

    const reply: Reply = {};
    questionsList.forEach((question, index) => {
      reply[question] = {
        validation: replyToQuestion[index].validation === true ? true : false,
        comment: replyToQuestion[index].comment ?? "",
      };
    });

    const response = await fetch(
      `http://127.0.0.1:8000/api/evaluateProtocol/${id}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(reply),
      }
    );

    if (response.ok) {
      console.log("Respuestas enviadas correctamente");
    } else {
      console.error("Error al enviar las respuestas");
    }
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
          Evaluacion de Protocolo
        </div>
      </div>
      <div className="split_container">
        {/* Sección izquierda */}
        <div className={`left_panel ${isMinimized ? "minimized" : ""}`}>
          <div className="info_containerd">
            <h1 className="titulo">ID de Protocolo: </h1> <p>{identificador}</p>
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
              {editAllowed && (
                <button type="submit" disabled={isSendButtonDisabled}>
                  Enviar
                </button>
              )}
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
