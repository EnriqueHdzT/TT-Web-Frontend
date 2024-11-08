import "./RecuperarPassword.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

export default function RecuperarPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // Limpia el mensaje de error si se cambian las contraseñas
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Limpia el mensaje de error si se cambian las contraseñas
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar longitud de la contraseña
    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      setErrorMessage("");
      // Aquí puedes manejar el envío del formulario o cualquier otra lógica
      console.log("Contraseña confirmada:", password);
    }
  };

  return (
    <div>
      <div className="head-usrr">
        <div className="tl-ur">
          Contraseña
        </div>
      </div>
      <div className="body-recupass">
        <p>
          Elige una contraseña segura y no la utilices en otras cuentas.
          <br></br>
          Es posible que se cierre la sesión de tu cuenta en algunos
          dispositivos.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Contraseña nueva"
              className="password-input"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-button"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="detail-p">
            <h1>Seguridad de la contraseña:</h1>
            Utiliza al menos 8 caracteres. No uses una contraseña de otro sitio
            ni un nombre demasiado obvio, como el de tu mascota.
          </div>

          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirmar nueva contraseña"
              className="password-input"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="toggle-button"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEye : faEyeSlash}
              />
            </button>
          </div>
          <button type="submit" className="submit-button">
            Cambiar la contraseña
          </button>
          {/* Muestra el mensaje de error si las contraseñas no coinciden */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
