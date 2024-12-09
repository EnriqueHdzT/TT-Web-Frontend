import "./Password.scss";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { SHA256 } from "crypto-js";

export default function Password() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams<{ id: string }>();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
    } else {
      setErrorMessage("");
      console.log("Contraseña confirmada:", password);
    }
  };

  async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!id) {
      setErrorMessage("ID no encontrado en la URL");
      return;
    }
    const formData = new URLSearchParams();
    formData.append('id', id);
    const hashedPassword = SHA256(password).toString();
    const hashedConfirmPassword = SHA256(confirmPassword).toString();
    formData.append('password', hashedPassword);
    formData.append('password_confirmation', hashedConfirmPassword);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/reset-id/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData as BodyInit,
      });

      if (response.ok) {
        setErrorMessage("Contraseña cambiada exitosamente");
      } else {
        setErrorMessage("Error al cambiar la contraseña");
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
            Elige una contraseña segura y no la utilices en otras cuentas.<br />
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
              Utiliza al menos 8 caracteres. Al menos uno de los caracter especiales ~, !, @, #, $, %, ^, &, * <br />
              Al menos un número. Al menos una letra mayúscula. Al menos una letra minúscula. <br />
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
            <button type="submit" className="submit-button" onClick={(event) => onClickSave(event)}>
              Cambiar la contraseña
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
  );
}