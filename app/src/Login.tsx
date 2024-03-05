import './Login.scss';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope, faLock, faCircleExclamation  } from '@fortawesome/free-solid-svg-icons'

const Iniciosesion: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

return(
<div className='contenedor-form'>
    <div className='cont-sesion'><div className='title-s'>Iniciar Sesión</div>
    
    <form className="login-form">
        <div className='flex-lg'>
      <label htmlFor="email"><FontAwesomeIcon icon={faEnvelope} className='style-icon'/></label>
      <input type="email" id="email" name="email" placeholder="Correo Institucional" required /></div>

      <div className='flex-lg'>
      <label htmlFor="password"><FontAwesomeIcon icon={faLock} className='style-icon'/></label>
      <div className="password-container">
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Contraseña" required />
        <span className="password-icon" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span></div>
      </div>
      <button type="submit">Entrar</button>
    </form>
    <div className='messa-sesion'><a href='#' className='forget'>Olvidé mi contraseña</a>
    <a href='#' className='register'>Registro para alumno</a></div>
    </div>
    <div className='message-adv'>
    <FontAwesomeIcon icon={faCircleExclamation} className='adv-icon'/> En caso de ser docente y no encontrarse registrado en el sistema debes comunicarte con la CATT para llevar acabo el proceso.
    </div>
</div>



);
};


export default Iniciosesion;