import "./Protocolinfo.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Protocolinfo({
    titleProtocol = null,
    idProtocol = null,
    idBoleta = null,
    name = null,
    userType = null,
  }) {
    

  return (
    <div className="p-box">
        <div className="p-tit">titul protocolo{titleProtocol} <br></br>id del protocolo{idProtocol}</div>
        <div className="p-buttons">
        <Popup
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
            </Popup>
            <button type="button" className="btn btn-outline-primary">
                  Documento
            </button>
        </div>
        <div className="p-info">
            <div className="p-alumn">alumno - boleta 1 {name} {idBoleta}</div>
            <div className="p-director">director - escuela/academia{name} {userType}</div>
            <div className="p-sinodal">sinodal - academia{name} {userType}</div>
        </div>
        <div className="p-statu"><button type="button" className="btn btn-outline-primary">
                  Status
            </button></div>
    </div>
    
  );
}
