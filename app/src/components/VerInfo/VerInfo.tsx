import "./VerInfo.scss";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faSave, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function VerInfo() {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBoleta, setIsEditingBoleta] = useState(false);
  const [isEditingCarrera, setIsEditingCarrera] = useState(false);
  const [isEditingPEstudio, setIsEditingPEstudio] = useState(false);
  const [isEditingProcedencia, setIsEditingProcedencia] = useState(false);
  const [isEditingAcademia, setIsEditingAcademia] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingEmailper, setIsEditingEmailper] = useState(false);
  const [isEditingTelefono, setIsEditingTelefono] = useState(false);
  
  const [name, setName] = useState('Juan Pérez');
  const [boleta, setBoleta] = useState('20210001');
  const [carrera, setCarrera] = useState('Ingeniería en Sistemas Computacionales');
  const [pestudio, setPEstudio] = useState('Plan del 2009');
  const [procedencia, setProcedencia] = useState('Escom');
  const [academia, setAcademia] = useState('ISW');
  const [email, setEmail] = useState('correo@example.com');
  const [emailper, setEmailper] = useState('correo-personal@example.com');
  const [telefono, setTelefono] = useState('044 55 38 28 94');

  const toggleEditName = () => setIsEditingName(!isEditingName);
  const toggleEditBoleta = () => setIsEditingBoleta(!isEditingBoleta);
  const toggleEditCarrera = () => setIsEditingCarrera(!isEditingCarrera);
  const toggleEditPEstudio = () => setIsEditingPEstudio(!isEditingPEstudio);
  const toggleEditProcedencia = () => setIsEditingProcedencia(!isEditingProcedencia);
  const toggleEditAcademia = () => setIsEditingAcademia(!isEditingAcademia);
  const toggleEditEmail = () => setIsEditingEmail(!isEditingEmail);
  const toggleEditEmailper = () => setIsEditingEmailper(!isEditingEmailper);
  const toggleEditTelefono = () => setIsEditingTelefono(!isEditingTelefono);

  const handleCarreraChange = (e) => {
    setCarrera(e.target.value);
  };

  const handlePEstudioChange = (e) => {
    setPEstudio(e.target.value);
  };

  const handleProcedenciaChange = (e) => {
    setProcedencia(e.target.value);
  };

  const handleAcademiaChange = (e) => {
    setAcademia(e.target.value);
  };


  return (
    <div>
      <div className="t-basic">
        <div className="tl-u">Información Básica</div>
      </div>
      <div className="body-pass">
        <div className="info-item">
          <span className="title">Nombre:</span>
          {isEditingName  ? (
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
              icon={isEditingBoleta  ? faSave : faPen} 
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Carrera:</span>
          {isEditingCarrera ? (
             <select value={carrera} onChange={handleCarreraChange}>           
             <option value="Ingenieria en Sistemas Computacionales">Ingenieria en Sistemas Computacionales</option>
             <option value="Inteligencia Artificial">Inteligencia Artificial</option>
             <option value="Licenciatura en Ciencia de Datos">Licenciatura en Ciencia de Datos</option>
           </select>
          ) : (
            <span className="value">{carrera}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditCarrera}
              icon={isEditingCarrera  ? faSave : faPen}  
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Plan de Estudio:</span>
          {isEditingPEstudio ? (
             <select value={pestudio} onChange={handlePEstudioChange}>           
             <option value="Plan del 2009">Plan del 2009</option>
             <option value="Plan del 2020">Plan del 2020</option>
             </select>
          ) : (
            <span className="value">{pestudio}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditPEstudio}
              icon={isEditingPEstudio  ? faSave : faPen} 
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">*Procedencia:</span>
          {isEditingProcedencia ? (
             <select value={procedencia} onChange={handleProcedenciaChange}>           
             <option value="escom">ESCOM</option>
             <option value="cidetec">CIDETEC</option>
             </select>
          ) : (
            <span className="value">{procedencia.toUpperCase()}</span>
          )}
          <div className="con-ico">
          <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditProcedencia}
              icon={isEditingProcedencia  ? faSave : faPen} 
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">*Academia:</span>
          {isEditingAcademia ? (
             <select value={academia} onChange={handleAcademiaChange}>           
             <option value="isw">ISW</option>
             <option value="other">OTHER</option>
             </select>
          ) : (
            <span className="value">{academia.toUpperCase()}</span>
          )}
          <div className="con-ico">
            <FontAwesomeIcon
              className="edit-icon"
              onClick={toggleEditAcademia}
              icon={isEditingAcademia  ? faSave : faPen}
            />
          </div>
        </div>
        
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
              icon={isEditingEmail  ? faSave : faPen}
            />
          </div>
        </div>
        <div className="info-item">
          <span className="title">Correo personal:</span>
          {isEditingEmailper ? (
        <input
          type="text"
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
              icon={isEditingEmailper  ? faSave : faPen}
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
              icon={isEditingTelefono  ? faSave : faPen}
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
          <a href="/password"><FontAwesomeIcon
              className="edit-icon"
              icon={faChevronRight}
            /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
