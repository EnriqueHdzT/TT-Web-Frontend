import React, { useState } from "react";
import { Link } from "react-router-dom";
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

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange }) => {
  const [isActive, setIsActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOn, setIsOn] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const toggleProfile = () => {
    setIsOn(!isOn);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header>
      <nav className="navbar-pg">
        <div className="elements-lft">
          <div
            className={`dropdown ${isActive ? "active" : ""}`}
            id="myDropdown"
          >
            <span onClick={toggleDropdown}>
              <FontAwesomeIcon
                icon={isActive ? faChevronUp : faChevronDown}
                className="style-gico"
              />
            </span>
            <ul className="dropdown-content">
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faFileLines} className="style-icon" />
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
          <div className="logo-h">LOGO</div>
          <div className="search-container">
            <button onClick={() => alert(`Buscar: ${searchTerm}`)}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input
              type="text"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="elements-right">
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
            <span onClick={toggleProfile}>
              <FontAwesomeIcon
                icon={isOn ? faChevronUp : faChevronDown}
                className="style-gico"
              />
            </span>
            <ul className="dropdown-content-us">
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faCircleUser} className="style-icon" />
                  Ver perfil
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="style-icon"
                  />
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
