import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
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
import ValidarProtocolo from "./components/ValidarProtocolo/ValidarProtocolo";
import MonitoreoProtocolo from "./components/MonitoreoProtocolo/MonitoreoProtocolo";
import PaginaPrincipal from "./components/PaginaPrincipal/PaginaPrincipal";
import RecuperarPassword from "./components/RecuperarPassword/RecuperarPassword";
import VerMas from "./components/VerMas/VerMas";
import CrearPublicacion from "./components/CrearPublicacion/CrearPublicacion";
import BuzonAyuda from "./components/Buzon/BuzonAyuda";

import "./App.scss";

export default function App() {
  const [isAuth, setAuth] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  
  const pdfEvaluar = "/Protocolo_2.pdf";
  const pdfClasificar = "/Protocolo_2.pdf";
  const pdfValidar = "/Protocolo.pdf";


  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }

    if (localStorage.getItem("userType") !== null) {
      setUserType(localStorage.getItem("userType") as string);
    } else {
      setUserType(null);
    }
  }, []);

  return (
    <div className="page-container">
      <Router>
        <Navbar isAuth={isAuth} userType={userType} />
        <div className="app-body">
          <Routes>
            <Route path="/" element={<PaginaPrincipal />} />
            <Route path="/login" element={<Login setAuth={setAuth} setUserType={setUserType} />} />
            <Route path="/registro" element={<StudentRegister />} />
            <Route path="/revisar_correo" element={<VerifiCorreo />} />
            <Route path="/validar_correo" element={<ValidateCorreo />} />
            <Route path="/usuarios" element={<VerUsuarios />} />
            <Route path="/usuarios/:id" element={<VerInfo />} />
            <Route path="/subir_protocolo" element={<SubirProtocolo />} />
            <Route path="/fechas" element={<DatesAndTerms />} />
            <Route path="/protocolos" element={<VerProtocolos />} />
            <Route path="/cambiar_contraseña" element={<Password />} />
            <Route path="/cambiar_contraseña/:token" element={<Password />} />
            <Route path="/documento/:id" element={<AbrirDocumento />} />
            <Route path="/evaprotocolo" element={<EvaluarProtocolo pdfEvaluar={pdfEvaluar} />} />
            <Route path="/clasificarprotocolo" element={<ClasificarProtocolo pdfClasificar={pdfClasificar} />} />
            <Route path="/validarprotocolo" element={<ValidarProtocolo pdfValidar={pdfValidar} />} />
            <Route path="/recuperarpassword" element={<RecuperarPassword />} />
            <Route path="/monitoreoprotocolo" element={<MonitoreoProtocolo />} />
            <Route path="/vermas" element={<VerMas />} />
            <Route path="/crear_publicacion" element={<CrearPublicacion />} />
            <Route path="/buzon" element={<BuzonAyuda />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
