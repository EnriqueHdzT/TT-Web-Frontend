import axios from "axios";
import "./Protocolinfo.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
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

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    const response = axios.get(`http://127.0.0.1:8000/api/selectProtocol/${uuidProtocol}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    if (response.status <= 200 && response.status > 300) {
      window.location.reload();
    } else {
      console.log(response);
    }
  };

  const handleDelete = async () => {
    const response = axios.delete(`http://127.0.1:8000/api/deleteProtocol/${uuidProtocol}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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
          <button type="button" className="btn btn-outline-primary" onClick={goToValidate}>
            Validar
          </button>
        )}
        {buttonEnabled && statusProtocol == "classifying" && (
          <button type="button" className="btn btn-outline-primary" onClick={goToClasify}>
            Clasificar
          </button>
        )}
        {buttonEnabled && statusProtocol == "selecting" && (
          <button type="button" className="btn btn-outline-primary" onClick={() => runSelect()}>
            Seleccionar
          </button>
        )}
        {buttonEnabled && (statusProtocol == "evaluatingFirst" || statusProtocol == "evaluatingSecond") && (
          <button type="button" className="btn btn-outline-primary" onClick={() => seeEvaluar()}>
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
        <button type="button" className="btn btn-outline-primary" onClick={seeDocument}>
          Documento
        </button>
        <button type="button" className="btn btn-outline-primary" onClick={seeStatus}>
          Ver Status
        </button>
      </div>
      {/* <div className="p-info">
        <div className="p-alumn">
          {studentList.map((student) => (
            <a key={student.curriculum}>
              {student.name + " " + student.curriculum}
              <br></br>
            </a>
          ))}
        </div>
        <div className="p-director">
          {directorList.map((director) => (
            <a key={director.precedence}>
              {director.name + " " + director.precedence}
              <br></br>
            </a>
          ))}
        </div>
        <div className="p-sinodal">
          {sinodalList.map((sinodal) => (
            <a key={sinodal.academy}>
              {sinodal.name + " " + sinodal.academy}
              <br></br>
            </a>
          ))}
        </div>
      </div> */}
    </div>
  );
}
