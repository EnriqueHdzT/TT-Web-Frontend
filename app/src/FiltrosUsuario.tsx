import React, { useState } from 'react';
import './FiltroUsuario.scss';
import { faCircleUp, faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FiltrosUsuario ({ title, options, defaultOption, onChange }) {
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOptionChange = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      onChange(option); // Llamar a la función onChange con la opción seleccionada
    };
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

  return (
    <div className="dropdown-filter">
    <div className="dropdown-header" onClick={toggleDropdown}>
      <button className="dropdown-button">
        {selectedOption}
        <span className={`arrow ${isOpen ? 'open' : ''}`}><FontAwesomeIcon icon={isOpen ? faCircleUp : faCircleDown}/></span>
      </button>
    </div>
    {isOpen && (
      <div className="dropdown-menu">
        {options.map((option, index) => (
          <button key={index} onClick={() => handleOptionChange(option)}>
            {option}
          </button>
        ))}
      </div>
    )}
  </div>
  );
}