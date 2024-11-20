import "./VerProtocolos.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Protocolinfo from "./components/Protocolinfo";

export default function VerProtocolos() {
    const [ordenProtocol, setOrdenProtocol] = useState("Ordenar");
    const listOfOrden = {
      "A validar": "waiting",
      "Validado": "validated",
      "Activo": "active",
      "Aplazado": "classified",
      "Cancelado": "canceled"
    };
    const [isListOfOrden, setIsListOfOrden] = useState(true);
    const [ordenPeriodo, setOrdenPeriodo] = useState("Periodo");
    const listOfPeriodo = ["2024-1","2024-2","2023-1","2023-2"];
    const [isListOfPeriodo, setIsListOfPeriodo] = useState(true);
    const [protocols, setProtocols] = useState([]);
    const [loading, setLoading] = useState(false); 
    const [currentPeriod, setCurrentPeriod] = useState("2024-1");
    const [currentOrder, setCurrentOrder] = useState("");
  
    const updateOrdenProtocol = (newTerm: string) => {
      setOrdenProtocol(newTerm);
    };

    const updateOrdenPeriodo = (newTerm: string) => {
        setOrdenPeriodo(newTerm);
      };
  
    useEffect(() => {
      setIsListOfOrden(Object.keys(listOfOrden).length === 0);
    }, [listOfOrden]);

    useEffect(() => {
        setIsListOfPeriodo(listOfPeriodo.length === 0);
      }, [listOfPeriodo]);

    async function fetchProtocols(){
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const params = new URLSearchParams({ 
          cycle: currentPeriod,
          orderBy: listOfOrden[currentOrder], 
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

      } catch (error) {
          console.log(error);
      } finally {
          setLoading(false);
      }
    };
    console.log(currentPeriod)
    useEffect(()=>{
        fetchProtocols();
    }, [currentOrder, currentPeriod]);

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
                  {Object.keys(listOfOrden).map((term) => (
                    <li>
                      <a className="dropdown-item" key={term} onClick={(e)=>{
                        e.preventDefault();
                        setCurrentOrder(e.target.innerText);
                      }}>
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
                      <a className="dropdown-item" key={term} onClick={(e)=>{
                        e.preventDefault();
                        setCurrentPeriod(e.target.innerText);
                      }}>
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
          {protocols.map((protocol) => (
            <Protocolinfo
              idProtocol = {protocol.protocol_id}
              titleProtocol = {protocol.title}
              statusProtocol = {protocol.status}
              // studentList = {protocol.studentList}
              // directorList = {protocol.directorList}
              // sinodalList = {protocol.sinodalList}
            />
          ))}
           



        </div>
    )

}