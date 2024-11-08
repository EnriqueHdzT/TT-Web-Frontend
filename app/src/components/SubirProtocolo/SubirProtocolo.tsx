import "./SubirProtocolo.scss";
import AgregarAlumnos from "./components/AgregarAlumnos/AgregarAlumnos";
import AgregarDirector from "./components/AgregarDirector/AgregarDirector";
import AgregarPalabras from "./components/AgregarPalabras/AgregarPalabras";
import ArchivoProtocolo from "./components/ArchivoProtocolo/ArchivoProtocolo";
import AgregarSinodal from "./components/AgregarSinodal/AgregarSinodal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StudentData {
  email: string;
  name: string;
  lastname: string;
  second_lastname: string;
  student_id: string;
  career: string;
  curriculum: string;
}

interface DirectorData {
  email: string;
  name: string;
  lastname: string;
  second_lastname: string;
  precedence: string;
  academy: string | null;
  cedula: Blob | File | null;
}

interface SinodalData {
  email: string;
}

export default function SubirProtocolo() {
  const navigate = useNavigate();

  const [protocolTitle, setProtocolTitle] = useState("");
  const [protocolSummary, setProtocolSummary] = useState("");
  const [students, setStudents] = useState<Array<StudentData>>([]);
  const [directors, setDirectors] = useState<Array<DirectorData>>([]);
  const [sinodals, setSinodals] = useState<Array<SinodalData>>([]);
  const [keywords, setKeywords] = useState<Array<string>>([]);
  const [pdf, setPdf] = useState<File | null>(null);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (localStorage.getItem("userType") === null) {
      navigate("/");
    } else {
      setUserType(localStorage.getItem("userType") as string);
    }

    const checkIfUploadEnabled = async () => {
      try {
        const data = await fetch("http://127.0.0.1:8000/api/checkUpload", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!data.ok) {
          throw new Error("Error al verificar la disponibilidad");
        }
      } catch (e) {
        console.error("Error al verificar la disponibilidad");
        
      }
    };
    if (userType === "") {
      checkIfUploadEnabled();
    }
  }, []);

  return (
    <div>
      <div className="head-pr">
        <div className="tl-u">
          <FontAwesomeIcon icon={faAngleLeft} className="icon" /> Subir protocolos
        </div>
      </div>

      <div className="protocol-bd">
        <div className="item">
          <div className="tit-pr">Titulo del protocolo</div>
          <div className="cont-pr">
            <input
              type="text"
              placeholder="Escribe el nombre de tu protocolo"
              value={protocolTitle}
              onChange={(e) => setProtocolTitle(e.target.value)}
            />
          </div>
          <div className="icon-ed">
            <FontAwesomeIcon icon={faPen} className="icon" />
          </div>
        </div>
        <div className="item">
          <div className="tit-pr">Resumen del protocolo</div>
          <div className="cont-pr">
            <input
              type="text"
              placeholder="Escribe el resumen de tu protocolo"
              value={protocolSummary}
              onChange={(e) => setProtocolSummary(e.target.value)}
            />
          </div>
          <div className="icon-ed">
            <FontAwesomeIcon icon={faPen} className="icon" />
          </div>
        </div>
        <div>
          <AgregarAlumnos student={students} setStudents={setStudents} />
        </div>
        <div>
          <AgregarDirector director={directors} setDirectors={setDirectors} />
        </div>
        {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType) && (
          <div>
            <AgregarSinodal sinodal={sinodals} setDirectors={setSinodals} />
          </div>
        )}
        <div>
          <AgregarPalabras keywords={keywords} setKeywords={setKeywords} />
        </div>
        <div>
          <ArchivoProtocolo pdf={pdf} setPdf={setPdf} />
        </div>
      </div>
      <div className="protocol-button">
        {" "}
        <button className="RD">Reiniciar Datos</button> <button className="SP">Subir Protocolo</button>
      </div>
    </div>
  );
}
