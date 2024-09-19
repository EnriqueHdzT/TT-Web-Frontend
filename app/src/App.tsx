import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Login/Login";
import StudentRegister from "./components/StudentRegister/StudentRegister";
import VerifiCorreo from "./components/VerifiCorreo/VerifiCorreo";
import ValidateCorreo from "./components/ValidateCorreo/ValidateCorreo";
import VerUsuarios from "./components/VerUsuarios/VerUsuarios";
import UserInfo from "./components/UserInfo/UserInfo";
import DatesAndTerms from "./components/DatesAndTerms/DatesAndTerms";
import Footer from "./components/Footer/Footer";
import SubirProtocolo from "./components/SubirProtocolo/SubirProtocolo";
import VerProtocolos from "./components/VerProtocolos/VerProtocolos"

import "./App.scss";

export default function App() {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/verify" element={<VerifiCorreo />} />
          <Route path="/validate" element={<ValidateCorreo />} />
          <Route path="/users" element={<VerUsuarios />} />
          <Route path="/users/:id" element={<UserInfo />} />
          <Route path="/protocols" element={<SubirProtocolo />} />
          <Route path="/dates" element={<DatesAndTerms />} />
          <Route path="/seeprotocols" element={<VerProtocolos />} />


          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
