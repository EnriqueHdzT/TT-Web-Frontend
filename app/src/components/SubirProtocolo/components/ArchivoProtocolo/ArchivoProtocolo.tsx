import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function ArchivoProtocolo() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        setSelectedFile(file); // Almacena el archivo seleccionado en el estado
        console.log('Archivo seleccionado:', file);
        // Aquí puedes realizar alguna acción con el archivo, como enviarlo a un servidor
      };

    return(

        <div className="item2">
            <div className="tit-pr">Protocolo</div>
            <div className="cont-pr"> <div className="button-upload">Sube el archivo de tu protocolo en formato PDF
      <label htmlFor="file-upload" className="custom-file-upload">
       Selecciona un archivo</label>
      <input id="file-upload" type="file" onChange={handleFileUpload} /> {selectedFile && <div className='ar-file'>Archivo seleccionado: {selectedFile.name}</div>}
    </div>

            <div className="adv-pr"><FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> Recuerda que el protocolo no debe pesar más de 6mb y debe pertenecer a un formato PDF</div>
            </div>    
        </div>


    )
}