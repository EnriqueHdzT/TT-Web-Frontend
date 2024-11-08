import "./VerInfo.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faSave,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function VerInfo() {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
    setUserId(window.location.href.split("/")[4]);
  }, []);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);
  const [isEditingSecondLastName, setIsEditingSecondLastName] = useState(false);
  const [isEditingBoleta, setIsEditingBoleta] = useState(false);
  const [isEditingCarrera, setIsEditingCarrera] = useState(false);
  const [isEditingPEstudio, setIsEditingPEstudio] = useState(false);
  const [isEditingProcedencia, setIsEditingProcedencia] = useState(false);
  const [isEditingAcademia, setIsEditingAcademia] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingEmailper, setIsEditingEmailper] = useState(false);
  const [isEditingTelefono, setIsEditingTelefono] = useState(false);
  const [userId, setUserId] = useState("");

  const [lastname, setLastName] = useState("");
  const [secondlastname, setSecondLastName] = useState("");
  const [name, setName] = useState("");
  const [boleta, setBoleta] = useState("");
  const [carrera, setCarrera] = useState("");
  const [planDeEstudio, setPlanDeEstudio] = useState("");
  const [procedencia, setProcedencia] = useState("");
  const [academia, setAcademia] = useState("");
  const [email, setEmail] = useState("");
  const [emailper, setEmailper] = useState("");
  const [telefono, setTelefono] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        setUserType(data[0].userType);
        setLastName(data[0].lastname);
        setSecondLastName(data[0].second_lastname);
        setName(data[0].name);
        setEmail(data[0].email);
        setEmailper(data[0].altern_email);
        setTelefono(data[0].phone_number);
        if (data[0].userType === "student") {
          setBoleta(data[0].student_id);
          setCarrera(data[0].career);
          setPlanDeEstudio(data[0].curriculum);
        }
        if (data[0].userType === "staff") {
          setProcedencia(data[0].precedence);
          setAcademia(data[0].academy);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (userId && userId !== "") {
      getUserData();
    }
  }, [userId]);

  const toggleEditName = () => setIsEditingName(!isEditingName);
  const toggleLastName = () => setIsEditingLastName(!isEditingLastName);
  const toggleSecondLastName = () =>
    setIsEditingSecondLastName(!isEditingSecondLastName);
  const toggleEditBoleta = () => setIsEditingBoleta(!isEditingBoleta);
  const toggleEditCarrera = () => setIsEditingCarrera(!isEditingCarrera);
  const toggleEditPEstudio = () => setIsEditingPEstudio(!isEditingPEstudio);
  const toggleEditProcedencia = () =>
    setIsEditingProcedencia(!isEditingProcedencia);
  const toggleEditAcademia = () => setIsEditingAcademia(!isEditingAcademia);
  const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);
  const toggleEditEmailper = () => setIsEditingEmailper(!isEditingEmailper);
  const toggleEditTelefono = () => setIsEditingTelefono(!isEditingTelefono);

  const handleCarreraChange = (e) => {
    setCarrera(e.target.value);
  };

  const handlePEstudioChange = (e) => {
    setPlanDeEstudio(e.target.value);
  };

  const handleProcedenciaChange = (e) => {
    setProcedencia(e.target.value);
  };

  const handleAcademiaChange = (e) => {
    setAcademia(e.target.value);
  };

  return (
    <div>
      <div className="t-basic">
        <div className="tl-u">Información Básica</div>
      </div>
      <div className="body-pass">
        <div className="info-item">
          <span className="title">Primer Apellido:</span>
          {isEditingLastName ? (
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          ) : (
            <span className="value">{lastname}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleLastName}
              icon={isEditingLastName ? faSave : faPen}
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Segundo Apellido:</span>
          {isEditingSecondLastName ? (
            <input
              type="text"
              name="name"
              value={secondlastname}
              onChange={(e) => setSecondLastName(e.target.value)}
            />
          ) : (
            <span className="value">{secondlastname}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleSecondLastName}
              icon={isEditingSecondLastName ? faSave : faPen}
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Nombre:</span>
          {isEditingName ? (
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <span className="value">{name}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditName}
              icon={isEditingName ? faSave : faPen}
            />
          </div>
        </div>
        {userType === "student" && (
          <>
            <div className="info-item">
              <span className="title">Boleta:</span>
              {isEditingBoleta ? (
                <input
                  type="text"
                  name="boleta"
                  value={boleta}
                  onChange={(e) => setBoleta(e.target.value)}
                />
              ) : (
                <span className="value">{boleta}</span>
              )}
              <div className="con-ico">
                <FontAwesomeIcon
                  className="edit-icon"
                  onClick={toggleEditBoleta}
                  icon={isEditingBoleta ? faSave : faPen}
                />
              </div>
            </div>
            <div className="info-item">
              <span className="title">Carrera:</span>
              {isEditingCarrera ? (
                <select value={carrera} onChange={handleCarreraChange}>
                  <option value="Ingenieria en Sistemas Computacionales">
                    Ingenieria en Sistemas Computacionales
                  </option>
                  <option value="Inteligencia Artificial">
                    Inteligencia Artificial
                  </option>
                  <option value="Licenciatura en Ciencia de Datos">
                    Licenciatura en Ciencia de Datos
                  </option>
                </select>
              ) : (
                <span className="value">{carrera}</span>
              )}
              <div className="con-ico">
                <FontAwesomeIcon
                  className="edit-icon"
                  onClick={toggleEditCarrera}
                  icon={isEditingCarrera ? faSave : faPen}
                />
              </div>
            </div>
            <div className="info-item">
              <span className="title">Plan de Estudio:</span>
              {isEditingPEstudio ? (
                <select value={planDeEstudio} onChange={handlePEstudioChange}>
                  <option value="Plan del 2009">Plan del 2009</option>
                  <option value="Plan del 2020">Plan del 2020</option>
                </select>
              ) : (
                <span className="value">{planDeEstudio}</span>
              )}
              <div className="con-ico">
                <FontAwesomeIcon
                  className="edit-icon"
                  onClick={toggleEditPEstudio}
                  icon={isEditingPEstudio ? faSave : faPen}
                />
              </div>
            </div>
          </>
        )}

        {userType === "staff" && (
          <>
            <div className="info-item">
              <span className="title">*Procedencia:</span>
              {isEditingProcedencia ? (
                <select value={procedencia} onChange={handleProcedenciaChange}>
                  <option value="escom">ESCOM</option>
                  <option value="cidetec">CIDETEC</option>
                </select>
              ) : (
                <span className="value">{procedencia.toUpperCase()}</span>
              )}
              <div className="con-ico">
                <FontAwesomeIcon
                  className="edit-icon"
                  onClick={toggleEditProcedencia}
                  icon={isEditingProcedencia ? faSave : faPen}
                />
              </div>
            </div>
            <div className="info-item">
              <span className="title">*Academia:</span>
              {isEditingAcademia ? (
                <select value={academia} onChange={handleAcademiaChange}>
                  <option value="isw">ISW</option>
                  <option value="other">OTHER</option>
                </select>
              ) : (
                <span className="value">{academia.toUpperCase()}</span>
              )}
              <div className="con-ico">
                <FontAwesomeIcon
                  className="edit-icon"
                  onClick={toggleEditAcademia}
                  icon={isEditingAcademia ? faSave : faPen}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="t-basic2">
        <div className="tl-u">Información de contacto</div>
      </div>

      <div className="body-pass">
        <div className="info-item">
          <span className="title">Correo electrónico:</span>
          {isEditingEmail ? (
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="value-input"
            />
          ) : (
            <span className="value">{email}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditEmail}
              icon={isEditingEmail ? faSave : faPen}
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Correo personal:</span>
          {isEditingEmailper ? (
            <input
              type="text"
              value={emailper}
              onChange={(e) => setEmailper(e.target.value)}
              className="value-input"
            />
          ) : (
            <span className="value">{emailper}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditEmailper}
              icon={isEditingEmailper ? faSave : faPen}
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Teléfono personal:</span>
          {isEditingTelefono ? (
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="value-input"
            />
          ) : (
            <span className="value">{telefono}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditTelefono}
              icon={isEditingTelefono ? faSave : faPen}
            />
          </div>
        </div>
      </div>

      <div className="t-basic2">
        <div className="tl-u">Contraseña</div>
      </div>
      <div className="body-pass">
        <div className="info-item">
          <span className="title">Cambiar contraseña:</span>
          <span className="value">Elige una contraseña segura</span>
          <div className="con-ico">
            <a href="/cambiar_contraseña">
              <FontAwesomeIcon className="edit-icon" icon={faChevronRight} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
