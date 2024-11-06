import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AgregarPalabras() {
    const [showPopup, setShowPopup] = useState(false);
    const [carrera, setCarrera] = useState('');
    const [palabra, setPalabra] = useState('');
    

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    const handleAgregar = () => {
        // Aquí se envian a la base de datos ssdasd.
        console.log('Valores ingresados:', { palabra, carrera });
    
        // Cerrar el Popup
        setShowPopup(false);
      };


return(

            <div className="item">
<div className="tit-pr">Palabras Clave</div>
            <div className="cont-pr">Ingresa las palabras clave</div>
            <div className="icon-pr" onClick={togglePopup}><FontAwesomeIcon icon={faCirclePlus} className="icon" /></div>
            {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
            <h1>Agregar Palabras Clave</h1>
            <div className="item3">
              <div className="tit-2">Palabra Clave <input type="text" placeholder="Ingresa palabras clave" value={palabra} onChange={(e) => setPalabra(e.target.value)} />
              </div>
              <div className="tit-1"><div className="adven"><FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> 
              Recuerda que la palabra clave debe estar directamente relacionada con tu protocolo, sin exceder en los caracteres especificados en los requerimientos.</div></div>
               </div>
              <div className="b-agregar"><button onClick={handleAgregar}>Agregar</button></div>
            </div>
          </div>
        </div>
      )}
</div>
    )
}