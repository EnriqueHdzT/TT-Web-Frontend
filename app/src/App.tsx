import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Login from "./Login";
import StudentRegister from "./StudentRegister";
import VerifiCorreo from "./VerifiCorreo";
import ValidateCorreo from "./ValidateCorreo"

import "./App.scss";
import VerUsuarios from "./VerUsuarios";

export default function App() {
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);

  return (
    <>
      <Router>
        <Navbar isAuth={isAuth} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login setAuth={setAuth}/>} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/verify" element={<VerifiCorreo />} />
          <Route path="/validate" element={<ValidateCorreo />} />
          <Route path="/users" element={<VerUsuarios />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}
