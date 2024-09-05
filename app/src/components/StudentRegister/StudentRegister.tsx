import "./StudentRegister.scss";
import "./Login.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faEnvelope, faChevronLeft, faUser, faHashtag, faGraduationCap, faLock, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { ChangeEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define the type for student data
interface StudentData {
  first_lastName: string;
  second_lastName: string;
  name: string;
  student_id: string;
  career: string;
  curriculum: string;
  email: string;
}

const initialStudentData: StudentData = {
  first_lastName: "",
  second_lastName: "",
  name: "",
  student_id: "",
  career: "",
  curriculum: "",
  email: "",
}

export default function StudentRegister() {
  const [studentData, setStudentData] = useState(initialStudentData)
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("email", studentData.email);
      formData.append("first_lastName", studentData.first_lastName);
      formData.append("second_lastName", studentData.second_lastName);
      formData.append("name", studentData.name);
      formData.append("student_id", studentData.student_id);
      formData.append("career", studentData.career);
      formData.append("curriculum", studentData.curriculum);

      const response = await fetch("http://127.0.0.1:8000/api/addStudent", {
        method: "POST",
        headers: {
          "Accept": "application/json"
        },
        body: formData as BodyInit
      });
      if (response.ok) {
        // Si la solicitud es exitosa, puedes realizar alguna acción adicional, como limpiar el formulario
        setStudentData(initialStudentData);
        console.log("Estudiante agregado correctamente");
      } else {
        console.error("Error al agregar el estudiante");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="contenedor-form">
      <div className="cont-register">
      <div className="elements-flex"><a href="/login"><FontAwesomeIcon icon={faChevronLeft}/></a> <div className='title-r'>Registro de alumno</div></div>
      <form onSubmit={handleSubmit} className="register-form">
      <div className="messg-top">Recuerda ingresar datos consistentes</div>
      <div className='flex-lg'>
          <label><FontAwesomeIcon icon={faUser} className='style-icon'/></label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            placeholder="Nombre(s)"
            required
          /></div>
<div className='flex-lg'>
<label htmlFor="firstLastName"><FontAwesomeIcon icon={faUser} className='style-icon'/></label>
          <input
            type="text"
            name="first_lastName"
            id="firstLastName"
            value={studentData.first_lastName}
            onChange={handleChange}
            placeholder="Primer apellido"
            required
          /></div>
          
        <div className="flex-lg">
          <label htmlFor="secondLastName"><FontAwesomeIcon icon={faUser} className='style-icon'/></label>
          <input
            type="text"
            name="second_lastName"
            id="secondLastName"
            value={studentData.second_lastName}
            onChange={handleChange}
            placeholder="Segundo apellido"
            required
          />
        </div>
        
        <div className="flex-lg">
          <label htmlFor="emailEntry"><FontAwesomeIcon icon={faEnvelope} className='style-icon'/></label>
          <input
            type="email"
            name="emailEntry"
            id="emailEntry"
            value={studentData.email}
            onChange={handleChange}
            placeholder="Correo Institucional"
            required
          />
          </div>

          <div className="flex-lg">
          <label htmlFor="emailEntry"><FontAwesomeIcon icon={faEnvelope} className='style-icon'/></label>
          <input
            type="email"
            name="emailEntry"
            id="emailEntry"
            value={studentData.email}
            onChange={handleChange}
            placeholder="Confirmar Correo Institucional"
            required
          />
          </div>
        
        <div className="flex-lg">
          <label><FontAwesomeIcon icon={faHashtag} className='style-icon'/></label>
          <input
            type="text"
            name="student_id"
            value={studentData.student_id}
            onChange={handleChange}
            placeholder="Número de boleta"
            required
          />
        </div>
        <div className="flex-lg">
          <label><FontAwesomeIcon icon={faGraduationCap} className='style-icon'/></label>
          <input
            type="text"
            name="career"
            value={studentData.career}
            onChange={handleChange}
            placeholder="Carrera"
            required
          />
        </div>
        <div className='flex-lg'>
      <label htmlFor="password"><FontAwesomeIcon icon={faLock} className='style-icon'/></label>
      <div className="password-container">
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Contraseña" required />
        <span className="password-icon" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span></div>
      </div>

        <div className='flex-lg'>
      <label htmlFor="password"><FontAwesomeIcon icon={faLock} className='style-icon'/></label>
      <div className="password-container">
        <input type={showPassword ? 'text' : 'password'} id="password" name="password" placeholder="Confirmar contraseña" required />
        <span className="password-icon" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span></div>
      </div>
        <button type="submit">Registrar</button>
      </form>
      </div>
      
    <div className="aviso-doc"><FontAwesomeIcon icon={faCircleExclamation} className='adv-icon'/> En caso de ser docente y no encontrarse registrado en el sistema debes comunicarte con la CATT para llevar acabo el proceso.
    </div>
      </div>
  );

}