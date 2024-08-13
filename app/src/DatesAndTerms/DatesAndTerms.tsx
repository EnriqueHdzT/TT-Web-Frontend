import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function DatesAndTerms() {
  const [currentTerm, setCurrentTerm] = useState("Ciclo Escolar");
  const [listOfTerms, setListOfTerms] = useState([]);
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
      <div className="title">
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
                      <a
                        className="dropdown-item"
                        key={term}
                        onClick={() => updateCurrentTerm(term)}
                      >
                        {term}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Popup
              trigger={open => (
                <button type="button" className="btn btn-outline-primary">
                  Nuevo Ciclo +
                </button>
              )}
              modal
              nested
            >
              {close => (
                <>
                  <h1 className="popup_title">Agregar Nuevo Ciclo</h1>
                  <input type="number" min="1993" placeholder={latestYear < 1993 ? ("Ingrese anio") : latestYear } />
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
    </div>
  );
}
