import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
const academies = ["Ciencia de Datos", "Ciencias Basicas", "Ciencias de la Computacion"];

export default function VerUsuarios() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token") || localStorage.getItem("userType") === "") {
      navigate("/");
    }
  });
  const urlData = validateUrlData();

  const [userType, setUserType] = useState(urlData[0]);
  const [career, setCareer] = useState(urlData[1]);
  const [curriculum, setCurriculum] = useState(urlData[2]);
  const [precedence, setPrecedence] = useState(urlData[3]);
  const [academy, setAcademy] = useState(urlData[4]);
  const [currentPage, setCurrentPage] = useState(urlData[5]);
  const [maxPage, setMaxPage] = useState(1);
  const [users, setUsers] = useState([]);

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
      setMaxPage(data.numPages);
      delete data.numPages;
      setUsers(Object.values(data));
    } catch (error) {
      setUsers([]);
      return [];
    }
  };

  useEffect(() => {
    getUsers();
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

  return (
    <div>
      <div className="head-usr">
        <div className="tl-u">Viendo Usuarios</div>
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
          <button className="plus-us">
            Nuevo Usuario <FontAwesomeIcon icon={faPlus} className="icon-us" />
          </button>
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
                    ? `${user.staff.name} ${user.staff.lastname} ${user.staff.second_lastname}`
                    : `${user.student.name} ${user.student.lastname} ${user.student.second_lastname}`
                }
                cardText={
                  user.staff
                    ? `${user.staff.precedence} ${user.staff.academy ? "- " + user.staff.academy : ""}`
                    : `${user.student.career} ${"- " + user.student.curriculum}`
                }
                onDelete={() => handleDelete(user.id)}
              />
            ))}
          </>
        ) : (
          <h1>No se encontraron usuarios</h1>
        )}
      </div>
      <div className="pageChanger">
        <PageChanger currentPage={currentPage} maxPages={maxPage} onPageChange={updateCurrentPage} />
      </div>
    </div>
  );
}

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
