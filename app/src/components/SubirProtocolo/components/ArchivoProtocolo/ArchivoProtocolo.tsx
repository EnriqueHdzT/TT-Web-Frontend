import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface Props {
  pdf: File | null;
  setPdf: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function ArchivoProtocolo({ pdf = null, setPdf }: Props) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      setPdf(file);
    }
  };

  return (
    <div className="item2">
      <div className="tit-pr">Protocolo</div>
      <div className="cont-pr">
        <div className="button-upload">
          Sube el archivo de tu protocolo en formato PDF
          <label htmlFor="file-upload" className="custom-file-upload">
            Selecciona un archivo
          </label>
          <input id="file-upload" type="file" onChange={handleFileUpload} />{" "}
          {pdf && <div className="ar-file">Archivo seleccionado: {pdf?.name}</div>}
        </div>
        <div className="adv-pr">
          <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> Recuerda que el protocolo no debe pesar
          más de 6mb y debe pertenecer a un formato PDF
        </div>
      </div>
    </div>
  );
}
