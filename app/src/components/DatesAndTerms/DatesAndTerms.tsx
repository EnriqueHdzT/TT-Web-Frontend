import { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function DatesAndTerms() {
  const popupRef = useRef(null);
  const [currentTerm, setCurrentTerm] = useState("");
  const [currentTermData, setCurrentTermData] = useState([]);
  const [listOfTerms, setListOfTerms] = useState([]);
  const [isListOfTermsEmpty, setIsListOfTermsEmpty] = useState(true);
  const [newCycle, setNewCycle] = useState(["", "1"]);

  const updateCurrentTerm = (newTerm: string) => {
    setCurrentTerm(newTerm);
    updateUrlCycleParam(newTerm);
  };

  const updateUrlCycleParam = (newCycle: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("cycle", newCycle);
    window.history.replaceState({}, "", url.toString());
  };

  const createNewCycle = async (newCycle: string) => {
    try {
      const formData = new FormData();
      formData.append("cycle", newCycle);
      const response = await fetch("http://127.0.0.1:8000/api/dates", {
        method: "POST",
        headers: {
          Accept: "application/json"
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
          const [yearA, semesterA] = a.cycle.split('/').map(Number);
          const [yearB, semesterB] = b.cycle.split('/').map(Number);
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

  // Get the list of terms from DB
  useEffect(() => {
    async function fetchListOfTerms() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/dates/all", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get the list of terms");
        }

        const termsList = await response.json();
        setIsListOfTermsEmpty(false);
        setListOfTerms(termsList);
        const urlParams = new URLSearchParams(window.location.search);
        const urlCycle = urlParams.get("cycle");
        if (!urlCycle || !termsList.some((term) => term.cycle === urlCycle)) {
          setCurrentTerm(termsList[0].cycle);
          updateUrlCycleParam(termsList[0].cycle);
        } else {
          setCurrentTerm(urlCycle);
        }
      } catch {
        setListOfTerms([]);
      }
    }
    fetchListOfTerms();
  }, []);

  // Get data for the chosen term
  useEffect(() => {
    async function fetchCurrentTermData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/dates?cycle=${currentTerm}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to get data from the current term: ${currentTerm}`);
        }

        const data = await response.json();
        setCurrentTermData(data);
      } catch (error) {
        setCurrentTermData([]);
      }
    }
    fetchCurrentTermData();
  }, [currentTerm]);

  return (
    <div className="dates-and-terms" style={{ paddingTop: "100px" }}>
      <div className="title-bar">
        <div className="row">
          <div className="col">
            <h1>
              <a>&lt;</a> Especificar Fechas
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
                      <a className="dropdown-item" onClick={() => updateCurrentTerm(term.cycle)}>
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
                      onChange={(e) => setNewCycle([e.target.value, newCycle[1]])}
                    />
                    <select
                      className="form-select"
                      value={newCycle[1]}
                      onChange={(e) => setNewCycle([newCycle[0], e.target.value])}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div>
                    <button className="btn btn-outline-primary" onClick={close}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => createNewCycle(newCycle[0] + "/" + newCycle[1])}>
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
        <div className="fisrt_date">
          <h2 className="first_date_text">Definir rango de fechas para subir protocolo</h2>
          <div className="row">
            <div className="col">
              <div className="input-group">
                <input type="date" className="form-control" id="start_date" />
                <input type="time" className="form-control" id="start_time" />
              </div>
            </div>
            <div className="col-auto">
              <span>al</span>
            </div>
            <div className="col">
              <div className="input-group">
                <input type="date" className="form-control" id="end_date" />
                <input type="time" className="form-control" id="end_time" />
              </div>
            </div>
          </div>
        </div>
        <div className="second_date">
          <h2 className="second_date_text">Definir rango de fechas para la clasificacion de protocolos</h2>
          <div className="row">
            <div className="col">
              <div className="input-group">
                <input type="date" className="form-control" id="start_date" />
                <input type="time" className="form-control" id="start_time" />
              </div>
            </div>
            <div className="col-auto">
              <span>al</span>
            </div>
            <div className="col">
              <div className="input-group">
                <input type="date" className="form-control" id="end_date" />
                <input type="time" className="form-control" id="end_time" />
              </div>
            </div>
          </div>
        </div>
        <div className="third_date">
          <h2 className="third_date_text">Definir rango de fechas para la evaluacion de protocolos</h2>
          <div className="row">
            <div className="col">
              <div className="input-group">
                <input type="date" className="form-control" id="start_date" />
                <input type="time" className="form-control" id="start_time" />
              </div>
            </div>
            <div className="col-auto">
              <span>al</span>
            </div>
            <div className="col">
              <div className="input-group">
                <input type="date" className="form-control" id="end_date" />
                <input type="time" className="form-control" id="end_time" />
              </div>
            </div>
          </div>
        </div>
        <div className="fourth_date">
          <h2 className="fourth_date_text">Definir fecha de cierre de ciclo</h2>
          <div className="col-3">
            <div className="input-group">
              <input type="date" className="form-control" id="closing_date" />
              <input type="time" className="form-control" id="closing_time" />
            </div>
          </div>
        </div>
        <button className="btn btn-outline-danger">Cerrar Ciclo</button>
        <button className="btn btn-outline-primary">Restablecer Datos</button>
        <button className="btn btn-primary">Guardar</button>
      </div>
    </div>
  );
}
