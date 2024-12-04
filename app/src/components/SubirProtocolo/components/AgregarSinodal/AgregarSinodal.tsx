import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus, faClose } from "@fortawesome/free-solid-svg-icons";

interface SinodalData {
  email: string;
}

interface DirectorData {
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  precedence: string | null;
  academy: string | null;
  cedula: File | null;
}

interface Props {
  sinodals: SinodalData[];
  directors: DirectorData[];
  setSinodals: React.Dispatch<React.SetStateAction<SinodalData[]>>;
}

export default function AgregarSinodal({ sinodals = [], directors = [], setSinodals }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [tooManySinodals, setTooManySinodals] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    if (sinodals.length >= 3) {
      setTooManySinodals(true);
    } else {
      setTooManySinodals(false);
    }
  }, [sinodals]);

  const togglePopup = () => {
    setEmail("");
    setShowWarning(false);
    setEmailIsValid(true);
    setEmailExists(false);
    setShowPopup(!showPopup);
    if (sinodals.length >= 3) {
      setTooManySinodals(true);
    }
  };

  const checkIfUserExists = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(ipn\.mx)$/;
      if (emailRegex.test(email)) {
        const response = await fetch(`http://127.0.0.1:8000/api/userExists/${email}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error al buscar el correo");
        }


        const res = await response.json();     
        const emailAlreadyExists = directors.some(
          (director) => director.email === email
        ) || sinodals.some(
          (sinodal) => sinodal.email === email
        );
        if (!emailAlreadyExists) {
          const newSinodal: SinodalData = {
            email: email,
            name: res.name,
            lastname: res.lastName,
            second_lastname: res.secondLastName,
          };
          setSinodals((prevSinodals) => [...prevSinodals, newSinodal]);
          togglePopup();
        }
        
        else {
          setEmailExists(true);
        }

      } else {
        setEmailIsValid(false);
      }
    } catch (error) {
      console.error(error);
      console.error("Error al buscar el correo");
      setShowWarning(true);
      setEmailIsValid(true);
    }
  };

  const handleAgregar = () => {
    const emailAlreadyExistsInDirectors = directors.some((director) => director.email === email);
    const emailAlreadyExistsInSinodals = sinodals.some((sinodal) => sinodal.email === email);
    if (!emailAlreadyExistsInDirectors && !emailAlreadyExistsInSinodals) {
      const newSinodal: SinodalData = {
        email: email,
      };
      setSinodals((prevSinodals) => [...prevSinodals, newSinodal]);

      togglePopup();
    } else {
      setEmailExists(true);
    }
    console.log(sinodals);
  };

  const handleSinodalDelete = (index: number) => {
    setSinodals((prevSinodals) => prevSinodals.filter((_, i) => i !== index));
  };

  return (
    <div className="item">
      <div className="tit-pr">Sinodal(es)</div>
      <div className="cont-pr">{sinodals.length > 0 ? (
         sinodals.map((sinodal, index) => (
           <div className="student" key={index}>
             <span className="student_name">
                  {sinodal.name || ""} {sinodal.lastname || ""}{" "}
                  {sinodal.second_lastname || ""}
                </span>
            <span className="student_email">{sinodal.email}</span>
            <button>
              <FontAwesomeIcon icon={faClose} className="icon" onClick={() => handleSinodalDelete(index)} />
            </button>
          </div>
        ))
      ) : (
        <p>Agrega los sinodales que participarán en el protocolo</p>
      )}
      </div>
      {!tooManySinodals && (
        <div className="icon-pr" onClick={togglePopup}>
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      )}
      {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
              <h1>Agregar Sinodal</h1>
              <div className="item3">
                <div className="adven-pro">
                  <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                  Todos los sinodales deben de existir en el sistema, si no lo estan puedes agregarlos en la seccion de
                  usuarios <br />
                  <br />
                </div>
                <div className="tit-1">
                  Correo Institucional
                  <input
                    type="email"
                    placeholder="Ingresa el correo institucional del director"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={checkIfUserExists}>Buscar</button>
                  {showWarning && (
                    <div className="adven">
                      <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                      El correo que has buscado no se encuentra registrado en la aplicación.{" "}
                    </div>
                  )}
                  {!emailIsValid && (
                    <div className="adven">
                      <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                      El correo no cumple con el formato esperado
                    </div>
                  )}
                  {emailExists && (
                    <div className="adven">
                      <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                      El correo ya se encuentra registrado en este protocolo
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
