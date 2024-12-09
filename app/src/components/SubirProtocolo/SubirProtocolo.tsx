import "./SubirProtocolo.scss";
import AgregarAlumnos from "./components/AgregarAlumnos/AgregarAlumnos";
import AgregarDirector from "./components/AgregarDirector/AgregarDirector";
import AgregarPalabras from "./components/AgregarPalabras/AgregarPalabras";
import ArchivoProtocolo from "./components/ArchivoProtocolo/ArchivoProtocolo";
import AgregarSinodal from "./components/AgregarSinodal/AgregarSinodal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faCircleExclamation, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface StudentData {
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  student_id: string | null;
  career: string | null;
  curriculum: string | null;
}

interface DirectorData {
  email: string;
  name: string | null;
  lastname: string | null;
  second_lastname: string | null;
  precedence: string | null;
  cedula: File | null;
}

interface SinodalData {
  email: string;
}

interface ProtocolData {
  protocolTitle: string;
  protocolSummary: string;
  students: StudentData[];
  directors: DirectorData[];
  sinodals: SinodalData[];
  protocolTerm: string;
  keywords: string[];
  file: File | null;
}

const initialProtocolData: ProtocolData = {
  protocolTitle: "",
  protocolSummary: "",
  students: [],
  directors: [],
  sinodals: [],
  protocolTerm: "",
  keywords: [],
  file: null,
};

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
  const [listOfTerms, setListOfTerms] = useState<string[]>([]);
  const [userType, setUserType] = useState<string | null>(null);
  const [protocolPrevData, setProtocolPrevData] = useState<ProtocolData>(initialProtocolData);
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [protocolID, setProtocolID] = useState<string | null>(null);

  useEffect(() => {
    const id = window.location.pathname.split("/").pop();
    if (id !== "subir_protocolo" && id !== undefined) {
      // get protocol data from the backend
      setProtocolID(id);
      console.log("Protocol ID: " + id);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    if (localStorage.getItem("userType") !== null) {
      setUserType(localStorage.getItem("userType"));
    }
  }, [navigate]);

  useEffect(() => {
    if (userType === "") {
      checkIfUploadEnabled();
      getStudentEmail();
    }
    if (["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "")) {
      fetchListOfTerms();
      console.log(userType);
    }
  }, [userType]);

  useEffect(() => {
    const isTitleValid = protocolTitle.trim() !== "";
    const isSummaryValid = protocolSummary.trim() !== "";
    const isStudentsValid =
      students.length > 0 && students.length <= 4 && students.every((student) => student.email !== "");
    const isDirectorsValid =
      directors.length > 0 && directors.length <= 2 && directors.every((director) => director.email !== "");
    const isSinodalsValid =
      userType === "" ? true : sinodals.length === 3 && sinodals.every((sinodal) => sinodal.email !== "");
    const isKeywordsValid = keywords.length > 0 && keywords.length <= 4 && keywords.every((keyword) => keyword !== "");
    const isPDFValid = pdf !== null;
    const isProtocolTermValid = userType === "" ? true : protocolTerm !== "";
    setIsUploadEnabled(
      isTitleValid &&
        isSummaryValid &&
        isStudentsValid &&
        isDirectorsValid &&
        isSinodalsValid &&
        isKeywordsValid &&
        isPDFValid &&
        isProtocolTermValid
    );
    console.log(
      isTitleValid,
      isSummaryValid,
      isStudentsValid,
      isDirectorsValid,
      isSinodalsValid,
      isKeywordsValid,
      isPDFValid,
      isProtocolTermValid
    );
  }, [protocolTitle, protocolSummary, students, directors, sinodals, keywords, pdf, protocolTerm, listOfTerms]);

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
    } catch (error) {
      console.error("Error fetching terms");
    }
  }

  const getStudentEmail = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/selfEmail", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get the student email");
      }
      const data = await response.json();
      const studentData: StudentData = {
        email: data.email,
        name: null,
        lastname: null,
        second_lastname: null,
        student_id: null,
        career: null,
        curriculum: null,
      };

      setStudents((prev) => [...prev, studentData]);
    } catch (error) {
      console.error("Error fetching student email");
    }
  };
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

  const resetData = () => {
    setProtocolTitle(protocolPrevData.protocolTitle);
    setProtocolSummary(protocolPrevData.protocolSummary);
    setStudents(protocolPrevData.students);
    setDirectors(protocolPrevData.directors);
    setSinodals(protocolPrevData.sinodals);
    setKeywords(protocolPrevData.keywords);
    setPdf(protocolPrevData.file);
    setProtocolTerm(protocolPrevData.protocolTerm);
  };

  const createProtocol = async () => {
    if (!isUploadEnabled) return;

    const formData = new FormData();
    formData.append("title", protocolTitle);
    formData.append("resume", protocolSummary);
    formData.append("students", JSON.stringify(students));
    formData.append("directors", JSON.stringify(directors));
    ["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") &&
      formData.append("sinodals", JSON.stringify(sinodals));
    formData.append("keywords", JSON.stringify(keywords));
    ["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") && formData.append("term", protocolTerm);

    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/createProtocol", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir el protocolo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="head-pr">
        <div className="tl-u">
          <button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} className="icon" />
          </button>{" "}
          Subir protocolo
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
          <div className="icon-ed"></div>
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
          <div className="icon-ed"></div>
        </div>
        <div>
          <AgregarAlumnos students={students} setStudents={setStudents} />
        </div>
        <div>
          <AgregarDirector directors={directors} sinodals={sinodals} setDirectors={setDirectors} />
        </div>
        {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") && (
          <div>
            <AgregarSinodal sinodals={sinodals} directors={directors} setSinodals={setSinodals} />
          </div>
        )}
        {["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") && (
          <div className="item">
            <div className="tit-pr">Periodo del Protocolo</div>
            <div className="cont-pr">
              {listOfTerms.length > 0 ? (
                <div>
                  <select
                    className="form-periodo"
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

                  <div className="adv-periodo">
                    <FontAwesomeIcon icon={faCircleExclamation} className="adv-icon" /> Si el periodo que buscas no se
                    muestra, verifica que este exista
                  </div>
                </div>
              ) : (
                <div className="adv-periodo">
                  <FontAwesomeIcon icon={faCircleXmark} className="adv-icon" />
                  No existen periodos disponibles, crea uno antes de registrar un protocolo
                </div>
              )}
            </div>
            <div className="icon-ed"></div>
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
        <button className="RD" onClick={resetData} disabled={false}>
          Reiniciar Datos
        </button>{" "}
        <button className="SP" onClick={createProtocol} disabled={!isUploadEnabled}>
          {userType === "Estudiante" ? "Subir" : "Crear"} Protocolo
        </button>
      </div>
    </div>
  );
}
