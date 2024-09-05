import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './EEUsuarios.scss';
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function EEUsuarios ({ userKey, onDelete }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onEdit = () => {
    navigate(`/users/${userKey}`)
  }

  return (
    <div className="cont-ee">
      <button className="dropdown-ee" onClick={toggleDropdown}>
      <FontAwesomeIcon icon={faEllipsisVertical} className="icon-us" />
      </button>
      {isOpen && (
        <ul className="menu-ee">
          <li onClick={onEdit}>Editar</li>
          <li onClick={onDelete}>Eliminar</li>
        </ul>
      )}
    </div>
  );
}
