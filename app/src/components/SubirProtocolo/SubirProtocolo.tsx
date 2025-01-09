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
const userType = localStorage.getItem("userType");

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
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [protocolPrevData, setProtocolPrevData] = useState<ProtocolData>(initialProtocolData);
  const [protocolStatus, setProtocolStatus] = useState<null | string>(null);
  const [disableButtons, setDisableButtons] = useState(false);

  const [protocolID, setProtocolID] = useState<string | null>(null);

  useEffect(() => {
    const getProtocolData = async (id: string) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/protocol/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to get the protocol data");
        }
        const data = await response.json();
        setProtocolPrevData({
          protocolTitle: data.title,
          protocolSummary: data.resume,
          students: data.students,
          directors: data.directors,
          sinodals: data.sinodals,
          protocolTerm: data.cycle,
          keywords: data.keywords,
          file: null,
        });
        setProtocolTitle(data.title);
        setProtocolSummary(data.resume);
        setStudents(data.students);
        setDirectors(data.directors);
        setSinodals(data.sinodals);
        setKeywords(data.keywords);
        setPdf(null);
        setProtocolTerm(data.cycle);
        setProtocolStatus(data.status);
      } catch (error) {
        console.error(error);
        navigate(-1);
      }
    };

    const id = window.location.pathname.split("/").pop();
    if (id !== "protocolo" && id !== undefined) {
      setProtocolID(id);
      getProtocolData(id);
    }
  }, []);

  useEffect(() => {
    if (userType === "Student") {
      setDisableButtons(!["validating", "correcting", ""].includes(protocolStatus ?? ""));
    }
  }, [protocolStatus]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (userType === "Student" && protocolID === null) {
      checkIfUploadEnabled();
      getStudentEmail();
    }
    if (["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "")) {
      fetchListOfTerms();
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
      userType === "Student"
        ? true
        : (sinodals.length === 3 && sinodals.every((sinodal) => sinodal.email !== "")) || sinodals.length === 0;
    const isKeywordsValid = keywords.length > 0 && keywords.length <= 4 && keywords.every((keyword) => keyword !== "");
    const isPDFValid = pdf !== null;
    const isProtocolTermValid = userType === "Student" ? true : protocolTerm !== "";
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
        name: data.name,
        lastname: data.lastName,
        second_lastname: data.secondLastName ?? null,
        student_id: null,
        career: null,
        curriculum: null,
      };

      setStudents([studentData]);
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

  const createProtocol = async () => {
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
      const response = await fetch("http://127.0.0.1:8000/api/protocol", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al subir el protocolo");
      }

      const data = await response.json();

      if (data.error) {
        console.error(data.error);
      } else {
        navigate(`${data.protocol}`);
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProtocol = async () => {
    const formData = new FormData();
    if (protocolTitle !== protocolPrevData.protocolTitle) {
      formData.append("title", protocolTitle);
    }
    if (protocolSummary !== protocolPrevData.protocolSummary) {
      formData.append("resume", protocolSummary);
    }
    if (JSON.stringify(students) !== JSON.stringify(protocolPrevData.students)) {
      formData.append("students", JSON.stringify(students));
    }
    if (JSON.stringify(directors) !== JSON.stringify(protocolPrevData.directors)) {
      formData.append("directors", JSON.stringify(directors));
    }

    if (JSON.stringify(keywords) !== JSON.stringify(protocolPrevData.keywords)) {
      formData.append("keywords", JSON.stringify(keywords));
    }
    ["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") &&
      JSON.stringify(sinodals) !== JSON.stringify(protocolPrevData.sinodals) &&
      formData.append("sinodals", JSON.stringify(sinodals));

    ["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") &&
      protocolTerm !== protocolPrevData.protocolTerm &&
      formData.append("term", protocolTerm);
    if (pdf) {
      formData.append("pdf", pdf);
    }

    try {
      const id = window.location.pathname.split("/").pop();
      const response = await fetch(`http://127.0.0.1:8000/api/protocol/${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Error al actualizar el protocolo");
      }

      navigate(0);
    } catch (error) {
      alert("Error al actualizar el protocolo");
      console.error(error);
    }
  };

  const resetData = () => {
    setProtocolTitle(protocolPrevData.protocolTitle);
    setProtocolSummary(protocolPrevData.protocolSummary);
    setStudents(protocolPrevData.students);
    setDirectors(protocolPrevData.directors);
    setSinodals(protocolPrevData.sinodals);
    setProtocolTerm(protocolPrevData.protocolTerm);
    setKeywords(protocolPrevData.keywords);
  };

  return (
    <div>
      <div className="head-pr">
        <div className="tl-u">
          <button onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} className="icon" />
          </button>{" "}
          {protocolID !== null ? "Editar" : "Subir"} protocolo
        </div>
      </div>

      <div className="protocol-bd">
        <div className="item">
          <div className="tit-pr">Titulo del protocolo</div>
          <div className="cont-pr">
            <input
              type="text"
              disabled={disableButtons}
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
              disabled={disableButtons}
              placeholder="Escribe el resumen de tu protocolo"
              value={protocolSummary}
              onChange={(e) => setProtocolSummary(e.target.value)}
            />
          </div>
          <div className="icon-ed"></div>
        </div>
        <div>
          <AgregarAlumnos students={students} setStudents={setStudents} disableButtons={disableButtons} />
        </div>
        <div>
          <AgregarDirector
            directors={directors}
            sinodals={sinodals}
            setDirectors={setDirectors}
            disableButtons={disableButtons}
          />
        </div>
        {(["AnaCATT", "SecEjec", "SecTec", "Presidente"].includes(userType ?? "") || protocolStatus !== null) && (
          <div>
            <AgregarSinodal
              sinodals={sinodals}
              directors={directors}
              setSinodals={setSinodals}
              disableButtons={["Student", "Prof"].includes(userType ?? "") ? true : false}
            />
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
          <AgregarPalabras keywords={keywords} setKeywords={setKeywords} disableButtons={disableButtons} />
        </div>
        <div>
          <ArchivoProtocolo pdf={pdf} setPdf={setPdf} disableButtons={disableButtons} />
        </div>
      </div>
      {!disableButtons && (
        <div className="protocol-button">
          {" "}
          <button className="RD" onClick={resetData} disabled={false}>
            Reiniciar Datos
          </button>{" "}
          {protocolID === null ? (
            <button className="SP" onClick={createProtocol} disabled={!isUploadEnabled}>
              {userType === "Student" ? "Subir" : "Crear"} Protocolo
            </button>
          ) : (
            <button className="SP" onClick={updateProtocol}>
              Actualizar Protocolo
            </button>
          )}
        </div>
      )}
    </div>
  );
}
