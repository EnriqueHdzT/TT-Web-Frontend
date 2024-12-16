import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuzonAyuda.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function BuzonAyuda() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/buzon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      }else if (response.ok) {
        alert(
          "Gracias por contactarnos, pronto nos pondremos en contacto contigo"
        );
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        alert("Error al enviar el mensaje");
      }
    } catch (error) {
      alert("Error al enviar el mensaje");
    }
  };

  return (
    <div className="buzon-content">
      <div className="form-contenedor">
        <div className="texto-buzon">
          <h1>Bienvenido al Buzón de Ayuda</h1>
          Queremos que la comunicación con la CATT sea efectiva entre docentes y
          alumnos, por lo mismo puedes dejar aquí cualquier pregunta que no
          hayas encontrado en la página principal, recuerda ser respetuoso y
          detallar tu pregunta para que podamos ofrecerte la mejor solución. La
          respuesta la obtendrás por medio del correo electrónico que has
          especificado. En dado caso de no obtener una solución eficiente puedes
          acudir a la CATT para que resolvamos tu duda de manera más personal.
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-buzon">
            <div className="div-email">
              <label htmlFor="email" className="email-label">
                <div className="icon-box">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="email-input"
                placeholder="Ingresa tu correo electrónico"
              />
            </div>

            <label htmlFor="name" className="name-label">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="name-input"
              placeholder="Coloca aqui tu nombre"
            />

            <label htmlFor="message" className="message-label">
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="message-input"
              placeholder="Escribe el mensaje"
            ></textarea>

            <div className="buttonbuzon">
              <button type="submit">Enviar</button>
            </div>
          </div>
        </form>
      </div>

      <div className="image-conten">
        <img src="/2.png" alt="Ejemplo" />
      </div>
    </div>
  );
}
