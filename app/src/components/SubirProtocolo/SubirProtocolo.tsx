import "./SubirProtocolo.scss";
import AgregarAlumnos from "./components/AgregarAlumnos/AgregarAlumnos";
import AgregarDirector from "./components/AgregarDirector/AgregarDirector";
import AgregarPalabras from "./components/AgregarPalabras/AgregarPalabras";
import ArchivoProtocolo from "./components/ArchivoProtocolo/ArchivoProtocolo";
import AgregarSinodal from "./components/AgregarSinodal/AgregarSinodal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPen, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
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
  const [protocolTerm, setProtocolTerm] = useState("");
  const [listOfTerms, setListOfTerms] = useState([]);
  const [userType, setUserType] = useState<string | null>(null);

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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        if (!data.ok) {
          throw new Error("Error al verificar la disponibilidad");
        }
      } catch (e) {
        console.error("Error al verificar la disponibilidad");
        navigate(-1);
      }
    };

    async function fetchListOfTerms() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/dates", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to get the list of terms");
        }

        const termsList = await response.json();
        setListOfTerms(termsList);
        console.log(termsList);
      } catch (error) {
        console.error("Error fetching terms");
      }
      if (userType === "") {
        checkIfUploadEnabled();
      }
    }

    fetchListOfTerms();
  }, []);

  return (
    <div>
      <div className="head-pr">
        <div className="tl-u">
          <FontAwesomeIcon icon={faAngleLeft} className="icon" /> Subir
          protocolos
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
          <AgregarAlumnos
            userType={userType}
            students={students}
            setStudents={setStudents}
          />
        </div>
        <div>
          <AgregarDirector director={directors} setDirectors={setDirectors} />
        </div>
        {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(
          userType ?? ""
        ) && (
          <div>
            <AgregarSinodal sinodal={sinodals} setDirectors={setSinodals} />
          </div>
        )}
        {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(
          userType ?? ""
        ) && (
          <div className="item">
            <div className="tit-pr">Periodo del Protocol</div>
            <div className="cont-pr">
              {listOfTerms.length > 0 ? (
                <div>
                  <select
                    className="form-select"
                    value={protocolTerm}
                    onChange={(e) => setProtocolTerm(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Seleccionar Periodo
                    </option>
                    {listOfTerms.map((term, index) => (
                      <option key={index} value={term.cycle}>
                        {term.cycle}
                      </option>
                    ))}
                  </select>
                  <div className="adv-pr">
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="adv-icon"
                    />{" "}
                    Si el periodo que buscas no se muestra, verifica que este exista
                  </div>
                </div>
              ) : (
                <div className="button-upload">
                  No existen periodos disponibles, crea uno antes de registrar
                  un protocolo
                </div>
              )}
            </div>
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
        <button className="RD">Reiniciar Datos</button>{" "}
        <button className="SP">Subir Protocolo</button>
      </div>
    </div>
  );
}
