import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { SHA256 } from "crypto-js";

export default function RecuperarContrasena() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { token } = useParams<{ token: string }>(); // Usamos id ahora

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Limpia el mensaje de error si se cambian las contraseñas
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    // Limpia el mensaje de error si se cambian las contraseñas
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    // Si ya existe lógica para verificación del token o similares, inclúyela aquí
    const formData = new URLSearchParams();
    formData.append("token", token);
    const handlePasswordChange = SHA256(password).toString();
    const handleConfirmPasswordChange = SHA256(confirmPassword).toString();
    formData.append("password", handlePasswordChange);
    formData.append("password_confirmation", handleConfirmPasswordChange);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reset-password/${token}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData as BodyInit,
      });
      if (response.ok) {
        setErrorMessage("Contraseña cambiada exitosamente");
        setTimeout(() => navigate("/"), 3000);
      } else {
        setErrorMessage("Error al cambiar la contraseña");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      setErrorMessage("Error al cambiar la contraseña");
      console.error("Error al cambiar contraseña", error);
    }
  }

  return (
    <div>
      <div className="head-usr">
        <div className="tl-u">
          <a className="button-icon" onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Contraseña
        </div>
      </div>
      <div className="body-pass-s">
        <p>
          Elige una contraseña segura y no la utilices en otras cuentas.
          <br></br>
          Es posible que se cierre la sesión de tu cuenta en algunos dispositivos.
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
            <button type="button" onClick={togglePasswordVisibility} className="toggle-button">
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>

          <div className="detail-p">
            <h1>Seguridad de la contraseña:</h1>
            Utiliza al menos 8 caracteres. Al menos uno de los caracter especiales ~, !, @, #, $, %, ^, &, * <br />
            Al menos un numero. Al menos una letra mayúscula. Al menos una letra minuscula. <br />
            No uses una contraseña de otro sitio ni un nombre demasiado obvio, como el de tu mascota.
          </div>

          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirmar nueva contraseña"
              className="password-input"
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility} className="toggle-button">
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </button>
          </div>
          <button type="submit" className="submit-button" onClick={(event) => onClickSave(event)}>
            Cambiar la contraseña
          </button>
          {/* Muestra el mensaje de error si las contraseñas no coinciden */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
