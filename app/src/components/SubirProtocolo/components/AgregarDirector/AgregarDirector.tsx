import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus, faClose } from "@fortawesome/free-solid-svg-icons";

interface DirectorData {
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  precedence: string | null;
  cedula: File | null;
}
interface SinodalData {
  email: string;
}

interface Props {
  directors: DirectorData[];
  sinodals: SinodalData[];
  setDirectors: React.Dispatch<React.SetStateAction<DirectorData[]>>;
}

export default function AgregarDirector({ directors = [], sinodals = [], setDirectors }: Props) {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [Papellido, setPapellido] = useState("");
  const [Sapellido, setSapellido] = useState("");
  const [precedencia, setPrecedencia] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [tooManyDirectors, setTooManyDirectors] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [showExtraData, setShowExtraData] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    if (directors.length >= 2) {
      setTooManyDirectors(true);
    } else {
      setTooManyDirectors(false);
    }
  }, [directors]);

  useEffect(() => {
    const isEmailValid = email !== "" && /^[a-zA-Z0-9._%+-]+@(ipn\.mx)$/.test(email);
    const isNameValid = nombre !== "";
    const isPapellidoValid = Papellido !== "";
    const isPrecedenciaValid = precedencia !== "";
    const isCedulaValid = precedencia !== "ESCOM" ? selectedFile !== null : true;

    setSendButtonEnabled(
      isEmailValid && isNameValid && isPapellidoValid && isPrecedenciaValid && isCedulaValid
    );
  }, [email, nombre, Papellido, precedencia, selectedFile]);

  const togglePopup = () => {
    setEmail("");
    setNombre("");
    setPapellido("");
    setSapellido("");
    setPrecedencia("");
    setSelectedFile(null);
    setSendButtonEnabled(false);
    setShowWarning(false);
    setShowExtraData(false);
    setEmailIsValid(true);
    setEmailExists(false);
    setShowPopup(!showPopup);
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
        const emailAlreadyExists =
          directors.some((director) => director.email === email) || sinodals.some((sinodal) => sinodal.email === email);
        if (!emailAlreadyExists) {
          const newDirector: DirectorData = {
            email: email,
            name: res.name,
            lastname: res.lastName,
            second_lastname: res.secondLastName,
            precedence: null,
            cedula: null,
          };
          setDirectors((prevDirectors) => [...prevDirectors, newDirector]);
          togglePopup();
        } else {
          setEmailExists(true);
        }
      } else {
        setEmailIsValid(false);
      }
    } catch (error) {
      console.error("Error al buscar el correo");
      setShowWarning(true);
      setEmailIsValid(true);
      setShowExtraData(true);
    }
  };

  const handleAgregar = () => {
    const emailAlreadyExistsInDirectors = directors.some((director) => director.email === email);
    const emailAlreadyExistsInSinodals = sinodals.some((sinodal) => sinodal.email === email);

    if (!emailAlreadyExistsInDirectors && !emailAlreadyExistsInSinodals) {
      const newStudent: DirectorData = {
        email: email,
        name: nombre === "" ? null : nombre,
        lastname: Papellido === "" ? null : Papellido,
        second_lastname: Sapellido === "" ? null : Sapellido,
        precedence: precedencia === "" ? null : precedencia,
        cedula: selectedFile,
      };
      setDirectors((prevStudents) => [...prevStudents, newStudent]);

      togglePopup();
    } else {
      setEmailExists(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target as HTMLInputElement;
    if (targetFile.files) {
      const file = targetFile.files[0];
      const maxFileSize = 6 * 1024 * 1024;

      if (file.size <= maxFileSize) {
        setSelectedFile(file);
      } else {
        alert("El archivo debe pesar menos de 6MB.");
      }
    }
  };

  const handleDirectorDelete = (index: number) => {
    setDirectors((prevDirectors) => prevDirectors.filter((_, i) => i !== index));
  };

  return (
    <div className="item">
      <div className="tit-pr">Director(es)</div>
      <div className="cont-pr">
        {directors.length > 0 ? (
          directors.map((director, index) => (
            <div className="student" key={index}>
              <span className="student_name">
                {director.name || ""} {director.lastname || ""} {director.second_lastname || ""}
              </span>
              <span className="student_email">{director.email}</span>
              <button>
                <FontAwesomeIcon icon={faClose} className="icon" onClick={() => handleDirectorDelete(index)} />
              </button>
            </div>
          ))
        ) : (
          <p>Agrega los directores que participarán en el protocolo</p>
        )}
      </div>
      {!tooManyDirectors && (
        <div className="icon-pr" onClick={togglePopup}>
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      )}
      {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
              <h1>Agregar Director</h1>
              <div className="item3">
                {directors.length === 0 && (
                  <div className="adven-pro">
                    <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                    Recuerda que el primer director debe pertenecer a la ESCOM, ademas de estar registrado en la
                    aplicación. Si este no se encuentra en el sistema acude a la CATT <br />
                    <br />
                  </div>
                )}
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
                {showExtraData && directors.length !== 0 && (
                  <div className="container">
                    <div className="tit-2">
                      Nombre(s){" "}
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>
                    <div className="tit-2">
                      Primer apellido{" "}
                      <input
                        type="text"
                        placeholder="Ingresa el primer apellido"
                        value={Papellido}
                        onChange={(e) => setPapellido(e.target.value)}
                      />
                    </div>
                    <div className="tit-2">
                      Segundo apellido{" "}
                      <input
                        type="text"
                        placeholder="Ingresa el segundo apellido"
                        value={Sapellido}
                        onChange={(e) => setSapellido(e.target.value)}
                      />
                    </div>
                    <div className="tit-2">
                      Escuela{" "}
                      <input
                        type="text"
                        placeholder="Ingresa el nombre de la escuela de precedencia"
                        value={precedencia}
                        onChange={(e) => setPrecedencia(e.target.value)}
                      />
                    </div>
                    {precedencia !== "ESCOM" && (
                      <>
                        <div className="tit-1">
                          <div className="adven">
                            <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
                            No olvides agregar la cédula del profesor para asi generar su dada de alta en el sistema.
                          </div>
                        </div>
                        <div className="tit-3">
                          Cedula{" "}
                          <div className="button-upload">
                            <label htmlFor="file-upload" className="custom-file-upload">
                              Selecciona un archivo
                            </label>
                            <input id="file-upload" type="file" onChange={handleFileUpload} />{" "}
                            {selectedFile && <div className="ar-file">Archivo seleccionado: {selectedFile.name}</div>}
                          </div>
                        </div>
                      </>
                    )}
                    <div className="adven">
                      <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> Recuerda que el archivo no
                      debe pesar más de 6mb y debe pertenecer a un formato PDF
                    </div>
                  </div>
                )}

                <div className="b-agregar">
                  <button onClick={handleAgregar} disabled={!sendButtonEnabled}>
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
