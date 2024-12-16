import "./VerInfo.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faSave,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

interface StaffTypesMap {
  [key: string]: string;
}

const staffTypesMap: StaffTypesMap = {
  Prof: "Profesor",
  AnaCATT: "Analista de la CATT",
  SecEjec: "Secretario Ejecutivo",
  SecTec: "Secretario Técnico",
  Presidente: "Presidente",
};

interface UserData {
  name: string;
  lastName: string;
  secondLastName: string;
  userType: string;
  staffType: string;
  boleta: string;
  carrera: string;
  pEstudio: string;
  procedencia: string;
  academia: Array<string>;
  email: string;
  emailper: string;
  telefono: string;
}

const InitialUserData: UserData = {
  name: "",
  lastName: "",
  secondLastName: "",
  userType: "",
  staffType: "",
  boleta: "",
  carrera: "",
  pEstudio: "",
  procedencia: "",
  academia: [],
  email: "",
  emailper: "",
  telefono: "",
};

export default function VerInfo() {
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
  const [isEditingStaffType, setIsEditingStaffType] = useState(false);
  const [userId, setUserId] = useState("");
  const [rawAcademyInput, setRawAcademyInput] = useState("");
  const [wasUserEdited, setWasUserEdited] = useState(false);

  const [initialUserData, setInitialUserData] = useState(InitialUserData);

  const [lastname, setLastName] = useState("");
  const [secondlastname, setSecondLastName] = useState("");
  const [name, setName] = useState("");
  const [boleta, setBoleta] = useState("");
  const [carrera, setCarrera] = useState("");
  const [planDeEstudio, setPlanDeEstudio] = useState("");
  const [procedencia, setProcedencia] = useState("");
  const [academies, setAcademies] = useState(initialUserData.academia);
  const [staffType, setStaffType] = useState("");
  const [email, setEmail] = useState("");
  const [emailper, setEmailper] = useState("");
  const [telefono, setTelefono] = useState("");
  const [userType, setUserType] = useState("");
  const [allAcademies, setAllAcademies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      window.location.href = "/login";
    }
    setUserId(window.location.href.split("/")[4]);
    const getAcademies = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/academies", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          navigate("/login");
        } else if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAllAcademies(data);
      } catch (error) {
        setAllAcademies([]);
        console.error("Error al obtener las academies:", error);
      }
    };
    getAcademies();
  }, []);

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
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          navigate("/login");
        } else if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data);

        setUserType(data.user_type ? data.user_type : "student");
        setLastName(data.lastname ? data.lastname : "");
        setSecondLastName(data.second_lastname ? data.second_lastname : "");
        setName(data.name ? data.name : "");
        setEmail(data.email ? data.email : "");
        setEmailper(data.altern_email ? data.altern_email : "");
        setTelefono(data.phone_number ? data.phone_number : "");
        if (data.user_type === "student") {
          setBoleta(data.student_id ? data.student_id : "");
          setCarrera(data.career ? data.career : "");
          setPlanDeEstudio(data.curriculum ? data.curriculum : "");
        }
        if (data.user_type === "staff") {
          setProcedencia(data.precedence ? data.precedence : "");
          setAcademies(data.academies ? data.academies : "");
          setRawAcademyInput(
            data.academies && Array.isArray(data.academies)
              ? data.academies.join(", ")
              : ""
          );
          setStaffType(data.staff_type ? data.staff_type : "");
        }

        const newUserData: UserData = {
          name: data.name ? data.name : "",
          lastName: data.lastname ? data.lastname : "",
          secondLastName: data.second_lastname ? data.second_lastname : "",
          userType: data.userType ? data.userType : "",
          staffType: data.staff_type ? data.staff_type : "",
          boleta: data.student_id ? data.student_id : "",
          carrera: data.career ? data.career : "",
          pEstudio: data.curriculum ? data.curriculum : "",
          procedencia: data.precedence ? data.precedence : "",
          academia: data.academy ? data.academy : [],
          email: data.email ? data.email : "",
          emailper: data.altern_email ? data.altern_email : "",
          telefono: data.phone_number ? data.phone_number : "",
        };

        setInitialUserData(newUserData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (userId && userId !== "") {
      getUserData();
    }
  }, [userId]);

  useEffect(() => {
    if (
      name !== initialUserData.name ||
      lastname !== initialUserData.lastName ||
      secondlastname !== initialUserData.secondLastName ||
      boleta !== initialUserData.boleta ||
      carrera !== initialUserData.carrera ||
      planDeEstudio !== initialUserData.pEstudio ||
      procedencia !== initialUserData.procedencia ||
      academies !== initialUserData.academia ||
      staffType !== initialUserData.staffType ||
      email !== initialUserData.email ||
      emailper !== initialUserData.emailper ||
      telefono !== initialUserData.telefono
    ) {
      setWasUserEdited(true);
    } else {
      setWasUserEdited(false);
    }
  }, [
    name,
    lastname,
    secondlastname,
    boleta,
    carrera,
    planDeEstudio,
    procedencia,
    academies,
    staffType,
    email,
    emailper,
    telefono,
  ]);

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

  const handleReset = () => {
    setName(initialUserData.name);
    setLastName(initialUserData.lastName);
    setSecondLastName(initialUserData.secondLastName);
    setBoleta(initialUserData.boleta);
    setCarrera(initialUserData.carrera);
    setPlanDeEstudio(initialUserData.pEstudio);
    setProcedencia(initialUserData.procedencia);
    setAcademies(initialUserData.academia);
    setStaffType(initialUserData.staffType);
    setEmail(initialUserData.email);
    setEmailper(initialUserData.emailper);
    setTelefono(initialUserData.telefono);
    setWasUserEdited(false);
  };

  const handleSave = () => {
    const updateUserData = async () => {
      try {
        const formData = new URLSearchParams();

        if (name && name !== initialUserData.name)
          formData.append("name", name);
        if (lastname && lastname !== initialUserData.lastName)
          formData.append("lastName", lastname);
        if (secondlastname && secondlastname !== initialUserData.secondLastName)
          formData.append("secondLastName", secondlastname);
        if (boleta && boleta !== initialUserData.boleta)
          formData.append("studentId", boleta);
        if (carrera && carrera !== initialUserData.carrera)
          formData.append("career", carrera);
        if (planDeEstudio && planDeEstudio !== initialUserData.pEstudio)
          formData.append("curriculum", planDeEstudio);
        if (procedencia && procedencia !== initialUserData.procedencia)
          formData.append("precedence", procedencia);
        if (academies && academies !== initialUserData.academia)
          academies.forEach((academy) => formData.append("academy[]", academy));
        if (staffType && staffType !== initialUserData.staffType)
          formData.append("userType", staffType);
        if (email && email !== initialUserData.email)
          formData.append("email", email);
        if (emailper && emailper !== initialUserData.emailper)
          formData.append("alternEmail", emailper);
        if (telefono && telefono !== initialUserData.telefono)
          formData.append("phoneNumber", telefono);
        if (userId) formData.append("id", userId);

        const response = await fetch("http://127.0.0.1:8000/api/user", {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        });
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          navigate("/login");
        } else if (!response.ok) {
          throw new Error("Error al actualizar los datos");
        }
        console.log("Datos guardados correctamente");
        navigate(0);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (wasUserEdited) {
      updateUserData();
    }
  };

  return (
    <div>
      <div className="info-contenedor">
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
                  <select
                    value={carrera}
                    onChange={(e) => setCarrera(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Seleccione una carrera
                    </option>
                    <option value="ISW">
                      Ingenieria en Sistemas Computacionales
                    </option>
                    <option value="IIA">
                      Ingenieria en Inteligencia Artificial
                    </option>
                    <option value="LCD">
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
              {carrera === "ISW" && (
                <div className="info-item">
                  <span className="title">Plan de Estudio:</span>
                  {isEditingPEstudio ? (
                    <select
                      value={planDeEstudio}
                      onChange={(e) => setPlanDeEstudio(e.target.value)}
                    >
                      <option value="" disabled hidden>
                        Seleccione un plan de estudio
                      </option>
                      <option value="2009">Plan del 2009</option>
                      <option value="2020">Plan del 2020</option>
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
              )}
            </>
          )}

          {userType === "staff" && (
            <>
              <div className="info-item">
                <span className="title">Precedencia:</span>
                {isEditingProcedencia ? (
                  <input
                    type="text"
                    name="procedencia"
                    value={procedencia}
                    onChange={(e) => setProcedencia(e.target.value)}
                  />
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
              {procedencia === "ESCOM" && (
                <div className="info-item">
                  <span className="title">Academia:</span>
                  {isEditingAcademia ? (
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ingresa las academias separadas por comas"
                        value={rawAcademyInput}
                        onChange={(e) => setRawAcademyInput(e.target.value)}
                        onBlur={() => {
                          const academies = rawAcademyInput
                            .split(",")
                            .map((academy) => academy.trim())
                            .filter((academy) => academy !== "");

                          const validAcademies = academies.filter((academy) =>
                            allAcademies.includes(academy)
                          );

                          const uniqueAcademies = Array.from(
                            new Set(validAcademies)
                          );
                          setAcademies(uniqueAcademies);
                          setRawAcademyInput(validAcademies.join(", "));
                        }}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="visually-hidden">
                            Toggle Dropdown
                          </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          {allAcademies.map((academy, index) => (
                            <li key={index}>
                              <a
                                className="dropdown-item"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setRawAcademyInput((prevInput) => {
                                    const academiesList = prevInput
                                      .split(",")
                                      .map((academy) => academy.trim());

                                    if (!academiesList.includes(academy)) {
                                      return prevInput
                                        ? `${prevInput}, ${academy}`
                                        : academy;
                                    }
                                    return prevInput;
                                  });
                                  setAcademies((prevAcademies) =>
                                    Array.from(
                                      new Set([...prevAcademies, academy])
                                    )
                                  );
                                }}
                              >
                                {academy}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <span className="value">{rawAcademyInput}</span>
                  )}
                  <div className="con-ico">
                    <FontAwesomeIcon
                      className="edit-icon"
                      onClick={toggleEditAcademia}
                      icon={isEditingAcademia ? faSave : faPen}
                    />
                  </div>
                </div>
              )}
              <div className="info-item">
                <span className="title">Tipo de Docente:</span>
                {isEditingStaffType ? (
                  <select
                    name="staffType"
                    value={staffType}
                    onChange={(e) => setStaffType(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Seleccione un tipo de docente
                    </option>
                    <option value="Prof">Profesor</option>
                    <option value="AnaCATT">Analista de la CATT</option>
                    <option value="SecEjec">Secretario Ejecutivo</option>
                    <option value="SecTec">Secretario Técnico</option>
                    <option value="Presidente">Presidente</option>
                  </select>
                ) : (
                  <span className="value">{staffTypesMap[staffType]}</span>
                )}
                <div className="con-ico">
                  <FontAwesomeIcon
                    className="edit-icon"
                    onClick={() => setIsEditingStaffType(!isEditingStaffType)}
                    icon={isEditingStaffType ? faSave : faPen}
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
                type="email"
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
              <a href={`/cambiar_contraseña/${userId}`}>
                <FontAwesomeIcon className="edit-icon" icon={faChevronRight}/>
              </a>
            </div>
          </div>
        </div>

        <div className="botones-info">
          <button
            className="restablece"
            disabled={!wasUserEdited}
            onClick={handleReset}
          >
            Restablecer Datos
          </button>{" "}
          <button
            className="guardar_b"
            disabled={!wasUserEdited}
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
