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

  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState("Todos");
  const [currentOrder, setCurrentOrder] = useState("Todos");
  const [currentAcademy, setCurrentAcademy] = useState("Todas");
  const [filters, setFilters] = useState({});

  function goBack() {
    navigate(-1); // This will navigate back to the previous page
  }

  async function fetchProtocols() {
    if (loading) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;
    let fetchFilters = Object.keys(filters).length == 0 ? "true" : "";

    try {
      const params = new URLSearchParams({
        cycle: currentPeriod,
        orderBy: filters.statuses ? filters.statuses[currentOrder] : undefined,
        fetchFilters,
      });
      const response = await fetch(`http://127.0.0.1:8000/api/listProtocols/?${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setProtocols(responseData.protocols);
      if (responseData.filters)
        setFilters(responseData.filters);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProtocols();
  }, [currentOrder, currentPeriod, currentAcademy]);

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
            {/*----- CICLO -----*/}
            {filters.cycles &&
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentPeriod == "Todos" ? "Ciclo" : currentPeriod}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      key={"Todos"}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPeriod(e.target.innerText);
                      }}
                    >
                      Todos
                    </a>
                  </li>
                  {filters.cycles.map((cycle) => (
                    <li>
                      <a
                        className="dropdown-item"
                        key={cycle}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPeriod(e.target.innerText);
                        }}
                      >
                        {cycle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }

            {/*----- Academias -----*/}
            {filters.academies &&
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentAcademy == "Todas" ? "Academia" : currentAcademy}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      key={"Todos"}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentAcademy(e.target.innerText);
                      }}
                    >
                      Todas
                    </a>
                  </li>
                  {filters.academies.map((academy) => (
                    <li>
                      <a
                        className="dropdown-item"
                        key={academy}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentAcademy(e.target.innerText);
                        }}
                      >
                        {academy}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }

            {filters.statuses &&
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentOrder == "Todos" ? "Estatus" : currentOrder}
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      key={"Todos"}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentAcademy(e.target.innerText);
                      }}
                    >
                      Todos
                    </a>
                  </li>
                  {Object.keys(filters.statuses).map((status) => (
                    <li>
                      <a
                        className="dropdown-item"
                        key={status}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentOrder(e.target.innerText);
                        }}
                      >
                        {status}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            }

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
      <div className="cuerpo-protocol">
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
    </div>
  );
}
