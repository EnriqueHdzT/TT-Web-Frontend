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
  setUserType: (value: string) => void;
}

const InitialLoginData: LoginData = {
  email: "",
  password: "",
};

export default function Login({ setAuth, setUserType }: LoginProps) {
  const [LoginData, setLoginData] = useState(InitialLoginData);
  const [showPassword, setShowPassword] = useState(false);
  const [wrongEmail, setIsWrongEmail] = useState(true);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [wrongPassword, setIsWrongPassword] = useState(true);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const ToastRef = document.getElementById("toast-popup");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
    if (!localStorage.getItem("userType")) {
      setUserType("Student");
    }
    if (!localStorage.getItem("token")) {
      setAuth(false);
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

  function validateEmail(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(alumno\.ipn\.mx|ipn\.mx)$/;
    return emailRegex.test(email);
  }

  function validatePassword(password: string) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,}$/;
    return passwordRegex.test(password);
  }

  const handleBlur = (e: ChangeEvent<HTMLInputElement>, checkBoth: boolean) => {
    const { name, value } = e.target;
    if (name === "email" || checkBoth) {
      const isValidEmail = validateEmail(checkBoth ? LoginData.email : value);
      setIsWrongEmail(!isValidEmail && isTypingEmail);
      setIsTypingEmail(false);
    }
    if (name === "password" || checkBoth) {
      const isValidPassword = validatePassword(checkBoth ? LoginData.password : value);
      setIsWrongPassword(!isValidPassword && isTypingPassword);
      setIsTypingPassword(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    if(loading) return;
    let mockEvent = {
      target: {
        name: "",
        value: "",
      },
    }
    handleBlur(mockEvent, true);
    setLoading(true);

    if (validateEmail(LoginData.email) && validatePassword(LoginData.password)) {
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
          localStorage.setItem("userType", data.userType ?? "Student");

          setAuth(true);
          setUserType(data.userType ?? "Student");
          navigate("/");
          navigate(0);
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

    setLoading(false);
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="contenedor-forms">
        <div className="cont-sesion">
          <div className="title-s">Iniciar Sesión</div>

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
              <div className="alerta_s">El correo no cumple con la estructura esperada.</div>
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
              <div className="alerta_s">
                La contraseña no cumple con la estructura esperada. <br /> La contraseña debe contener:
                <ul>
                  <li>Al menos una mayúscula.</li>
                  <li>Al menos un digito.</li>
                  <li>Al menos uno de los siguientes caracteres !, @, #, $, %, ^, &, ?, * </li>
                  <li>Longitud mínima de 8 caracteres.</li>
                </ul>
              </div>
            ) : (
              <></>
            )}
            <button type="submit" onClick={onClickSave}>
              {loading ? 
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                :
                'Entrar'
              }
            </button>
          </form>
          <div className="messa-sesion">
            <a href="/validar_correo" className="forget">
              Olvidé mi contraseña
            </a>
            <a href="/registro" className="register">
              Registro para alumno
            </a>
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
