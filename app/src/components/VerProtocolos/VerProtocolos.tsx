import "./VerProtocolos.scss";
import { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import Protocolinfo from "./components/Protocolinfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function VerProtocolos() {
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const listOfOrden = {
    "A validar": "waiting",
    Validado: "validated",
    Activo: "active",
    Aplazado: "classified",
    Cancelado: "canceled",
  };

  const [listOfPeriodo, setListOfPeriodo] = useState(["Todos"]);
  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("Todos");
  const [currentOrder, setCurrentOrder] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/datesList`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setListOfPeriodo(["Todos", ...response.data]);
      })
      .catch((error) => console.log(error));
  }, []);

  function goBack() {
    navigate(-1); // This will navigate back to the previous page
  }

  async function fetchProtocols() {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const params = new URLSearchParams({
        cycle: currentPeriod,
        orderBy: listOfOrden[currentOrder],
      });
      const response = await fetch(
        `http://127.0.0.1:8000/api/listProtocols/?${params}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setProtocols(responseData.protocols);
      console.log(responseData.protocols[0].id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProtocols();
  }, [currentOrder, currentPeriod]);

  return (
    <div>
      <div className="headprotocolo">
        <div className="row-verproto">
          <div className="tl-p">
            <a className="button-icon" onClick={goBack}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>{" "}
            Viendo Protocolos
          </div>
          <div className="col-p">
            {/* 
            <div className="dropdown-center d-inline">
             <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentOrder || "Ordenar"}
              </button>
              
              <ul className="dropdown-menu">
                {Object.keys(listOfOrden).map((term) => (
                  <li>
                    <a
                      className="dropdown-item"
                      key={term}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentOrder(e.target.innerText);
                      }}
                    >
                      {term}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            */}

            <div className="dropdown-center d-inline">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {currentPeriod == "Todos" ? "Periodo" : currentPeriod}
              </button>
              <ul className="dropdown-menu">
                {listOfPeriodo.map((term) => (
                  <li>
                    <a
                      className="dropdown-item"
                      key={term}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPeriod(e.target.innerText);
                      }}
                    >
                      {term}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(
              userType ?? ""
            ) && (
              <button
                onClick={() => navigate("/protocolo")}
                type="button"
                className="btn btn-outline-primary"
              >
                Agregar Protocolo
              </button>
            )}
          </div>
        </div>
      </div>
      {loading ? (
        <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
          <div className="spinner-grow text-primary " role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : (
        protocols.map((protocol) => (
          <Protocolinfo
            uuidProtocol={protocol.id}
            idProtocol={protocol.protocol_id}
            titleProtocol={protocol.title}
            statusProtocol={protocol.current_status}
            // studentList = {protocol.studentList}
            // directorList = {protocol.directorList}
            // sinodalList = {protocol.sinodalList}
          />
        ))
      )}
    </div>
  );
}
