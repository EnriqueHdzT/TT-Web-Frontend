import { ChangeEvent, useState } from "react";

// Define the type for student data
interface StudentData {
  first_lastName: string;
  second_lastName: string;
  name: string;
  student_ID: string;
  career: string;
  curriculum: string;
  email: string;
}

const initialStudentData: StudentData = {
  first_lastName: "",
  second_lastName: "",
  name: "",
  student_ID: "",
  career: "",
  curriculum: "",
  email: "",
}

export default function StudentRegister() {
  const [studentData, setStudentData] = useState(initialStudentData)

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
      formData.append("student_ID", studentData.student_ID);
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

  return (
    <>
      <h2>Agregar Estudiante</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailEntry">Correo:</label>
          <input
            type="email"
            className="form-control"
            name="emailEntry"
            id="emailEntry"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstLastName">Primer Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="first_lastName"
            id="firstLastName"
            value={studentData.first_lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="secondLastName">Segundo Apellido:</label>
          <input
            type="text"
            className="form-control"
            name="second_lastName"
            id="secondLastName"
            value={studentData.second_lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Carnet de Estudiante:</label>
          <input
            type="text"
            name="student_ID"
            value={studentData.student_ID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Carrera:</label>
          <input
            type="text"
            name="career"
            value={studentData.career}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Curriculum:</label>
          <input
            type="text"
            name="curriculum"
            value={studentData.curriculum}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Agregar Estudiante</button>
      </form>
    </>
  );
}