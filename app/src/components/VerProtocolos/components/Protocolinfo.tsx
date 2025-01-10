import axios from "axios";
import "./Protocolinfo.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import "reactjs-popup/dist/index.css";

export default function Protocolinfo({
  uuidProtocol = null,
  idProtocol = null,
  titleProtocol = null,
  statusProtocol = null,
  studentList = [],
  directorList = [],
  sinodalList = [],
  buttonEnabled = false,
}) {
  const [userType, setUserType] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showAlumn, setShowAlumn] = useState(false);
  const [showDirector, setShowDirector] = useState(false);
  const [showSinodal, setShowSinodal] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleAlumn = () => setShowAlumn(!showAlumn);
  const toggleDirector = () => setShowDirector(!showDirector);
  const toggleSinodal = () => setShowSinodal(!showSinodal);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);
  function seeDocument() {
    navigate(`/documento/${uuidProtocol}`);
  }

  function goToValidate() {
    navigate(`/validarprotocolo/${uuidProtocol}`);
  }
  function goToClasify() {
    navigate(`/clasificarprotocolo/${uuidProtocol}`);
  }

  function seeStatus() {
    navigate(`/monitoreoprotocolo/${idProtocol}`);
  }
  function seeEvaluar() {
    navigate(`/evaprotocolo/${uuidProtocol}`);
  }

  const runSelect = async () => {
    const response = axios.get(
      `http://127.0.0.1:8000/api/selectProtocol/${uuidProtocol}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    if (response.status <= 200 && response.status > 300) {
      window.location.reload();
    } else {
      console.log(response);
    }
  };

  const handleDelete = async () => {
    const response = axios.delete(
      `http://127.0.1:8000/api/deleteProtocol/${uuidProtocol}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response);
    if (response.status <= 200 && response.status > 300) {
      window.location.reload();
    } else {
      console.log(response);
    }
  };

  return (
    <div className="p-box">
      <div className="p-tit">
        <div className="p-tit-pro">Título de protocolo: {titleProtocol}</div>
        {idProtocol}
      </div>

      <div className="p-buttons">
        {/* <Popup
          trigger={(open) => (
            <button type="button" className="btn btn-outline-primary">
              Validar
            </button>
          )}
          modal
          nested
          closeOnDocumentClick={false}
        >
          {(close) => (
            <>
              <h1 className="popup_title">¿Vas a validar?</h1>
              <div>
                <button className="btn btn-outline-primary" onClick={close}>
                  Ño
                </button>
                <button className="btn btn-primary">Shi</button>
              </div>
            </>
          )}
        </Popup> */}
        {buttonEnabled && statusProtocol == "validating" && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={goToValidate}
          >
            Validar
          </button>
        )}
        {buttonEnabled && statusProtocol == "classifying" && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={goToClasify}
          >
            Clasificar
          </button>
        )}
        {buttonEnabled && statusProtocol == "selecting" && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => runSelect()}
          >
            Seleccionar
          </button>
        )}
        {buttonEnabled &&
          (statusProtocol == "evaluatingFirst" ||
            statusProtocol == "evaluatingSecond") && (
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={() => seeEvaluar()}
            >
              Evaluar
            </button>
          )}
        {buttonEnabled && statusProtocol == "correcting" && (
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => navigate("/protocolo/" + uuidProtocol)}
          >
            Corregir Protocolo
          </button>
        )}
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={seeDocument}
        >
          Documento
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={seeStatus}
        >
          Ver Status
        </button>
      </div>
      <div className="cont-ee">
        <button className="dropdown-ee" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faEllipsisVertical} className="icon-us" />
        </button>
        {isOpen && (
          <ul className="menu-ee">
            <li
              onClick={() => {
                navigate(`/protocolo/${uuidProtocol}`);
              }}
            >
              Editar
            </li>
            <li onClick={handleDelete}>Eliminar</li>
          </ul>
        )}
      </div>
      <div className="p-info">
        {/* Sección Alumnos */}
        <div className="section-header" onClick={toggleAlumn}>
          <span>Alumnos</span>
          <FontAwesomeIcon icon={showAlumn ? faChevronUp : faChevronDown} />
        </div>
        {showAlumn && (
          <div className="p-alumn">
            {studentList.map((student) => (
              <a key={student.curriculum}>
                <span className="p-subtitle">Nombre:</span>
                {student.name +
                  " " +
                  student.lastname +
                  " " +
                  (student.second_lastname
                    ? " " + student.second_lastname
                    : "") +
                  " "}
                  <span className="p-subtitle">Carrera:</span>{student.career}
                <br />
              </a>
            ))}
          </div>
        )}

        {/* Sección Director */}
        <div className="section-header" onClick={toggleDirector}>
          <span>Director(es)</span>
          <FontAwesomeIcon icon={showDirector ? faChevronUp : faChevronDown} />
        </div>
        {showDirector && (
          <div className="p-director">
            {directorList.map((director) => (
              <a key={director.precedence}>
                <span className="p-subtitle">Nombre:</span>
                {director.name + " " +
                  director.lastname +
                  " " +
                  (director.second_lastname
                    ? " " + director.second_lastname
                    : "") + " "}
                <span className="p-subtitle">Procedencia:</span>{director.precedence}
                <br />
              </a>
            ))}
          </div>
        )}

        {/* Sección Sinodal */}
        <div className="section-header" onClick={toggleSinodal}>
  <span>Sinodales</span>
  <FontAwesomeIcon icon={showSinodal ? faChevronUp : faChevronDown} />
</div>
{showSinodal && (
  <div className="p-sinodal">
    {sinodalList.map((sinodal, i) => (
      <a key={i}>
        <span className="p-subtitle">Nombre:</span>
        {sinodal.name + " " + sinodal.lastname + " " + (sinodal.second_lastname ? " " + sinodal.second_lastname : "")}
        <span className="p-subtitle">Academias:</span>{sinodal.academies.join(", ")}
        <br />
      </a>
    ))}
  </div>
)}

      </div>
    </div>
  );
}
