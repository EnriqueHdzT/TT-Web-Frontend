import "./ValidateCorreo.scss";
import React, { useState, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function ValidateCorreo() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    // Validación simple de email. Puede mejorarse según tus necesidades
    return /\S+@\S+\.\S+/.test(email);
  };

  async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!isValidEmail(email) || !isValidEmail(confirmEmail)) {
      setMessage("Por favor, ingresa un correo válido.");
      return;
    }

    if (email !== confirmEmail) {
      setMessage("Los correos electrónicos no coinciden.");
      return;
    }

    const formData = new URLSearchParams();
    formData.append("email", email);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/recuperar-password", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData as BodyInit,
      });
      if (response.ok) {
        setMessage("Revisa tu correo para más instrucciones para recuperar tu contraseña");
        setTimeout(() => navigate("/"), 3000);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Error al recuperar contraseña. Inténtalo más tarde.");
      console.error("Error al recuperar contraseña", error);
    }
  }

  return (
    <div className="contenedor-forms">
      <div className="cont-vers">
        <div className="title-contra">Recuperar contraseña</div>
        <form className="validate-email-contra">
          <div className="flex-lg">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Correo Institucional"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="flex-lg">
            <label htmlFor="confirmEmail">
              <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
            </label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              placeholder="Reingresa Correo Institucional"
              value={confirmEmail}
              onChange={handleConfirmEmailChange}
              required
            />
          </div>
          {message && <div className="message alerta_r">{message}</div>}

          <button onClick={onClickSave}>Recuperar</button>
        </form>
        <div className="messa-re">
          <a href="/login" className="reg">
            Regresar
          </a>
        </div>
      </div>
    </div>
  );
}
