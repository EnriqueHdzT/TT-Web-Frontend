import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AgregarSinodal() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAgregar = () => {
    // Cerrar el Popup
    setShowPopup(false);
  };

  return (
    <div className="item">
      <div className="tit-pr">Sinodal(es)</div>
      <div className="cont-pr">Agrega los sinodales que participarán en el protocolo</div>
      <div className="icon-pr" onClick={togglePopup}>
        <FontAwesomeIcon icon={faCirclePlus} className="icon" />
      </div>
      {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
              <h1>Agregar Sinodal</h1>
              <div className="item3">
                <div className="tit-1">
                  Correo Institucional
                  <input
                    type="email"
                    placeholder="Ingresa el correo institucional del director"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button>Buscar</button>
                  <div className="adven">
                    <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                    Si el sinodal no esta registrado en el sistema, puedes agregarlo en la seccion de usuarios
                  </div>
                </div>
              </div>
              <div className="b-agregar">
                <button onClick={handleAgregar}>Agregar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
