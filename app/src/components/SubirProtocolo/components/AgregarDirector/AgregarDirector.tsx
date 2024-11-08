import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AgregarDirector() {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [Papellido, setPapellido] = useState('');
    const [Sapellido, setSapellido] = useState('');
    const [carrera, setCarrera] = useState('');
    const [otro, setOtro] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    

    const togglePopup = () => {
      setShowPopup(!showPopup);
    };
  
    const handleAgregar = () => {
        // Aquí se envian a la base de datos ssdasd.
        console.log('Valores ingresados:', { email, nombre, Papellido, Sapellido, carrera, otro });
    
        // Cerrar el Popup
        setShowPopup(false);
      };

      const handleFileUpload = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        setSelectedFile(file); // Almacena el archivo seleccionado en el estado
        console.log('Archivo seleccionado:', file);
        // Aquí puedes realizar alguna acción con el archivo, como enviarlo a un servidor
      };

return(

 <div className="item">
  <div className="tit-pr">Director(es)</div>
  <div className="cont-pr">Agrega los directores que participarán en el protocolo</div>
  <div className="icon-pr" onClick={togglePopup}><FontAwesomeIcon icon={faCirclePlus} className="icon" /></div>
            {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
            <h1>Agregar Director</h1>
            <div className="item3">
              <div className="tit-1">Correo Institucional<input type="email" placeholder="Ingresa el correo institucional del director" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button>Buscar</button>
              <div className="adven"><FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> 
              El correo que has buscado no se encuentra registrado en la aplicación. Se enviará una notificación a su correo electrónico, o en cualquier otro caso acude directamente a la CATT.
              </div>
              </div>
              <div className="tit-2">Nombre(s) <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
              <div className="tit-2">Primer apellido <input type="text" placeholder="Ingresa el primer apellido" value={Papellido} onChange={(e) => setPapellido(e.target.value)} /></div>
              <div className="tit-2">Segundo apellido <input type="text" placeholder="Ingresa el segundo apellido" value={Sapellido} onChange={(e) => setSapellido(e.target.value)} /></div>
               <div className="tit-2">Escuela <div className='espa-d'><select className="s-es" value={carrera} onChange={(e) => setCarrera(e.target.value)}>
                <option value="">Selecciona la procedencia del director</option>
                <option value="escom">ESCOM</option>
                <option value="cidetec">CIDETEC</option>
                <option value="otro">Otro</option>
              </select> </div><div className='o-v'><input type="text" placeholder="Otro valor" value={otro} onChange={(e) => setOtro(e.target.value)} /></div>
              </div>
              <div className="tit-1"><div className="adven"><FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> 
              Al seleccionar otra escuela, especifica el nombre de su procedencia. No olvides agregar la cédula del profesor con los datos requeridos para su dada de alta en el sistema.</div></div>
              <div className="tit-3">Cedula    <div className="button-upload">
      <label htmlFor="file-upload" className="custom-file-upload">
       Selecciona un archivo</label>
      <input id="file-upload" type="file" onChange={handleFileUpload} /> {selectedFile && <div className='ar-file'>Archivo seleccionado: {selectedFile.name}</div>}
    </div>
              </div>
              </div>
              <div className="b-agregar"><button onClick={handleAgregar}>Agregar</button></div>
            </div>
          </div>
        </div>
      )}
</div>
)
}