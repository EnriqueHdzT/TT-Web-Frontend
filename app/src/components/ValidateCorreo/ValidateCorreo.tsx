import "./ValidateCorreo.scss";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ValidateCorreo() {
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [emailMatch, setEmailMatch] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isTypingEmailConfirmation, setIsTypingEmailConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate(-1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setIsTypingEmail(true);
    }
    if (name === "email_confirmation") {
      setEmailConfirmation(value);
      setIsTypingEmailConfirmation(true);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(alumno\.ipn\.mx|ipn\.mx)$/;
      setEmailMatch(value !== emailConfirmation);
      setVerifyEmail(!emailRegex.test(value));
      setIsTypingEmail(false);
    }
    if (name === "email_confirmation") {
      setEmailMatch(value !== email);
      setIsTypingEmailConfirmation(false);
    }
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!verifyEmail && !emailMatch) {
      navigate("/revisar_correo");
    }
  };

  return (
    <div className="contenedor-form">
      <div className="cont-ver">
        <div className="title-v">Valida tu correo</div>
        <form className="validate-email" onSubmit={handleSubmit}>
          <div className="flex-lg">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
            </label>
            <input
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email"
              name="email"
              placeholder="Correo Institucional"
              required
            />
          </div>
          {verifyEmail && !isTypingEmail && (
            <div className="alert alert-danger text-center" role="alert">
              El correo no cumple con la estructura esperada *@alumno.ipn.mx
            </div>
          )}
          <div className="flex-lg">
            <label htmlFor="email">
              <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
            </label>
            <input
              value={emailConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              id="email_confirmation"
              name="email_confirmation"
              placeholder="Valida tu Correo Institucional"
              required
            />
          </div>
          {emailMatch && !isTypingEmailConfirmation && (
            <div className="alert alert-danger text-center" role="alert">
              Los correos no coinciden
            </div>
          )}
          <div>
            <button type="submit" disabled={verifyEmail && emailMatch}>
              Validar
            </button>
          </div>
        </form>
        <div className="messa-re">
          <a onClick={handleRegresar} className="reg">
            Regresar
          </a>
        </div>
      </div>
    </div>
  );
}
