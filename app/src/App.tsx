import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import StudentRegister from "./components/StudentRegister/StudentRegister";
import VerifiCorreo from "./components/VerifiCorreo/VerifiCorreo";
import ValidateCorreo from "./components/ValidateCorreo/ValidateCorreo";
import VerUsuarios from "./components/VerUsuarios/VerUsuarios";
import DatesAndTerms from "./components/DatesAndTerms/DatesAndTerms";
import Footer from "./components/Footer/Footer";
import SubirProtocolo from "./components/SubirProtocolo/SubirProtocolo";
import VerProtocolos from "./components/VerProtocolos/VerProtocolos";
import Password from "./components/Password/Password";
import VerInfo from "./components/VerInfo/VerInfo";
import AbrirDocumento from "./components/AbrirDocumento/Documento";
import EvaluarProtocolo from "./components/EvaluarProtocolo/EvaluarPro";
import ClasificarProtocolo from "./components/ClasificarProtocolo/ClasificarProtocolo";

import "./App.scss";

export default function App() {
  const [isAuth, setAuth] = useState(false);
  const [userType, setUserType] = useState("");

  const pdfUrl = "/Protocolo.pdf";
  const pdfEvaluar = "/Protocolo_2.pdf";
  const pdfClasificar = "/Protocolo_2.pdf";

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      if (localStorage.getItem("token")) {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/keepalive", {
            method: "POST",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          if (!response.ok) {
            throw new Error("Error al chequear la sesión");
          }

          setAuth(true);
        } catch {
          localStorage.removeItem("token");
          setAuth(false);
        }
      }
    };

    const intervalID = setInterval(checkSession, 1000 * 30);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="page-container">
      <Router>
        <Navbar isAuth={isAuth} />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<Homepage isAuth={isAuth} userType={userType} />} />
            <Route path="/login" element={<Login isAuth={isAuth} setAuth={setAuth} setUserType={setUserType} />} />
            <Route path="/registro" element={<StudentRegister />} />
            <Route path="/revisar_correo" element={<VerifiCorreo />} />
            <Route path="/validar_correo" element={<ValidateCorreo />} />
            <Route path="/usuarios" element={<VerUsuarios isAuth={isAuth} userType={userType} />} />
            <Route path="/usuarios/:id" element={<VerInfo isAuth={isAuth} userType={userType} />} />
            <Route path="/subir_protocolo" element={<SubirProtocolo isAuth={isAuth} userType={userType} />} />
            <Route path="/fechas" element={<DatesAndTerms isAuth={isAuth} userType={userType} />} />
            <Route path="/protocolos" element={<VerProtocolos isAuth={isAuth} userType={userType} />} />
            <Route path="/cambiar_contraseña" element={<Password isAuth={isAuth} />} />
            <Route path="/cambiar_contraseña/:token" element={<Password />} />
            <Route path="/documento/:id" isAuth={isAuth} element={<AbrirDocumento pdfUrl={pdfUrl} />} />
            <Route path="/evaprotocolo" element={<EvaluarProtocolo pdfEvaluar={pdfEvaluar} />} />
            <Route path="/clasificarprotocolo" element={<ClasificarProtocolo pdfClasificar={pdfClasificar} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
