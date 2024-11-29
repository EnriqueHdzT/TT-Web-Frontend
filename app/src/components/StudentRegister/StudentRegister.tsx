import "./StudentRegister.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import {
  faEnvelope,
  faChevronLeft,
  faUser,
  faHashtag,
  faGraduationCap,
  faLock,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";
import { SHA256 } from "crypto-js";

// Define the type for student data
interface StudentData {
  first_lastName: string;
  second_lastName: string;
  name: string;
  email: string;
  email_confirmation: string;
  usr_id: string;
  career: string;
  curriculum: string;
  password: string;
  password_confirmation: string;
}

const initialStudentData: StudentData = {
  first_lastName: "",
  second_lastName: "",
  name: "",
  email: "",
  email_confirmation: "",
  usr_id: "",
  career: "",
  curriculum: "",
  password: "",
  password_confirmation: "",
};

export default function StudentRegister() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [studentData, setStudentData] = useState(initialStudentData);
  const [wrongEmail, setIsWrongEmail] = useState(false);
  const [isTypingEmail, setIsTypingEmail] = useState(false);
  const [isTypingEmailConfirmation, setIsTypingEmailConfirmation] = useState(false);
  const [emailConfirmationNotMatch, setEmailConfirmationNotMatch] = useState(false);
  const [wrongPassword, setIsWrongPassword] = useState(false);
  const [isTypingPassword, setIsTypingPassword] = useState(false);
  const [isTypingPasswordConfirmation, setIsTypingPasswordConfirmation] = useState(false);
  const [passwordConfirmationNotMatch, setPasswordConfirmationNotMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const ToastRef = document.getElementById("toast-popup");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      setIsTypingEmail(true);
    }
    if (name === "password") {
      setIsTypingPassword(true);
    }
    if (name === "email_confirmation") {
      setIsTypingEmailConfirmation(true);
    }
    if (name === "password_confirmation") {
      setIsTypingPasswordConfirmation(true);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@alumno\.ipn\.mx$/;
      setIsWrongEmail(!emailRegex.test(value) && isTypingEmail);
      setIsTypingEmail(false);
    }
    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,}$/;
      setIsWrongPassword(!passwordRegex.test(value) && isTypingPassword);
      setIsTypingPassword(false);
    }
    if (name === "email_confirmation") {
      setEmailConfirmationNotMatch(value !== studentData.email && isTypingEmailConfirmation);
      setIsTypingEmailConfirmation(false);
    }
    if (name === "password_confirmation") {
      setPasswordConfirmationNotMatch(value !== studentData.password && isTypingPasswordConfirmation);
      setIsTypingPasswordConfirmation(false);
    }
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("first_lastName", studentData.first_lastName);
      studentData.second_lastName !== "" && formData.append("second_lastName", studentData.second_lastName);
      formData.append("name", studentData.name);
      formData.append("email", studentData.email);
      formData.append("email_confirmation", studentData.email_confirmation);
      formData.append("usr_id", studentData.usr_id);
      formData.append("career", studentData.career);
      if (studentData.career === "IIA" || studentData.career === "LCD") {
        studentData.curriculum = "2020";
      }
      formData.append("curriculum", studentData.curriculum);
      formData.append("password", SHA256(studentData.password).toString());
      formData.append("password_confirmation", SHA256(studentData.password_confirmation).toString());

      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData as BodyInit,
      });
      if (!response.ok) {
        throw new Error("Error al registrar el estudiante");
      }
      setStudentData(initialStudentData);
      navigate("/revisar_correo");

    } catch (error) {
      setToastTitle("Error");
      setToastMessage("Error al registrar el estudiante");
      const toastBoostrap = ToastRef ? Toast?.getOrCreateInstance(ToastRef) : null;
      if (toastBoostrap) {
        toastBoostrap.show();
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="contenedor-form">
      <div className="card text-bg-light mb-3">
        <div className="card-body">
          <div className="d-flex align-items-left">
            <h5 className="card-title">Registro de estudiante</h5>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="messg-top">Recuerda ingresar datos consistentes</div>
          <div className="flex-lg">
            <label htmlFor="name">
              <FontAwesomeIcon icon={faUser} className="style-icon" />
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              placeholder="Nombre(s)"
              required
            />
          </div>
          <div className="flex-lg">
            <label htmlFor="firstLastName">
              <FontAwesomeIcon icon={faUser} className="style-icon" />
            </label>
            <input
              type="text"
              name="first_lastName"
              id="firstLastName"
              value={studentData.first_lastName}
              onChange={handleChange}
              placeholder="Primer apellido"
              required
            />
          </div>

          <div className="flex-lg">
            <label htmlFor="secondLastName">
              <FontAwesomeIcon icon={faUser} className="style-icon" />
            </label>
            <input
              type="text"
              name="second_lastName"
              id="secondLastName"
              value={studentData.second_lastName}
              onChange={handleChange}
              placeholder="Segundo apellido"
            />
          </div>

          <div className="flex-lg">
            <label htmlFor="emailEntry">
              <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
            </label>
            <input
              type="email"
              name="email"
              id="emailEntry"
              value={studentData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Correo Institucional"
              required
            />
          </div>

          {wrongEmail && (
            <div className="alert alert-danger text-center" role="alert">
              El correo no cumple con la estructura esperada *@alumno.ipn.mx
            </div>
          )}

          <div className="flex-lg">
            <label htmlFor="emailConfirmation">
              <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
            </label>
            <input
              type="email"
              name="email_confirmation"
              id="emailConfirmation"
              value={studentData.email_confirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Confirmar Correo Institucional"
              required
            />
          </div>

          {emailConfirmationNotMatch && !isTypingEmailConfirmation && (
            <div className="alert alert-danger text-center" role="alert">
              Los correos no coinciden
            </div>
          )}

          <div className="flex-lg">
            <label htmlFor="student_id">
              <FontAwesomeIcon icon={faHashtag} className="style-icon" />
            </label>
            <input
              type="number"
              id="student_id"
              name="usr_id"
              value={studentData.usr_id}
              onChange={handleChange}
              placeholder="Número de boleta"
              required
            />
          </div>
          <div className="flex-lg">
            <label htmlFor="career">
              <FontAwesomeIcon icon={faGraduationCap} className="style-icon" />
            </label>
            <select
              className="form-select"
              id="career"
              name="career"
              value={studentData.career}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Selecciona tu Carrera:
              </option>
              <option value="ISW">Ingeniería en Sistemas Computacionales</option>
              <option value="IIA">Ingeniería en Inteligencia Artificial</option>
              <option value="LCD">Licenciatura en Ciencias de Datos</option>
            </select>
          </div>
          {studentData.career === "ISW" && (
            <div className="flex-lg">
              <label htmlFor="curriculum">
                <FontAwesomeIcon icon={faGraduationCap} className="style-icon" />
              </label>
              <select
                className="form-select"
                id="curriculum"
                name="curriculum"
                value={studentData.curriculum}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Selecciona tu Plan de Estudios:
                </option>
                <option value="2009">2009</option>
                <option value="2020">2020</option>
              </select>
            </div>
          )}
          <div className="flex-lg">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="style-icon" />
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Contraseña"
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>

          {wrongPassword && !isTypingPassword && (
            <div className="alert alert-danger text-center" role="alert">
              La contraseñas no cumplen con la estructura esperada:
              <br />
              <ul>
                <li>Al menos 8 caracteres</li>
                <li>Al menos uno de los caracter especiales ~, !, @, #, $, %, ^, &, * </li>
                <li>Al menos un numero</li>
                <li>Al menos una letra mayúscula</li>
                <li>Al menos una letra minuscula</li>
              </ul>
            </div>
          )}

          <div className="flex-lg">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faLock} className="style-icon" />
            </label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password_confirmation"
                placeholder="Confirmar contraseña"
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              <span className="password-icon" onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>

          {passwordConfirmationNotMatch && !isTypingPasswordConfirmation && (
            <div className="alert alert-danger text-center" role="alert">
              Las contraseñas no coinciden
            </div>
          )}

          <button className="btn btn-primary mb-3" type="submit">
            Registrar
          </button>
        </form>
      </div>

      <div className="card text-bg-light mb-3">
        <div className="card-body">
          <h5 className="card-title">
            <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" />
            En caso de ser docente y no encontrarse registrado en el sistema debes comunicarte con la CATT para llevar
            acabo el proceso.
          </h5>
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
}
