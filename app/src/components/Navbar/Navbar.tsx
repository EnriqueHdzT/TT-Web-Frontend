import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPenToSquare,
  faUser,
  faClock,
  faBell,
  faCircleUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.scss";

type UsersMap = {
  Estudiante: string;
  Prof: string;
  AnaCATT: string;
  SecEjec: string;
  SecTec: string;
  Presidente: string;
  [key: string]: string;
};

const usersMap: UsersMap = {
  Estudiante: "Estudiante",
  Prof: "Profesor",
  AnaCATT: "Analista de la CATT",
  SecEjec: "Secretario Ejecutivo",
  SecTec: "Secretario Técnico",
  Presidente: "Presidente",
};

export default function Navbar({ isAuth = false, userType = "", isSearchEnable = false }) {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isUpdateActive, setIsUpdateActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAvailability = async () => {
      try {
        const data = await fetch("http://127.0.0.1:8000/api/checkUpload", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!data.ok) {
          throw new Error("Error al verificar la disponibilidad");
        }

        setIsUpdateActive(true);
      } catch (e) {
        console.error("Error al verificar la disponibilidad");
      }
    };
    if (userType === "") {
      checkAvailability();
    } else if (["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "")) {
      setIsUpdateActive(true);
    }
  }, [userType]);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }; // para el scroll que no sirve aun xd

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1370); // Ajusta este valor según tam pagi
  };

  const renderAuthButtons = () => {
    if (location.pathname === "/") {
      return (
        <>
          <a className="inicio-button" href="/login">
            Iniciar Sesión
          </a>
          <a className="registro-button" href="/registro">
            Registro del Alumno
          </a>
        </>
      );
    } else if (location.pathname === "login") {
      return (
        <a className="registro-button" href="/registro">
          Registro del Alumno
        </a>
      );
    } else if (location.pathname === "/registro") {
      return (
        <a className="inicio-button" href="/login">
          Iniciar Sesión
        </a>
      );
    } else {
      return null;
    }
  };

  async function handleLogout(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    {
      event.preventDefault();
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/logout", {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (!response.ok) {
            throw new Error("Logout failed");
          }
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          window.location.href = "/";
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          navigate(0);
          console.error("Error de red:", error);
        } finally {
          localStorage.removeItem("token");
          localStorage.removeItem("userType");
          navigate("/");
        }
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Llama a handleResize al inicio para establecer el estado inicial de isMobile
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [prevScrollPos, visible]);

  const handleProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/userId", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener el usuario");
      }
      const data = await response.json();
      if (data.id) {
        navigate(`/usuarios/${data.id}`);
        navigate(0);
      }
    } catch (error) {
      console.error("Error en el servidor");
    }
  };

  return (
    <header className="header">
      <nav className={`navbar navbar-expand-lg ${visible ? "" : "hidden"} ${isMobile ? "mobile" : ""}`}>
        <div className="container-fluid">
          <div className="elements-lft">
            {isAuth ? (
              <div className={`dropdown ${isActive ? "active" : ""}`} id="myDropdown">
                <span onClick={() => setIsActive(!isActive)}>
                  <FontAwesomeIcon icon={isActive ? faChevronUp : faChevronDown} className="style-gico" />
                </span>
                <ul className="dropdown-content">
                  <li>
                    <a href="/protocolos">
                      <FontAwesomeIcon icon={faFileLines} className="style-icon" />
                      Ver Protocolos
                    </a>
                  </li>
                  {isUpdateActive && (
                    <li>
                      <a href="/subir_protocolo">
                        <FontAwesomeIcon icon={faPenToSquare} className="style-icon" />
                        Subir Protocolo
                      </a>
                    </li>
                  )}
                  {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") && (
                    <li>
                      <a href="/usuarios">
                        <FontAwesomeIcon icon={faUser} className="style-icon" />
                        Ver Usuarios
                      </a>
                    </li>
                  )}
                  {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") && (
                    <li>
                      <a href="/fechas">
                        <FontAwesomeIcon icon={faClock} className="style-icon" />
                        Fechas
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ) : (
              <></>
            )}
            <div className="logo-h">
              <a href="/"> <div className="lh"></div>
                </a>
            </div>
            {isSearchEnable ? (
              <div className="search-container">
                <button onClick={() => alert(`Buscar: ${searchTerm}`)}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
                <input
                  type="text"
                  placeholder="Buscar"
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="elements-right">
            {isAuth ? (
              <>
                <div className="username-page">
                  Bienvenido, {usersMap[userType === "" || userType === null ? "Estudiante" : userType]}
                </div>
                <div className="notifications">
                  <button>
                    <FontAwesomeIcon icon={faBell} />
                  </button>
                </div>
                <div className="profile-circle">
                  <img src="/1.png" className="profile-user" alt="Profile"></img>
                </div>
                <div className="z-nav">
                <div className={`dropdown-user ${isOn ? "active" : ""}`} id="myDropdownus">
                  <span onClick={() => setIsOn(!isOn)}>
                    <FontAwesomeIcon icon={isOn ? faChevronUp : faChevronDown} className="style-gico" />
                  </span>
                  <ul className="dropdown-content-us">
                    <li>
                      <a onClick={(event) => handleProfile(event)}>
                        <FontAwesomeIcon icon={faCircleUser} className="style-icon" />
                        Ver perfil
                      </a>
                    </li>
                    <li>
                      <a onClick={(event) => handleLogout(event)}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className="style-icon" />
                        Cerrar Sesión
                      </a>
                    </li>
                  </ul>
                </div>
                </div>
              </>
            ) : (
              <>{renderAuthButtons()}</>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
