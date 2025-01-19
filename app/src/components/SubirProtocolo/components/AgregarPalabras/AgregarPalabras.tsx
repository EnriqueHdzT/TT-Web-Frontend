import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus, faClose } from "@fortawesome/free-solid-svg-icons";

interface Props {
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  disableButtons: boolean;
}

export default function AgregarPalabras({ keywords = [], setKeywords, disableButtons }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [tooManyKeywords, setTooManyKeywords] = useState(false);
  const [palabra, setPalabra] = useState("");

  useEffect(() => {
    if (keywords.length >= 4) {
      setTooManyKeywords(true);
    } else {
      setTooManyKeywords(false);
    }
  }, [keywords]);

  const togglePopup = () => {
    setPalabra("");
    setShowPopup(!showPopup);
  };

  const handleAgregar = () => {
    if (palabra.trim() !== "") {
      setKeywords((prevKeywords) => {
        const newKeywords = [...prevKeywords];
        newKeywords.push(palabra);
        newKeywords.sort((a, b) => a.localeCompare(b));
        return newKeywords;
      });
      togglePopup();
    }
  };

  const handleKeywordDelete = (index: number) => {
    setKeywords((prevDirectors) => prevDirectors.filter((_, i) => i !== index));
  };

  return (
    <div className="item">
      <div className="tit-pr">Palabras Clave</div>
      <div className="cont-pr">
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <div className="keyword" key={index}>
              <div className="kw">{keyword}</div>
              {!disableButtons && (
                <button>
                  <FontAwesomeIcon icon={faClose} className="icon" onClick={() => handleKeywordDelete(index)} />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Ingresa las palabras clave</p>
        )}
      </div>
      {!(tooManyKeywords || disableButtons) && (
        <div className="icon-pr" onClick={togglePopup}>
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      )}
      {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
              <div className="pl">
                {" "}
                <h1>Agregar Palabras Clave</h1>
              </div>
              <div className="item3">
                <div className="tit-2">
                  Palabra Clave{" "}
                  <input
                    type="text"
                    placeholder="Ingresa palabras clave"
                    value={palabra}
                    onChange={(e) => setPalabra(e.target.value)}
                  />
                </div>
                <div className="tit-1">
                  <div className="adven">
                    <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                    Recuerda que la palabra clave debe estar directamente relacionada con tu protocolo, sin exceder en
                    los caracteres especificados en los requerimientos.
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
