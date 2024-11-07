import React, { useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlock } from "@fortawesome/free-solid-svg-icons";
import { SHA256 } from "crypto-js";

export default function RecuperarContrasena() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [wrongPassword, setIsWrongPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);  // New State
    const [attemptedSave, setAttemptedSave] = useState(false); // New State
    const navigate = useNavigate();
    const { token } = useParams<{ token: string }>();  // Usamos id ahora

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);

        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,}$/;
        setIsWrongPassword(!passwordRegex.test(e.target.value));
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    async function onClickSave(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        setAttemptedSave(true);  // Set the attempted save to true

        if (!token) {
            setMessage("Token no encontrado en la URL.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }

        if (wrongPassword) {
            setMessage("La contraseña no cumple con la estructura esperada.");
            return;
        }

        const formData = new URLSearchParams();
        formData.append('token', token);
        const hashedNewPassword = SHA256(newPassword).toString();
        const hashedConfirmPassword = SHA256(confirmPassword).toString();
        formData.append('password', hashedNewPassword);
        formData.append('password_confirmation', hashedConfirmPassword);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/reset-password/${token}`, {
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
                setMessage(`Error: Ya no es valida tu solicitud`);
                setTimeout(() => navigate("/validate"), 3000);
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
                            type={showPassword ? "text" : "password"}  // Modified here
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
                            type={showPassword ? "text" : "password"}  // Modified here
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirma Nueva Contraseña"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                    </div>

                    {newPassword !== "" && wrongPassword && attemptedSave && (
                        <div className="adv-incorrect-password">
                            <p className="adv-incorrect-password-title">
                                <FontAwesomeIcon icon={faUnlock} className="adv-icon" />
                                La contraseña no cumple con la estructura esperada
                            </p>
                            <p>Tu contraseña debe contener:</p>
                            <ul className="adv-incorrect-password-list">
                                <li>Al menos una mayúscula</li>
                                <li>Al menos un digito</li>
                                <li>Al menos uno de los siguientes caracteres !, @, #, $, %, ^, &, ?, * </li>
                                <li>Longitud mínima de 8 caracteres</li>
                            </ul>
                        </div>
                    )}

                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            Mostrar contraseña
                        </label>
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