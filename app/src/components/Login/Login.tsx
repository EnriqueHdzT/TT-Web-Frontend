import "./Login.scss";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faEnvelope,
  faLock,
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

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
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name === 'email'){
      setIsTypingEmail(true)
    }
    if(name === 'password'){
      setIsTypingPassword(true)
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'email'){
      const emailRegex = /^[a-zA-Z0-9._%+-]+@(alumno\.ipn\.mx|ipn\.mx)$/;
      setIsWrongEmail(!emailRegex.test(value) && isTypingEmail);
      setIsTypingEmail(false);
    }
    if(name === 'password'){
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,}$/;
      setIsWrongPassword(!passwordRegex.test(value) && isTypingPassword);
      setIsTypingPassword(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onClickSave(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();

    if (!wrongEmail && !wrongPassword ) {
      try {
        const formData = new URLSearchParams();
        formData.append("email", LoginData.email);
        formData.append("password", LoginData.password);
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData as BodyInit,
        });

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        setAuth(true);
        navigate("/");

        console.log("Login successful");
      } catch (error: any) {
        console.error("Login failed:", error.message);
      }
    } else {
      console.log("Wrong credentials");
    }
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="contenedor-form">
        <div className="cont-sesion">
          <div className="title-s">Iniciar Sesión</div>

          <form className="login-form">
            <div className="flex-lg">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={LoginData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Correo Institucional"
                required
              />
            </div>
            {wrongEmail && !isTypingEmail && LoginData.email !== '' ? 
            (<div className="adv-pr"><FontAwesomeIcon icon={faCircleXmark} className="adv-icon" /> El correo no cumple con la estructura esperada</div>):
            (<></>)}

            <div className="flex-lg">
              <label htmlFor="password">
                <FontAwesomeIcon icon={faLock} className="style-icon" />
              </label>
              <div className="password-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={LoginData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Contraseña"
                  required
                />
                <span
                  className="password-icon"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            {wrongPassword && !isTypingPassword && LoginData.password !== '' ? 
            (<div className="adv-pr"><FontAwesomeIcon icon={faCircleXmark} className="adv-icon" /> La contraseña no cumple con la estructura esperada</div>):
            (<></>)}
            <button type="submit" onClick={(event) => onClickSave(event)}>
              Entrar
            </button>
          </form>
          <div className="messa-sesion">
            <a href="#" className="forget">
              Olvidé mi contraseña
            </a>
            <a href="/register" className="register">
              Registro para alumno
            </a>
          </div>
        </div>
        <div className="message-adv">
          <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> En
          caso de ser docente y no encontrarse registrado en el sistema debes
          comunicarte con la CATT para llevar acabo el proceso.
        </div>
      </div>
    );
  } else {
    navigate("/");
    return null;
  }
}