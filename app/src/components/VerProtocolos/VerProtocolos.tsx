import "./VerProtocolos.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Protocolinfo from "./components/Protocolinfo";

const Protocolos={{
  titleProtocol = null,
  idProtocol = null,
  {
    name = null,
    idBoleta = null,

  },
  idBoleta = null,
  userType = null,
  statusProtocol,


}}

export default function VerProtocolos() {
    const [ordenProtocol, setOrdenProtocol] = useState("Ordenar");
    const [listOfOrden, setListOfOrden] = useState(["A validar","Activo","Aplazado","Cancelado"]);
    const [isListOfOrden, setIsListOfOrden] = useState(true);
    const [ordenPeriodo, setOrdenPeriodo] = useState("Periodo");
    const [listOfPeriodo, setListOfPeriodo] = useState(["2024-A","2023-B","2023-A","2022-B"]);
    const [isListOfPeriodo, setIsListOfPeriodo] = useState(true);
  
    const updateOrdenProtocol = (newTerm: string) => {
      setOrdenProtocol(newTerm);
    };

    const updateOrdenPeriodo = (newTerm: string) => {
        setOrdenPeriodo(newTerm);
      };
  
    useEffect(() => {
      setIsListOfOrden(listOfOrden.length === 0);
    }, [listOfOrden]);
  
    console.log("isListOfOrden: ", isListOfOrden);

    useEffect(() => {
        setIsListOfPeriodo(listOfPeriodo.length === 0);
      }, [listOfPeriodo]);
    
      console.log("isListOfPeriodo: ", isListOfPeriodo);

    return(
        <div>
            <div className="headprotocolo">
            <div className="tl-p">Viendo Protocolos</div>
          <div className="col-p">
            {isListOfOrden ? (
              <></>
            ) : (
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {ordenProtocol}
                </button>
                <ul className="dropdown-menu">
                  {listOfOrden.map((term) => (
                    <li>
                      <a className="dropdown-item" key={term} onClick={() => updateOrdenProtocol(term)}>
                        {term}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {isListOfPeriodo ? (
              <></>
            ) : (
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {ordenPeriodo}
                </button>
                <ul className="dropdown-menu">
                  {listOfPeriodo.map((term) => (
                    <li>
                      <a className="dropdown-item" key={term} onClick={() => updateOrdenPeriodo(term)}>
                        {term}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
                <button type="button" className="btn btn-outline-primary">
                  Agregar Protocolo +
                </button>
          </div>
          </div>
          {}
           <Protocolinfo 
            />



        </div>
    )

}