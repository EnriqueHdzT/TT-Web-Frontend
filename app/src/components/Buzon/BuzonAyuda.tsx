import React, { useState } from "react";
import "./BuzonAyuda.scss";

export default function BuzonAyuda() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8000/api/ayuda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
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


    return (
        <section className="help-section">

            <div className="content-wrapper">
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
                            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required></textarea>
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
