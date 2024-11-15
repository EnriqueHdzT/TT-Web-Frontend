import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import StudentRegister from "./components/StudentRegister/StudentRegister";
import VerifiCorreo from "./components/VerifiCorreo/VerifiCorreo";
import ValidateCorreo from "./components/ValidateCorreo/ValidateCorreo";
import VerUsuarios from "./components/VerUsuarios/VerUsuarios";
//import UserInfo from "./components/UserInfo/UserInfo";
import DatesAndTerms from "./components/DatesAndTerms/DatesAndTerms";
import Footer from "./components/Footer/Footer";
import SubirProtocolo from "./components/SubirProtocolo/SubirProtocolo";
import VerProtocolos from "./components/VerProtocolos/VerProtocolos";
import Password from "./components/Password/Password";
import VerInfo from "./components/VerInfo/VerInfo";


import "./App.scss";
import RecuperarContrasena from "./components/RecuperarPassword/RecuperarContrasena.tsx";
import HelpSection from "./components/Help/Ayuda.tsx";

export default function App() {
  const [isAuth, setAuth] = useState(false);

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
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login setAuth={setAuth} />} />
            <Route path="/register" element={<StudentRegister />} />
            <Route path="/verify" element={<VerifiCorreo />} />
            <Route path="/validate" element={<ValidateCorreo />} />
            <Route path="/ayuda" element={<HelpSection/>}/>
            <Route path="/recuperar/:token" element={<RecuperarContrasena />} />
            // Protected routes
            {isAuth ? (
              <>
                <Route path="/users" element={<VerUsuarios />} />

                <Route path="/protocols" element={<SubirProtocolo />} />
                <Route path="/dates" element={<DatesAndTerms />} />
                <Route path="/seeprotocols" element={<VerProtocolos />} />
                <Route path="/password" element={<Password />} />
                <Route path="/verinfo" element={<VerInfo />} />{" "}
              </>
            ) : null}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}
