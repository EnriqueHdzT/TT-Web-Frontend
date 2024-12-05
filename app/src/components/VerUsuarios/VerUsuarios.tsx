import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./VerUsuarios.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import FiltrosUsuario from "./components/FiltrosUsuario/FiltrosUsuario";
import UserCard from "./components/UserCard/UserCard";
import PageChanger from "./components/PageChanger/PageChanger";

const usersTypes = ["Alumnos", "Docentes"];
const careers = ["ISW", "IIA", "LCD"];
const curriculums = ["2009", "2020"];
const precedences = ["Interino", "Externo"];

export default function VerUsuarios() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  });
  const [academies, setAcademies] = useState<string[]>([]);
  function validateUrlData() {
    const queryParams = new URLSearchParams(window.location.search);
    let pageParam = parseInt(queryParams.get("page") ?? "");
    let userTypeParam = queryParams.get("userType") ?? "";
    let careerParam = queryParams.get("career") ?? "";
    let curriculumParam = queryParams.get("curriculum") ?? "";
    let precedenceParam = queryParams.get("precedence") ?? "";
    let academyParam = queryParams.get("academy") ?? "";

    if (isNaN(pageParam) || pageParam < 1) {
      pageParam = 1;
    }
    if (userTypeParam === "Alumnos") {
      precedenceParam = "";
      academyParam = "";
      if (careerParam === "") {
        curriculumParam = "";
      } else {
        curriculumParam = ["LCD", "IIA"].includes(careerParam) ? "2020" : curriculumParam;
      }
    } else if (userTypeParam === "Docentes") {
      careerParam = "";
      curriculumParam = "";
      if (precedenceParam === "Externo") {
        academyParam = "";
      }
    } else {
      careerParam = "";
      curriculumParam = "";
      precedenceParam = "";
      academyParam = "";
      userTypeParam = "";
    }

    usersTypes.includes(userTypeParam)
      ? queryParams.set("userType", userTypeParam)
      : (queryParams.delete("userType"), (userTypeParam = ""));
    careers.includes(careerParam)
      ? queryParams.set("career", careerParam)
      : (queryParams.delete("career"), (careerParam = ""));
    curriculums.includes(curriculumParam)
      ? queryParams.set("curriculum", curriculumParam)
      : (queryParams.delete("curriculum"), (curriculumParam = ""));
    precedences.includes(precedenceParam)
      ? queryParams.set("precedence", precedenceParam)
      : (queryParams.delete("precedence"), (precedenceParam = ""));
    academies.includes(academyParam)
      ? queryParams.set("academy", academyParam)
      : (queryParams.delete("academy"), (academyParam = ""));
    queryParams.set("page", pageParam.toString());

    window.history.replaceState({}, "", `${window.location.pathname}?${queryParams}`);

    return [userTypeParam, careerParam, curriculumParam, precedenceParam, academyParam, pageParam];
  }

  const urlData = validateUrlData();
  const [userType, setUserType] = useState(urlData[0]);
  const [career, setCareer] = useState(urlData[1]);
  const [curriculum, setCurriculum] = useState(urlData[2]);
  const [precedence, setPrecedence] = useState(urlData[3]);
  const [academy, setAcademy] = useState(urlData[4]);
  const [currentPage, setCurrentPage] = useState(urlData[5]);
  const [maxPage, setMaxPage] = useState(1);
  const [users, setUsers] = useState<any[]>([]);
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentLastName, setNewStudentLastName] = useState("");
  const [newStudentSecondLastName, setNewStudentSecondLastName] = useState("");
  const [newStudentBoleta, setNewStudentBoleta] = useState("");
  const [newStudentCareer, setNewStudentCareer] = useState("");
  const [newStudentCurriculum, setNewStudentCurriculum] = useState("");

  const [newStaffEmail, setNewStaffEmail] = useState("");
  const [newStaffName, setNewStaffName] = useState("");
  const [newStaffLastName, setNewStaffLastName] = useState("");
  const [newStaffSecondLastName, setNewStaffSecondLastName] = useState("");
  const [newStaffPrecedencia, setNewStaffPrecedencia] = useState("");
  const [newStaffUserType, setNewStaffUserType] = useState("");
  const [newStaffAcademia, setNewStaffAcademia] = useState([]);
  const [rawAcademyInput, setRawAcademyInput] = useState("");

  const popupRef = useRef(null);

  const getUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          ...(userType !== "" && { userType: userType }),
          ...(career !== "" && { career: career }),
          ...(curriculum !== "" && { curriculum: curriculum }),
          ...(precedence !== "" && { precedence: precedence }),
          ...(academy !== "" && { academy: academy }),
          page: currentPage,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const usersArray = Object.values(data).filter((item) => typeof item === "object" && (item.staff || item.student));
      const numPages = Object.values(data).filter((item) => typeof item === "object" && item.numPages);
      setUsers(usersArray);
      setMaxPage(numPages[0].numPages);
    } catch (error) {
      setUsers([]);
      return [];
    }
  };

  useEffect(() => {
    getUsers();
    const getAcademies = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/academies", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAcademies(data);
      } catch (error) {
        setAcademies([]);
        console.error("Error al obtener las academies:", error);
      }
    };

    getAcademies();
  }, []);

  useEffect(() => {
    getUsers();
  }, [userType, career, curriculum, precedence, academy, currentPage]);

  const updateCurrentPage = (value = 0) => {
    if (value < 1 || value > maxPage) {
      console.log("La pagina que quieres acceder no es valida");
    } else {
      setCurrentPage(value);
    }
  };

  const onPopupClose = () => {
    setNewStudentEmail("");
    setNewStudentName("");
    setNewStudentLastName("");
    setNewStudentSecondLastName("");
    setNewStudentBoleta("");
    setNewStudentCareer("");
    setNewStudentCurriculum("");

    setNewStaffEmail("");
    setNewStaffName("");
    setNewStaffLastName("");
    setNewStaffSecondLastName("");
    setNewStaffPrecedencia("");
    setNewStaffAcademia([]);
    setNewStaffUserType("");
    popupRef.current?.close();
  };

  const updateUserType = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("userType", value);
    window.history.replaceState({}, "", `${window.location.pathname}?${queryParams}`);

    setUserType(value);
  };

  const updateCareer = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("career", value);
    window.history.replaceState({}, "", `${window.location.pathname}?${queryParams}`);

    setCareer(value);
  };

  const updateCurriculum = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("curriculum", value);
    window.history.replaceState({}, "", `${window.location.pathname}?${queryParams}`);

    setCurriculum(value);
  };

  const updatePrecedence = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("precedence", value);
    if (value === "") {
      queryParams.delete("academy");
    }
    window.history.replaceState({}, "", `${window.location.pathname}?${queryParams}`);

    setPrecedence(value);
  };

  const updateAcademy = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("academy", value);
    window.history.replaceState({}, "", `${window.location.pathname}?${queryParams}`);
    setAcademy(value);
  };

  const handleDelete = (userId) => {
    fetch(`http://127.0.0.1:8000/api/user/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error("Hubo un problema al eliminar al usuario", error);
      });
  };

  const handleNewStudent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("email", newStudentEmail);
      formData.append("name", newStudentName);
      formData.append("lastName", newStudentLastName);
      newStudentSecondLastName !== "" ? formData.append("secondLastName", newStudentSecondLastName) : null;
      formData.append("boleta", newStudentBoleta);
      formData.append("career", newStudentCareer);
      newStudentCurriculum === ""
        ? formData.append("curriculum", "2020")
        : formData.append("curriculum", newStudentCurriculum);

      const response = await fetch("http://127.0.0.1:8000/api/createStudent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }
      onPopupClose();
      navigate(0);
    } catch (error) {
      console.error("Error al crear usuario");
    }
  };

  const handleNewStaff = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(newStaffAcademia);
      const formData = new URLSearchParams();
      formData.append("email", newStaffEmail);
      formData.append("name", newStaffName);
      formData.append("lastName", newStaffLastName);
      newStaffSecondLastName !== "" && formData.append("secondLastName", newStaffSecondLastName);
      formData.append("precedence", newStaffPrecedencia);
      newStaffAcademia.length > 0 && newStaffAcademia.forEach((academy) => formData.append("academy[]", academy));
      formData.append("userType", newStaffUserType);

      const response = await fetch("http://127.0.0.1:8000/api/createStaff", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al crear usuario");
      }

      onPopupClose();
      navigate(0);
    } catch (error) {
      console.error("Error al crear usuario");
    }
  };

  return (
    <div>
      <div className="conte-usuarios">
        <div className="head-usus">
          <div className="tl-usu">Viendo Usuarios</div>
          <div className="select-usr">
            <FiltrosUsuario
              name={"Tipo de Usuario"}
              currentStatus={userType}
              options={usersTypes}
              onChange={updateUserType}
            />
            {userType === "Alumnos" ? (
              <>
                <FiltrosUsuario name={"Carrera"} currentStatus={career} options={careers} onChange={updateCareer} />
                {career === "ISW" ? (
                  <FiltrosUsuario
                    name={"Plan de Estudios"}
                    currentStatus={curriculum}
                    options={curriculums}
                    onChange={updateCurriculum}
                  />
                ) : (
                  <></>
                )}
                {career === "IIA" || career === "LCD" ? (
                  <FiltrosUsuario
                    name={"Plan de Estudios"}
                    currentStatus={curriculum}
                    options={["2020"]}
                    onChange={updateCurriculum}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            {userType === "Docentes" ? (
              <>
                <FiltrosUsuario
                  name={"Precedencia"}
                  currentStatus={precedence}
                  options={precedences}
                  onChange={updatePrecedence}
                />
                {precedence === "Interino" ? (
                  <FiltrosUsuario
                    name={"Academia"}
                    currentStatus={academy}
                    options={academies}
                    onChange={updateAcademy}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <Popup
              ref={popupRef}
              className="popup-content"
              trigger={(open) => (
                <button type="button" className="plus-us">
                  Nuevo Usuario <FontAwesomeIcon icon={faPlus} className="icon-us" />
                </button>
              )}
              modal
              nested
              closeOnDocumentClick={false}
            >
              {(close) => (
                <>
                  <ul className="nav nav-tabs nav-justified row" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="home-tab-pane"
                        aria-selected="true"
                      >
                        Crear Alumno
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-tab-pane"
                        type="button"
                        role="tab"
                        aria-controls="profile-tab-pane"
                        aria-selected="false"
                      >
                        Crear Docente
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="home-tab-pane"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      tabIndex="0"
                    >
                      <form className="form-group" onSubmit={(e) => handleNewStudent(e)}>
                        <input
                          type="email"
                          className="form-control mt-3 mb-3"
                          placeholder="Correo Institucional"
                          onChange={(e) => setNewStudentEmail(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Nombre(s)"
                          onChange={(e) => setNewStudentName(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Primer Apellido"
                          onChange={(e) => setNewStudentLastName(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Segundo Apellido"
                          onChange={(e) => setNewStudentSecondLastName(e.target.value)}
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Boleta del alumno"
                          onChange={(e) => setNewStudentBoleta(e.target.value)}
                          required
                        />

                        <select
                          className="form-select mt-3 mb-3"
                          required
                          value={newStudentCareer}
                          onChange={(e) => setNewStudentCareer(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Carrera
                          </option>
                          <option value="ISW">Ingenieria en Sistemas Computacionales</option>
                          <option value="IIA">Ingenieria en Inteligencia Artificial</option>
                          <option value="LCD">Licenciatura en Ciencia de Datos</option>
                        </select>

                        {newStudentCareer === "ISW" && (
                          <select
                            name="plan_de_estudios"
                            className="form-select mt-3 mb-3"
                            value={newStudentCurriculum}
                            onChange={(e) => setNewStudentCurriculum(e.target.value)}
                          >
                            <option value="" disabled hidden>
                              Plan de estudios
                            </option>
                            <option value="2009">2009</option>
                            <option value="2020">2020</option>
                          </select>
                        )}
                        <div className="flx_b">
                          <button className="btn btn-outline-danger" onClick={onPopupClose}>
                            Cerrar
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Crear Alumno
                          </button>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="profile-tab-pane"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                      tabIndex="0"
                    >
                      <form className="form-group" onSubmit={(e) => handleNewStaff(e)}>
                        <input
                          type="email"
                          className="form-control mt-3 mb-3"
                          placeholder="Correo Institucional"
                          onChange={(e) => setNewStaffEmail(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Nombre(s)"
                          onChange={(e) => setNewStaffName(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Primer Apellido"
                          onChange={(e) => setNewStaffLastName(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Segundo Apellido"
                          onChange={(e) => setNewStaffSecondLastName(e.target.value)}
                        />
                        <input
                          type="text"
                          className="form-control mt-3 mb-3"
                          placeholder="Precedencia"
                          onChange={(e) => setNewStaffPrecedencia(e.target.value)}
                          required
                        />

                        {newStaffPrecedencia === "ESCOM" && (
                          <div className="input-group mb-3">
                            <input
                              type="text"
                              className="form-control mt-3 mb-3"
                              placeholder="Ingresa las academias separadas por comas"
                              value={rawAcademyInput}
                              onChange={(e) => setRawAcademyInput(e.target.value)}
                              onBlur={() => {
                                const academies = rawAcademyInput
                                  .split(",")
                                  .map((academy) => academy.trim())
                                  .filter((academy) => academy !== "" && academy !== "Todos"); // Filter out "Todos"

                                const uniqueAcademies = Array.from(new Set(academies));
                                setNewStaffAcademia(uniqueAcademies);
                              }}
                            />
                            <div className="input-group-append">
                              <button
                                type="button"
                                className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span className="visually-hidden">Toggle Dropdown</span>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                {academies
                                  .filter((academy) => academy !== "Todos") // Filter out "Todos" from the dropdown list
                                  .map((academy, index) => (
                                    <li key={index}>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          // Append the selected academy to the current input
                                          setRawAcademyInput((prevInput) => {
                                            // Check if the academy is already in the input
                                            const academiesList = prevInput.split(",").map((academy) => academy.trim());
                                            if (!academiesList.includes(academy)) {
                                              return prevInput ? `${prevInput}, ${academy}` : academy;
                                            }
                                            return prevInput;
                                          });
                                        }}
                                      >
                                        {academy}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        <select
                          className="form-select mt-3 mb-3"
                          required
                          value={newStaffUserType}
                          onChange={(e) => setNewStaffUserType(e.target.value)}
                        >
                          <option value="" disabled hidden>
                            Tipo de Usuario
                          </option>
                          <option value="Prof">Profesor</option>
                          <option value="PresAcad">Presidente de Academia</option>
                          <option value="JefeDepAcad">Jefe de Departamento</option>
                          <option value="AnaCATT">Analista de la CATT</option>
                          <option value="SecEjec">Secretario Ejecutivo</option>
                          <option value="SecTec">Secretario Técnico</option>
                          <option value="Presidente">Presidente</option>
                        </select>

                        <div className="flx_b">
                          <button className="btn btn-outline-danger" onClick={onPopupClose}>
                            Cerrar
                          </button>
                          <button type="submit" className="btn btn-primary">
                            Crear Docente
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
        <div className="container-users">
          {users.length !== 0 ? (
            <>
              {users.map((user) => (
                <UserCard
                  userKey={user.id}
                  email={user.email}
                  userType={user.staff ? "Docente" : "Alumno"}
                  name={
                    user.staff
                      ? `${user.staff.name} ${user.staff.lastname} ${
                          user.staff.second_lastname ? user.staff.second_lastname : ""
                        }`
                      : `${user.student.name} ${user.student.lastname} ${
                          user.student.second_lastname ? user.student.second_lastname : ""
                        }`
                  }
                  cardText={
                    user.staff
                      ? `${user.staff.precedence} ${
                          user.staff.academies && user.staff.academies.length > 0
                            ? "- " + user.staff.academies.join(", ")
                            : ""
                        }`
                      : `${user.student.career} ${"- " + user.student.curriculum}`
                  }
                  onDelete={() => handleDelete(user.id)}
                />
              ))}
            </>
          ) : (
            <div className="no-usuarios">
              <h1> No se encontraron usuarios</h1>
            </div>
          )}
        </div>
        <div className="pageChanger">
          <PageChanger currentPage={currentPage} maxPages={maxPage} onPageChange={updateCurrentPage} />
        </div>
      </div>
    </div>
  );
}
