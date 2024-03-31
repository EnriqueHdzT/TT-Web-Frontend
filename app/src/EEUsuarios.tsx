import React, { useState } from 'react';
import './EEUsuarios.scss';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EEUsuarios ({ onDelete }) {
  const options = ['Editar', 'Eliminar'];
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="cont-ee">
      <button className="dropdown-ee" onClick={toggleDropdown}>
      <FontAwesomeIcon icon={faEllipsisVertical} className="icon-us" />
      </button>
      {isOpen && (
        <ul className="menu-ee">
          {options.map((option, index) => (
            <li key={index}>{option}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
