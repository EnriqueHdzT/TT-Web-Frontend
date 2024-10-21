import { useState } from 'react';
import './FiltroUsuario.scss';
import { faCircleUp, faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FiltrosUsuario ({ name = '', currentStatus='', options = [''], onChange}) {
    if(!options.includes("Todos")){
      options.push("Todos");
    }

    const [selectedOption, setSelectedOption] = currentStatus === '' ? useState(name) : useState(currentStatus);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleOptionChange = (option) => {
      option === "Todos" ? setSelectedOption(name) : setSelectedOption(option);
      option === "Todos" ? onChange('') : onChange(option);
      setIsOpen(false);   
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