import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function DatesAndTerms() {
  const [currentTerm, setCurrentTerm] = useState("Ciclo Escolar");
  const [listOfTerms, setListOfTerms] = useState(["2024-1"]);
  const [isListOfTermsEmpty, setIsListOfTermsEmpty] = useState(true);
  const [latestYear, setLatestYear] = useState(0);

  const updateCurrentTerm = (newTerm: string) => {
    setCurrentTerm(newTerm);
  };

  useEffect(() => {
    setIsListOfTermsEmpty(listOfTerms.length === 0);
  }, [listOfTerms]);

  console.log("isListOfTermsEmpty: ", isListOfTermsEmpty);

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
                  {listOfTerms.map((term) => (
                    <li>
                      <a className="dropdown-item" key={term} onClick={() => updateCurrentTerm(term)}>
                        {term}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Popup
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
                    <input className="form-control" type="number" min="1993" placeholder={latestYear < 1993 ? "Ingrese anio" : latestYear} />
                    <select className="form-select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div>
                    <button className="btn btn-outline-primary" onClick={close}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary">Agregar</button>
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
          <input type="date" id="start_date" />
          <input type="time" id="start_time" />
          <span>al</span>
          <input type="date" id="end_date" />
          <input type="time" id="end_time" />
        </div>
        <div className="second_date">
          <h2 className="second_date_text">Definir rango de fechas para la clasificacion de protocolos</h2>
          <input type="date" id="start_date" />
          <input type="time" id="start_time" />
          <span>al</span>
          <input type="date" id="end_date" />
          <input type="time" id="end_time" />
        </div>
        <div className="third_date">
          <h2 className="third_date_text">Definir rango de fechas para la evaluacion de protocolos</h2>
          <input type="date" id="start_date" />
          <input type="time" id="start_time" />
          <span>al</span>
          <input type="date" id="end_date" />
          <input type="time" id="end_time" />
        </div>
        <div className="fourth_date">
          <h2 className="fourth_date_text">Definir fecha de cierre de ciclo</h2>
          <input type="date" id="closing_date" />
          <input type="time" id="closing_time" />
        </div>
        <button className="btn btn-outline-danger">Cerrar Ciclo</button>
        <button className="btn btn-outline-primary">Restablecer Datos</button>
        <button className="btn btn-primary">Guardar</button>
      </div>
    </div>
  );
}
