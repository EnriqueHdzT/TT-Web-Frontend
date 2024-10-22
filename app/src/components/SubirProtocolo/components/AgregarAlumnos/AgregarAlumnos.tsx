import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function AgregarAlumnos() {
  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [Papellido, setPapellido] = useState("");
  const [Sapellido, setSapellido] = useState("");
  const [boleta, setBoleta] = useState("");
  const [carrera, setCarrera] = useState("");
  const [planestudio, setPlanestudio] = useState("");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleAgregar = () => {
    // Aquí se envian a la base de datos ssdasd.
    console.log("Valores ingresados:", {
      email,
      nombre,
      Papellido,
      Sapellido,
      boleta,
      carrera,
      planestudio,
    });

    // Cerrar el Popup
    setShowPopup(false);
  };

  return (
    <div className="item">
      <div className="tit-pr">Alumnos</div>
      <div className="cont-pr">
        Agrega a los alumnos que participarán en el protocolo
      </div>
      <div className="icon-pr" onClick={togglePopup}>
        <FontAwesomeIcon icon={faCirclePlus} className="icon" />
      </div>
      {showPopup && (
        <div className="popup-background" onClick={togglePopup}>
          <div className="popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-content">
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
                  <button>Buscar</button>
                  <div className="adven">
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="adv-icon"
                    />
                    El correo institucional que has buscado no se encuentra
                    registrado en la aplicación. Se enviará una notificación a
                    su correo electrónico, o en cualquier otro caso acude
                    directamente a la CATT.
                  </div>
                </div>
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
                      <option value="">
                        Selecciona la carrera a la que pertenece el alumnno
                      </option>
                      <option value="ISC">
                        Ingeniería en Sistemas Computacionales
                      </option>
                      <option value="IA">
                        Ingeniería en Inteligencia Artificial
                      </option>
                      <option value="LCD">
                        Licenciatura en Ciencia de Datos
                      </option>
                    </select>
                  </div>
                </div>
                <div className="tit-2">
                  Plan de estudio{" "}
                  <div>
                    <select
                      value={planestudio}
                      className="ojio"
                      onChange={(e) => setPlanestudio(e.target.value)}
                    >
                      <option value="">
                        Selecciona el plan al que pertenece el alumnno
                      </option>
                      <option value="pv">Plan 20</option>
                      <option value="pn">Plan de 2009</option>
                      <option value="pvv">Plan de 2020</option>
                    </select>
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
