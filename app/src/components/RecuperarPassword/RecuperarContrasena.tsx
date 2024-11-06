import React, { useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";

export default function RecuperarContrasena() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // Usamos id ahora

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();

        if (!id) {
            setMessage("ID no encontrado en la URL.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        const formData = new URLSearchParams();
        formData.append('id', id);
        formData.append('password', newPassword);
        formData.append('password_confirmation', confirmPassword);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/reset-password/${id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData as BodyInit,
            });

            if (response.ok) {
                setMessage("Contraseña cambiada exitosamente");
                setTimeout(() => navigate("/"), 3000);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.message} + ID: + ${id}`);
            }
        } catch (error) {
            setMessage("Error al cambiar contraseña. Inténtalo más tarde.");
            console.error("Error al cambiar contraseña", error);
        }
    }

    return (
        <div className="contenedor-form">
            <div className="cont-ver">
                <div className="title-v"></div>
                <form className="validate-email">
                    <div className="flex-lg">
                        <label htmlFor="newPassword">
                            <FontAwesomeIcon icon={faUnlock} className="style-icon" />
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Nueva Contraseña"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                        />
                    </div>
                    <div className="flex-lg">
                        <label htmlFor="confirmPassword">
                            <FontAwesomeIcon icon={faUnlock} className="style-icon" />
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirma Nueva Contraseña"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>
                    <div>
                        <button onClick={onClickSave}>Cambiar Contraseña</button>
                    </div>
                    {message && <div className="message">{message}</div>}
                </form>
            </div>
        </div>
    );
}