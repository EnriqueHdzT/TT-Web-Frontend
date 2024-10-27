import { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";

interface TermData {
  cycle: string;
  status: boolean;
  start_recv_date_ord: Date | string;
  end_recv_date_ord: Date | string;
  recom_classif_end_date_ord: Date | string;
  recom_eval_end_date_ord: Date | string;
  correc_end_date_ord: Date | string;
  recom_second_eval_end_date_ord: Date | string;
  start_recv_date_ext: Date | string;
  end_recv_date_ext: Date | string;
  recom_classif_end_date_ext: Date | string;
  recom_eval_end_date_ext: Date | string;
  correc_end_date_ext: Date | string;
  recom_second_eval_end_date_ext: Date | string;
}

const TermDataInit: TermData = {
  cycle: "",
  status: false,
  start_recv_date_ord: "",
  end_recv_date_ord: "",
  recom_classif_end_date_ord: "",
  recom_eval_end_date_ord: "",
  correc_end_date_ord: "",
  recom_second_eval_end_date_ord: "",
  start_recv_date_ext: "",
  end_recv_date_ext: "",
  recom_classif_end_date_ext: "",
  recom_eval_end_date_ext: "",
  correc_end_date_ext: "",
  recom_second_eval_end_date_ext: "",
};

const timesArray = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export default function DatesAndTerms() {
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [currentTerm, setCurrentTerm] = useState("");
  const [currentTermData, setCurrentTermData] =
    useState<TermData>(TermDataInit);
  const [listOfTerms, setListOfTerms] = useState([]);
  const [isListOfTermsEmpty, setIsListOfTermsEmpty] = useState(true);
  const [newCycle, setNewCycle] = useState(["", "1"]);
  const [isCloseCycleChecked, setIsCloseCycleChecked] = useState(false);
  const [start_recv_date_ord_date, setStart_recv_date_ord_date] = useState("");
  const [start_recv_date_ord_time, setStart_recv_date_ord_time] = useState("");
  const [end_recv_date_ord_date, setEnd_recv_date_ord_date] = useState("");
  const [end_recv_date_ord_time, setEnd_recv_date_ord_time] = useState("");
  const [recom_classif_end_date_ord_date, setRecom_classif_end_date_ord_date] = useState("");
  const [recom_classif_end_date_ord_time, setRecom_classif_end_date_ord_time] = useState("");
  const [recom_eval_end_date_ord_date, setRecom_eval_end_date_ord_date] = useState("");
  const [recom_eval_end_date_ord_time, setRecom_eval_end_date_ord_time] = useState("");
  const [correc_end_date_ord_date, setCorrec_end_date_ord_date] = useState("");
  const [correc_end_date_ord_time, setCorrec_end_date_ord_time] = useState("");
  const [recom_second_eval_end_date_ord_date, setRecom_second_eval_end_date_ord_date] = useState("");
  const [recom_second_eval_end_date_ord_time, setRecom_second_eval_end_date_ord_time] = useState("");
  const [start_recv_date_ext_date, setStart_recv_date_ext_date] = useState("");
  const [start_recv_date_ext_time, setStart_recv_date_ext_time] = useState("");
  const [end_recv_date_ext_date, setEnd_recv_date_ext_date] = useState("");
  const [end_recv_date_ext_time, setEnd_recv_date_ext_time] = useState("");


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const updateCurrentTerm = (newTerm: string) => {
    setCurrentTerm(newTerm);
    updateUrlCycleParam(newTerm);
  };

  const updateUrlCycleParam = (newCycle: string) => {
    if (newCycle !== "") {
      const url = new URL(window.location.href);
      url.searchParams.set("cycle", newCycle);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const createNewCycle = async (newCycle: string) => {
    try {
      const formData = new FormData();
      formData.append("cycle", newCycle);
      const response = await fetch("http://127.0.0.1:8000/api/dates", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to create new cycle: ${newCycle}`);
      }

      setNewCycle(["", "1"]);
      setListOfTerms((prevList) => {
        const newList = [...prevList, { cycle: newCycle }];
        return newList.sort((a, b) => {
          const [yearA, semesterA] = a.cycle.split("/").map(Number);
          const [yearB, semesterB] = b.cycle.split("/").map(Number);
          if (yearA !== yearB) {
            return yearB - yearA; // Sort by year in descending order
          } else {
            return semesterB - semesterA; // Sort by semester in descending order
          }
        });
      });
      setIsListOfTermsEmpty(false);
      updateCurrentTerm(newCycle);
      popupRef.current.close();
    } catch (error) {
      console.error(`Failed to create new cycle: ${newCycle}`);
    }
  };

  const onPopupClose = () => {
    setNewCycle(["", "1"]);
    popupRef.current?.close();
  };


  // Get the list of terms from DB
  useEffect(() => {
    async function fetchListOfTerms() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/dates", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get the list of terms");
        }

        const termsList = await response.json();
        setListOfTerms(termsList);
        setIsListOfTermsEmpty(termsList.length === 0);

        const urlParams = new URLSearchParams(window.location.search);
        const urlCycle = urlParams.get("cycle");
        const existingTerm = termsList.find((term) => term.cycle === urlCycle);

        if (urlCycle && existingTerm) {
          setCurrentTerm(existingTerm.cycle);
        } else if (termsList.length > 0) {
          setCurrentTerm(termsList[0].cycle);
          updateUrlCycleParam(termsList[0].cycle);
        }
      } catch (error) {
        console.error("Error fetching terms:", error);
        setListOfTerms([]);
        setIsListOfTermsEmpty(true);
      }
    }
    fetchListOfTerms();
  }, []);

  // Get data for the chosen term
  useEffect(() => {
    async function fetchCurrentTermData() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/date?cycle=${currentTerm}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to get data from the current term: ${currentTerm}`
          );
        }

        const data = await response.json();
        setCurrentTermData(data);
        console.log(data);
      } catch (error) {
        setCurrentTermData(TermDataInit);
      }
    }
    if (currentTerm !== "") {
      fetchCurrentTermData();
    }
  }, [currentTerm]);

  return (
    <div className="dates_and_terms">
      <div className="title-bar">
        <div className="row">
          <div className="col">
            <h1>
              <a onClick={() => navigate(-1)}>&lt;</a> Especificar Fechas
            </h1>
          </div>
          <div className="col">
            {isListOfTermsEmpty ? (
              <></>
            ) : (
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentTerm}
                </button>
                <ul className="dropdown-menu">
                  {listOfTerms.map((term, index) => (
                    <li key={index}>
                      <a
                        className="dropdown-item"
                        onClick={() => updateCurrentTerm(term.cycle)}
                      >
                        {term.cycle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Popup
              ref={popupRef}
              trigger={(open) => (
                <button type="button" className="btn btn-outline-primary">
                  Nuevo Ciclo +
                </button>
              )}
              modal
              nested
              closeOnDocumentClick={false}
            >
              {(close) => (
                <>
                  <h1 className="popup_title">Agregar Nuevo Ciclo</h1>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="number"
                      min="1993"
                      placeholder="Ingrese anio"
                      value={newCycle[0]}
                      onChange={(e) =>
                        setNewCycle([e.target.value, newCycle[1]])
                      }
                    />
                    <select
                      className="form-select"
                      value={newCycle[1]}
                      onChange={(e) =>
                        setNewCycle([newCycle[0], e.target.value])
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-primary"
                      onClick={onPopupClose}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        createNewCycle(newCycle[0] + "/" + newCycle[1])
                      }
                    >
                      Agregar
                    </button>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
      <div className="page_body">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Fechas Ordinarias
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="fisrt_date_ord">
                  <h2 className="first_date_text_ord">
                    Definir rango de fechas para subir protocolo
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          name="start_time_0"
                          className="form-control"
                          value={
                            currentTermData.start_recv_date_ord instanceof Date
                              ? currentTermData.start_recv_date_ord
                                  .toISOString()
                                  .slice(11, 16)
                              : currentTermData.start_recv_date_ord
                          }
                          id="start_time"
                        />
                        <button
                          className="btn btn-primary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        />
                        <ul className="dropdown-menu dropdown-menu-end">
                          {timesArray.map((time, index) => (
                            <li key={index}>
                              <a
                                className="dropdown-item"
                                onClick={() =>
                                  setTime(time, start_recv_date_ord)
                                }
                              >
                                {time}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="second_date_ord">
                  <h2 className="second_date_text_ord">
                    Definir rango de fechas para la clasificacion de protocolos
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="third_date_ord">
                  <h2 className="third_date_text_ord">
                    Definir rango de fechas para la evaluacion de protocolos
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="fourth_date_ord">
                  <h2 className="fourth_date_text_ord">
                    Definir rango de fechas para la correccion de protocolos
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="fifth_date_ord">
                  <h2 className="fifth_date_text_ord">
                    Definir rango de fechas para la evaluacion de correcciones
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                Fechas Extraordinarias
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="fisrt_date_ext">
                  <h2 className="first_date_text_ext">
                    Definir rango de fechas para subir protocolo
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="second_date_ext">
                  <h2 className="second_date_text_ext">
                    Definir rango de fechas para la clasificacion de protocolos
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="third_date_ext">
                  <h2 className="third_date_text_ext">
                    Definir rango de fechas para la evaluacion de protocolos
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="fourth_date_ext">
                  <h2 className="fourth_date_text_ext">
                    Definir rango de fechas para la correccion de protocolos
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
                <div className="fifth_date_ext">
                  <h2 className="fifth_date_text_ext">
                    Definir rango de fechas para la evaluacion de correcciones
                  </h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <span>al</span>
                    </div>
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="end_date"
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                        />
                      </div>
                    </div>
                    <div className="col-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label
              className={`btn ${
                isCloseCycleChecked ? "btn-outline-primary" : "btn-danger"
              }`}
              htmlFor="danger-outlined"
            >
              {isCloseCycleChecked ? "Desabilitar Periodo" : "Activar Periodo"}
            </label>
            <input
              type="checkbox"
              className="btn-check"
              name="options-outlined"
              id="danger-outlined"
              autoComplete="off"
              checked={isCloseCycleChecked}
              onChange={(e) => setIsCloseCycleChecked(e.target.checked)}
            />
          </div>
          <div className="col-4" />
          <div className="col">
            <button className="btn btn-outline-primary">
              Restablecer Datos
            </button>
            <button className="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
