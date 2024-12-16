import "./Protocolinfo.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import axios from "axios";

export default function Protocolinfo({
                                         id = null,
                                         idProtocol = null,
                                         titleProtocol = null,
                                         statusProtocol = null,
                                         studentList = [],
                                         directorList = [],
                                         sinodalList = []
                                     }) {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null); // Estado para almacenar el ID del usuario

    // Obtener el ID del usuario cuando el componente se monta
    useEffect(() => {
        async function fetchUserId() {
            const token = localStorage.getItem("token"); // Obtener token de autorización
            if (!token) {
                console.error("No se encontró token de autorización.");
                return;
            }

            try {
                const response = await fetch("http://127.0.0.1:8000/api/userId", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Error al obtener el usuario");
                }

                const data = await response.json();
                setUserId(data.id); // Asignamos el ID del usuario al estado
            } catch (error) {
                console.error("Error en el servidor al obtener el ID del usuario:", error);
            }
        }

        fetchUserId();
    }, []); // Solo se ejecuta cuando el componente se monta

    // Navegar al documento
    function seeDocument() {
        navigate(`/documento/${idProtocol}`);
    }

    // Navegar a Clasificar Protocolo
    function classifyProtocol() {
        navigate(`/clasificarprotocolo/${id}`);
    }

    // Seleccionar protocolo
    async function selectProtocol() {
        const token = localStorage.getItem("token"); // Recuperar el token
        if (!token) {
            console.error("No se encontró un token de autorización.");
            return;
        }

        if (!userId) {
            console.error("No se pudo obtener el ID del usuario.");
            alert("Error: No se encontró el ID del usuario.");
            return;
        }

        alert(`Seleccionando protocolo: ${id} para el usuario: ${userId}`);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/selectProtocol", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}` // Agregar el token en los headers
                },
                body: JSON.stringify({
                    userId, // Incluimos el userId
                    id // Incluimos el idProtocol
                }) // Convertimos los datos a formato JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Protocolo seleccionado con éxito:", responseData);
            alert("Protocolo seleccionado con éxito");
        } catch (error) {
            alert("Error al seleccionar el protocolo");
            console.error("Error al seleccionar el protocolo:", error);
        }
    }

    return (
        <div className="p-box">
            <div className="p-tit">
                {titleProtocol} <br />
                {idProtocol}
            </div>
            <div className="p-buttons">
                <Popup
                    trigger={(open) => (
                        <button type="button" className="btn btn-outline-primary">
                            Validar
                        </button>
                    )}
                    modal
                    nested
                    closeOnDocumentClick={false}
                >
                    {(close) => (
                        <>
                            <h1 className="popup_title">¿Vas a validar?</h1>
                            <div>
                                <button className="btn btn-outline-primary" onClick={close}>
                                    Ño
                                </button>
                                <button className="btn btn-primary">Shi</button>
                            </div>
                        </>
                    )}
                </Popup>
                {statusProtocol === "validating" && (
                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={classifyProtocol}
                    >
                        Clasificar
                    </button>
                )}
                <button type="button" className="btn btn-outline-primary" onClick={seeDocument}>
                    Documento
                </button>
                <button type="button" className="btn btn-outline-primary" onClick={selectProtocol}>
                    Seleccionar
                </button>
            </div>
            <div className="p-statu">
                <button type="button" className="btn btn-outline-primary">
                    {statusProtocol}
                </button>
            </div>
        </div>
    );
}