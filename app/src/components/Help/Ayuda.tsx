import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Ayuda.scss";

export default function HelpSection() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/ayuda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Gracias por contactarnos, pronto nos pondremos en contacto contigo");
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

  const faqItems = [
    {
      question: "¿Cómo puedo cambiar mi contraseña?",
      answer:
        "En la parte inferior de iniciar sesion selecciona cambiar contraseña, llena el formulario. Posteriormente se enviara un correo en donde podrás cambiar la contraseña.",
    },
    {
      question: "¿Ejemplo?",
      answer:
        "Ejemplo de respuesta, Ejemplo de respuesta, Ejemplo de respuesta, Ejemplo de respuesta, Ejemplo de respuesta",
    },
    {
      question: "¿Ejemplo3?",
      answer:
        "Ejemplo de respuesta, Ejemplo de respuesta, Ejemplo de respuesta, Ejemplo de respuesta, Ejemplo de respuesta",
    },
  ];

  return (
    <section className="help-section">
      <div className="image-container">
        <img src="path/to/your/image1.jpg" alt="decorative" />
      </div>

      <div className="content-wrapper">
        <h2>¿Necesitas ayuda?</h2>

        <div className="faq">
          <h3>Preguntas Frecuentes: </h3>
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => handleToggle(index)}
            >
              <h4>{item.question}</h4>
              {openIndex === index && <p>{item.answer}</p>}
            </div>
          ))}
        </div>

        <div className="contact-form">
          <h3>Contacto</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </div>
      </div>

      <div className="image-container">
        <img src="6052277.png" alt="decorative" />
      </div>
    </section>
  );
}
