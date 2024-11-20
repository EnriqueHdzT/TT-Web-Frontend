import "./Login.scss";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope, faLock, faCircleExclamation, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { SHA256 } from "crypto-js";
import { Toast } from "bootstrap";

interface LoginData {
  email: string;
  password: string;
}

interface LoginProps {
  setAuth: (value: boolean) => void;
}

const InitialLoginData: LoginData = {
  email: "",
  password: "",
};

export default function Login({ setAuth }: LoginProps) {
  const [LoginData, setLoginData] = useState(InitialLoginData);
  const [showPassword, setShowPassword] = useState(false);
  const [wrongEmail, setIsWrongEmail] = useState(true);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [wrongPassword, setIsWrongPassword] = useState(true);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const ToastRef = document.getElementById("toast-popup");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      setIsTypingEmail(true);
    }
    if (name === "password") {
      setIsTypingPassword(true);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(alumno\.ipn\.mx|ipn\.mx)$/;
      setIsWrongEmail(!emailRegex.test(value) && isTypingEmail);
      setIsTypingEmail(false);
    }
    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,}$/;
      setIsWrongPassword(!passwordRegex.test(value) && isTypingPassword);
      setIsTypingPassword(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    if (!wrongEmail && !wrongPassword) {
      try {
        const formData = new URLSearchParams();
        formData.append("email", LoginData.email);
        const hashedPassword = SHA256(LoginData.password).toString();
        formData.append("password", hashedPassword);

        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData as BodyInit,
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          setAuth(true);
          navigate("/");
        } else {
          const errorData = await response.json();
          setToastTitle("Error");
          setToastMessage(errorData.message || "Error al iniciar sesión");
          const toastBoostrap = ToastRef ? Toast?.getOrCreateInstance(ToastRef) : null;
          if (toastBoostrap) {
            toastBoostrap.show();
          }
        }
      } catch (error) {
        setToastTitle("Error");
        setToastMessage("Error al iniciar sesión");
        const toastBoostrap = ToastRef ? Toast?.getOrCreateInstance(ToastRef) : null;
        if (toastBoostrap) {
          toastBoostrap.show();
        }
      }
    }
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="contenedor-form">
        <div className="card text-bg-light mb-3">
          <div className="card-body">
            <h5 className="card-title">Iniciar Sesión</h5>

            <form className="login-form">
              <div className="flex-lg">
                <label className="form-label" htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={LoginData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Correo Institucional"
                  required
                />
              </div>
              {wrongEmail && !isTypingEmail && LoginData.email !== "" ? (
                <div className="adv-pr">
                  <FontAwesomeIcon icon={faCircleXmark} className="adv-icon" /> El correo no cumple con la estructura
                  esperada
                </div>
              ) : (
                <></>
              )}

              <div className="flex-lg">
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} className="style-icon" />
                </label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    value={LoginData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contraseña"
                    required
                  />
                  <span className="password-icon" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
              </div>
              {wrongPassword && !isTypingPassword && LoginData.password !== "" ? (
                <div className="adv-incorrect-password">
                  <p className="adv-incorrect-password-title">
                    <FontAwesomeIcon icon={faCircleXmark} className="adv-icon" /> La contraseña no cumple con la
                    estructura esperada
                  </p>
                  <p>Tu contraseña debe contener:</p>
                  <ul className="adv-incorrect-password-list">
                    <li>Al menos una mayúscula</li>
                    <li>Al menos un digito</li>
                    <li>Al menos uno de los siguientes caracteres !, @, #, $, %, ^, &, ?, * </li>
                    <li>Longitud mínima de 8 caracteres</li>
                  </ul>
                </div>
              ) : (
                <></>
              )}
              <button type="submit" onClick={(event) => onClickSave(event)}>
                Entrar
              </button>
            </form>
            <div className="messa-sesion">
              <a href="/validate" className="forget">
                Olvidé mi contraseña
              </a>
              <a href="/register" className="register">
                Registro para alumno
              </a>
            </div>
          </div>
        </div>
        <div className="card text-bg-light">
          <div className="card-body ">
            <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> En caso de ser docente y no encontrarse
            registrado en el sistema debes comunicarte con la CATT para llevar acabo el proceso.
          </div>
        </div>
        <div className="toast-container position-fixed top-0 end-0 p-3">
          <div id="toast-popup" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">{toastTitle}</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/");
    return null;
  }
}
