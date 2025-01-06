import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCirclePlus,
  faClose,
} from "@fortawesome/free-solid-svg-icons";

interface StudentData {
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  student_id: string | null;
  career: string | null;
  curriculum: string | null;
}

interface Props {
  students: StudentData[];
  setStudents: React.Dispatch<React.SetStateAction<StudentData[]>>;
}

export default function AgregarAlumnos({ students, setStudents }: Props) {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [Papellido, setPapellido] = useState("");
  const [Sapellido, setSapellido] = useState("");
  const [boleta, setBoleta] = useState("");
  const [carrera, setCarrera] = useState("");
  const [planestudio, setPlanestudio] = useState("");
  const [sendButtonEnabled, setSendButtonEnabled] = useState(false);
  const [showExtraData, setShowExtraData] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [tooManyStudents, setTooManyStudents] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  useEffect(() => {
    if (students.length >= 4) {
      setTooManyStudents(true);
    } else {
      setTooManyStudents(false);
    }
  }, [students]);

  const checkIfUserExists = async () => {
    try {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(alumno\.ipn\.mx)$/;
      if (emailRegex.test(email)) {
        const response = await fetch(
          `http://127.0.0.1:8000/api/userExists/${email}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al buscar el correo");
        }

        const res = await response.json();
        const emailAlreadyExists = students.some(
          (student) => student.email === email
        );
        if (!emailAlreadyExists) {
          const newStudent: StudentData = {
            email: email,
            name: res.name,
            lastname: res.lastName,
            second_lastname: res.secondLastName,
            student_id: null,
            career: null,
            curriculum: null,
          };
          setStudents((prevStudents) => [...prevStudents, newStudent]);
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

  const togglePopup = () => {
    setEmail("");
    setNombre("");
    setPapellido("");
    setSapellido("");
    setBoleta("");
    setCarrera("");
    setPlanestudio("2020");
    setSendButtonEnabled(false);
    setShowWarning(false);
    setShowExtraData(false);
    setEmailIsValid(true);
    setEmailExists(false);

    setShowPopup(!showPopup);
  };

  const handleAgregar = () => {
    const emailAlreadyExists = students.some(
      (student) => student.email === email
    );
    if (!emailAlreadyExists) {
      const newStudent: StudentData = {
        email: email,
        name: nombre || null,
        lastname: Papellido || null,
        second_lastname: Sapellido || null,
        student_id: boleta && boleta.length === 10 ? boleta : null,
        career: carrera || null,
        curriculum: carrera && carrera !== "ISW" ? "2020" : planestudio || null,
      };
      setStudents((prevStudents) => [...prevStudents, newStudent]);

      togglePopup();
    } else {
      setEmailExists(true);
    }
  };

  const handleStudentDelete = (index: number) => {
    setStudents((prevStudents) => prevStudents.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const isEmailValid =
      email !== "" &&
      /^[a-zA-Z0-9._%+-]+@(alumno\.ipn\.mx|ipn\.mx)$/.test(email);
    const isNameValid = nombre !== "";
    const isPapellidoValid = Papellido !== "";
    const isBoletaValid = boleta !== "" && boleta.length === 10;
    const isCarreraValid =
      carrera !== "" && ["ISW", "IIA", "LCD"].includes(carrera);
    const isPlanEstudiosValid = carrera !== "ISW" ? planestudio !== "" : true;

    setSendButtonEnabled(
      isEmailValid &&
        isNameValid &&
        isPapellidoValid &&
        isBoletaValid &&
        isCarreraValid &&
        isPlanEstudiosValid
    );
  }, [email, nombre, Papellido, Sapellido, boleta, carrera, planestudio]);

  return (
    <div className="item">
      <div className="tit-pr">Alumno(s)</div>
      <div className="cont-pr">
        {students.length > 0 ? (
          students.map((alumno, index) => (
            <div className="student" key={index}>
              <div className="student_info">
                <span className="student_name">
                  {alumno.name || ""} {alumno.lastname || ""}{" "}
                  {alumno.second_lastname || ""}
                </span>
                <span className="student_email">{alumno.email}</span>
              </div>
              {!(userType === "Student" && index === 0 ) && (
                <button>
                  <FontAwesomeIcon
                    icon={faClose}
                    className="icon"
                    onClick={() => handleStudentDelete(index)}
                  />
                </button>
              )}
            </div>
          ))
        ) : (
          <p>Agrega los alumnos que participarán en el protocolo</p>
        )}
      </div>

      {!tooManyStudents && (
        <div className="icon-pr" onClick={togglePopup}>
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      )}
      {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup_content">
              <h1>Agregar Alumno</h1>
              <div className="item3">
                <div className="tit-1">
                  Correo Institucional{" "}
                  <input
                    type="email"
                    placeholder="Ingresa el correo institucional del alumno"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button onClick={checkIfUserExists}>Buscar</button>
                  {showWarning && (
                    <div className="adven">
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="adv-icon"
                      />
                      El correo institucional que has buscado no se encuentra
                      registrado en la aplicación. Ingresa los siguientes datos
                      para continuar
                    </div>
                  )}
                  {!emailIsValid && (
                    <div className="adven">
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="adv-icon"
                      />
                      El correo no cumple con el formato esperado
                    </div>
                  )}
                  {emailExists && (
                    <div className="adven">
                      <FontAwesomeIcon
                        icon={faCircleExclamation}
                        className="adv-icon"
                      />
                      El correo ya se encuentra registrado en este protocolo
                    </div>
                  )}
                </div>

                {showExtraData && (
                  <>
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
                      Boleta{" "}
                      <input
                        type="text"
                        placeholder="Boleta"
                        value={boleta}
                        onChange={(e) => setBoleta(e.target.value)}
                      />
                    </div>
                    <div className="tit-2">
                      Carrera{" "}
                      <div>
                        <select
                          value={carrera}
                          onChange={(e) => setCarrera(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Selecciona la carrera a la que pertenece el alumnno
                          </option>
                          <option value="ISW">
                            Ingeniería en Sistemas Computacionales
                          </option>
                          <option value="IIA">
                            Ingeniería en Inteligencia Artificial
                          </option>
                          <option value="LCD">
                            Licenciatura en Ciencia de Datos
                          </option>
                        </select>
                      </div>
                    </div>
                    {carrera === "ISW" && (
                      <div className="tit-2">
                        Plan de estudio{" "}
                        <div>
                          <select
                            value={planestudio}
                            className="ojio"
                            onChange={(e) => setPlanestudio(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Selecciona el plan al que pertenece el alumnno
                            </option>
                            <option value="2009">2009</option>
                            <option value="2020">2020</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="b-agregar">
                <button onClick={handleAgregar} disabled={!sendButtonEnabled}>
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
