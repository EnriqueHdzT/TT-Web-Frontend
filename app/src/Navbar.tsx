import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faPenToSquare,
  faUser,
  faComments,
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

export default function Navbar({ isAuth = false, isSearchEnable = false }) {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  }; // para el scroll que no sirve aun xd

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 1370); // Ajusta este valor según tam pagi
  };


  const renderAuthButtons = () => {
    let location = useLocation();
    if (location.pathname === "/") {
      return (
        <>
          <a className="btn btn-primary" href="/login">
            Iniciar Sesión
          </a>
          <a className="btn btn-outline-secondary" href="/register">
            Registro del Alumno
          </a>
        </>
      );
    } else if (location.pathname === "/login") {
      return (
        <a className="btn btn-outline-secondary" href="/register">
          Registro del Alumno
        </a>
      );
    } else if (location.pathname === "/register") {
      return (
        <a className="btn btn-primary" href="/login">
          Iniciar Sesión
        </a>
      );
    } else {
      return null;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await response.json();
      localStorage.removeItem('token');
      window.location.href = "/";
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleResize(); // Llama a handleResize al inicio para establecer el estado inicial de isMobile
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [prevScrollPos, visible]);

  return (
    <header>
      <nav className={`navbar-pg ${visible ? '' : 'hidden'} ${isMobile ? 'mobile' : ''}`}>
        <div className="elements-lft">
          {isAuth ? (
            <div
              className={`dropdown ${isActive ? "active" : ""}`}
              id="myDropdown"
            >
              <span onClick={() => setIsActive(!isActive)}>
                <FontAwesomeIcon
                  icon={isActive ? faChevronUp : faChevronDown}
                  className="style-gico"
                />
              </span>
              <ul className="dropdown-content">
                <li>
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faFileLines}
                      className="style-icon"
                    />
                    Protocolos
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="style-icon"
                    />
                    Avisos
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faUser} className="style-icon" />
                    Usuarios
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faComments} className="style-icon" />
                    Buzón
                  </a>
                </li>
                <li>
                  <a href="#">
                    <FontAwesomeIcon icon={faClock} className="style-icon" />
                    Fechas
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <></>
          )}
          <div className="logo-h">
            <a href="/">LOGO</a>
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="elements-right">
          {isAuth ? (
            <>
              <div className="username-page">Analista de la CATT</div>
              <div className="notifications">
                <button>
                  <FontAwesomeIcon icon={faBell} />
                </button>
              </div>
              <div className="profile-circle">
                <img
                  src="https://i.ibb.co/qRGfzdB/Clipped-9.png"
                  className="profile-user"
                  alt="Profile"
                ></img>
              </div>
              <div
                className={`dropdown-user ${isOn ? "active" : ""}`}
                id="myDropdownus"
              >
                <span onClick={() => setIsOn(!isOn)}>
                  <FontAwesomeIcon
                    icon={isOn ? faChevronUp : faChevronDown}
                    className="style-gico"
                  />
                </span>
                <ul className="dropdown-content-us">
                  <li>
                    <a href="#">
                      <FontAwesomeIcon
                        icon={faCircleUser}
                        className="style-icon"
                      />
                      Ver perfil
                    </a>
                  </li>
                  <li>
                    <a onClick={handleLogout}>
                      <FontAwesomeIcon
                        icon={faArrowRightFromBracket}
                        className="style-icon"
                      />
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>{renderAuthButtons()}</>
          )}
        </div>
      </nav>
    </header>
  );
}
