import { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";
import "./DatesAndTerms.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

interface TermData {
  cycle: string;
  status: boolean;
  ord_start_update_protocols: Date | null;
  ord_end_update_protocols: Date | null;
  ord_start_sort_protocols: Date | null;
  ord_end_sort_protocols: Date | null;
  ord_start_eval_protocols: Date | null;
  ord_end_eval_protocols: Date | null;
  ord_start_change_protocols: Date | null;
  ord_end_change_protocols: Date | null;
  ord_start_second_eval_protocols: Date | null;
  ord_end_second_eval_protocols: Date | null;
  ext_start_update_protocols: Date | null;
  ext_end_update_protocols: Date | null;
  ext_start_sort_protocols: Date | null;
  ext_end_sort_protocols: Date | null;
  ext_start_eval_protocols: Date | null;
  ext_end_eval_protocols: Date | null;
  ext_start_change_protocols: Date | null;
  ext_end_change_protocols: Date | null;
  ext_start_second_eval_protocols: Date | null;
  ext_end_second_eval_protocols: Date | null;
}

const TermDataInit: TermData = {
  cycle: "",
  status: false,
  ord_start_update_protocols: null,
  ord_end_update_protocols: null,
  ord_start_sort_protocols: null,
  ord_end_sort_protocols: null,
  ord_start_eval_protocols: null,
  ord_end_eval_protocols: null,
  ord_start_change_protocols: null,
  ord_end_change_protocols: null,
  ord_start_second_eval_protocols: null,
  ord_end_second_eval_protocols: null,
  ext_start_update_protocols: null,
  ext_end_update_protocols: null,
  ext_start_sort_protocols: null,
  ext_end_sort_protocols: null,
  ext_start_eval_protocols: null,
  ext_end_eval_protocols: null,
  ext_start_change_protocols: null,
  ext_end_change_protocols: null,
  ext_start_second_eval_protocols: null,
  ext_end_second_eval_protocols: null,
};

const timesArray = [
  "00:00",
  "00:30",
  "01:00",
  "01:30",
  "02:00",
  "02:30",
  "03:00",
  "03:30",
  "04:00",
  "04:30",
  "05:00",
  "05:30",
  "06:00",
  "06:30",
  "07:00",
  "07:30",
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
  "23:30",
];

export default function DatesAndTerms() {
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const [currentTerm, setCurrentTerm] = useState("");
  const [prevTermData, setPrevTermData] = useState<TermData>(TermDataInit);
  const [currentTermData, setCurrentTermData] = useState<TermData>(TermDataInit);
  const [listOfTerms, setListOfTerms] = useState([]);
  const [isListOfTermsEmpty, setIsListOfTermsEmpty] = useState(true);
  const [newCycle, setNewCycle] = useState(["", "1"]);
  const [isCloseCycleChecked, setIsCloseCycleChecked] = useState(false);

  const [date_ord_start_update_protocols, setDate_ord_start_update_protocols] = useState("");
  const [date_ord_end_update_protocols, setDate_ord_end_update_protocols] = useState("");
  const [date_ord_start_sort_protocols, setDate_ord_start_sort_protocols] = useState("");
  const [date_ord_end_sort_protocols, setDate_ord_end_sort_protocols] = useState("");
  const [date_ord_start_eval_protocols, setDate_ord_start_eval_protocols] = useState("");
  const [date_ord_end_eval_protocols, setDate_ord_end_eval_protocols] = useState("");
  const [date_ord_start_change_protocols, setDate_ord_start_change_protocols] = useState("");
  const [date_ord_end_change_protocols, setDate_ord_end_change_protocols] = useState("");
  const [date_ord_start_second_eval_protocols, setDate_ord_start_second_eval_protocols] = useState("");
  const [date_ord_end_second_eval_protocols, setDate_ord_end_second_eval_protocols] = useState("");
  const [date_ext_start_update_protocols, setDate_ext_start_update_protocols] = useState("");
  const [date_ext_end_update_protocols, setDate_ext_end_update_protocols] = useState("");
  const [date_ext_start_sort_protocols, setDate_ext_start_sort_protocols] = useState("");
  const [date_ext_end_sort_protocols, setDate_ext_end_sort_protocols] = useState("");
  const [date_ext_start_eval_protocols, setDate_ext_start_eval_protocols] = useState("");
  const [date_ext_end_eval_protocols, setDate_ext_end_eval_protocols] = useState("");
  const [date_ext_start_change_protocols, setDate_ext_start_change_protocols] = useState("");
  const [date_ext_end_change_protocols, setDate_ext_end_change_protocols] = useState("");
  const [date_ext_start_second_eval_protocols, setDate_ext_start_second_eval_protocols] = useState("");
  const [date_ext_end_second_eval_protocols, setDate_ext_end_second_eval_protocols] = useState("");

  const [time_ord_start_update_protocols, setTime_ord_start_update_protocols] = useState("");
  const [time_ord_end_update_protocols, setTime_ord_end_update_protocols] = useState("");
  const [time_ord_start_sort_protocols, setTime_ord_start_sort_protocols] = useState("");
  const [time_ord_end_sort_protocols, setTime_ord_end_sort_protocols] = useState("");
  const [time_ord_start_eval_protocols, setTime_ord_start_eval_protocols] = useState("");
  const [time_ord_end_eval_protocols, setTime_ord_end_eval_protocols] = useState("");
  const [time_ord_start_change_protocols, setTime_ord_start_change_protocols] = useState("");
  const [time_ord_end_change_protocols, setTime_ord_end_change_protocols] = useState("");
  const [time_ord_start_second_eval_protocols, setTime_ord_start_second_eval_protocols] = useState("");
  const [time_ord_end_second_eval_protocols, setTime_ord_end_second_eval_protocols] = useState("");
  const [time_ext_start_update_protocols, setTime_ext_start_update_protocols] = useState("");
  const [time_ext_end_update_protocols, setTime_ext_end_update_protocols] = useState("");
  const [time_ext_start_sort_protocols, setTime_ext_start_sort_protocols] = useState("");
  const [time_ext_end_sort_protocols, setTime_ext_end_sort_protocols] = useState("");
  const [time_ext_start_eval_protocols, setTime_ext_start_eval_protocols] = useState("");
  const [time_ext_end_eval_protocols, setTime_ext_end_eval_protocols] = useState("");
  const [time_ext_start_change_protocols, setTime_ext_start_change_protocols] = useState("");
  const [time_ext_end_change_protocols, setTime_ext_end_change_protocols] = useState("");
  const [time_ext_start_second_eval_protocols, setTime_ext_start_second_eval_protocols] = useState("");
  const [time_ext_end_second_eval_protocols, setTime_ext_end_second_eval_protocols] = useState("");

  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    const validUserTypes = ["AnaCATT", "SecEjec", "SecTec", "Presidente"];
    const userType = localStorage.getItem("userType") ?? "Student";

    if (!localStorage.getItem("token") || !validUserTypes.includes(userType)) {
      navigate("/");
    }
  }, []);

  const updateCurrentTerm = (newTerm: string) => {
    setCurrentTerm(newTerm);
    if (newTerm !== "") {
      const url = new URL(window.location.href);
      url.searchParams.set("cycle", newTerm);
      window.history.replaceState({}, "", url.toString());
    }
  };

  const createNewCycle = async (newCycle: string) => {
    try {
      const formData = new FormData();
      formData.append("cycle", newCycle);
      const response = await fetch("http://127.0.0.1:8000/api/dates", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Failed to create new cycle: ${newCycle}`);
      }

      setNewCycle(["", "1"]);
      setListOfTerms((prevList) => {
        const newList = [...prevList, { cycle: newCycle }];
        return newList.sort((a, b) => {
          const [yearA, semesterA] = a.cycle.split("/").map(Number);
          const [yearB, semesterB] = b.cycle.split("/").map(Number);
          if (yearA !== yearB) {
            return yearB - yearA; // Sort by year in descending order
          } else {
            return semesterB - semesterA; // Sort by semester in descending order
          }
        });
      });
      setIsListOfTermsEmpty(false);
      updateCurrentTerm(newCycle);
      popupRef.current.close();
    } catch (error) {
      console.error(`Failed to create new cycle: ${newCycle}`);
    }
  };

  const onPopupClose = () => {
    setNewCycle(["", "1"]);
    popupRef.current?.close();
  };

  // Get the list of terms from DB
  useEffect(() => {
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
        setIsListOfTermsEmpty(termsList.length === 0);

        const urlParams = new URLSearchParams(window.location.search);
        const urlCycle = urlParams.get("cycle");
        const existingTerm = termsList.find((term) => term.cycle === urlCycle);

        if (urlCycle && existingTerm) {
          setCurrentTerm(existingTerm.cycle);
        } else if (termsList.length > 0) {
          updateCurrentTerm(termsList[0].cycle);
        }
      } catch (error) {
        console.error("Error fetching terms:", error);
        setListOfTerms([]);
        setIsListOfTermsEmpty(true);
      }
    }
    fetchListOfTerms();
  }, []);

  // Get data for the chosen term
  useEffect(() => {
    async function fetchCurrentTermData() {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/date?cycle=${currentTerm}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to get data from the current term: ${currentTerm}`);
        }

        const data = await response.json();
        setPrevTermData(data);
        setCurrentTermData(data);
        setIsDataChanged(false);
      } catch (error) {
        setPrevTermData(TermDataInit);
        setCurrentTermData(TermDataInit);
      }
    }
    if (currentTerm !== "") {
      fetchCurrentTermData();
    }
  }, [currentTerm]);

  // Fill UI with data from Values
  useEffect(() => {
    const newTermData = { ...currentTermData };
    setIsCloseCycleChecked(newTermData.status);

    const formatDate = (
      date: Date | string | null | undefined,
      dateSetter: (date: string) => void,
      timeSetter: (time: string) => void
    ) => {
      if (typeof date === "string") {
        date = new Date(date);
      }

      const formattedDate = date instanceof Date && !isNaN(date.getTime()) ? date.toISOString().split("T")[0] : "";
      const formattedTime =
        date instanceof Date && !isNaN(date.getTime())
          ? date.toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";

      timeSetter(formattedTime);
      dateSetter(formattedDate);
    };

    formatDate(
      newTermData.ord_start_update_protocols,
      setDate_ord_start_update_protocols,
      setTime_ord_start_update_protocols
    );
    formatDate(
      newTermData.ord_end_update_protocols,
      setDate_ord_end_update_protocols,
      setTime_ord_end_update_protocols
    );
    formatDate(
      newTermData.ord_start_sort_protocols,
      setDate_ord_start_sort_protocols,
      setTime_ord_start_sort_protocols
    );
    formatDate(newTermData.ord_end_sort_protocols, setDate_ord_end_sort_protocols, setTime_ord_end_sort_protocols);
    formatDate(
      newTermData.ord_start_eval_protocols,
      setDate_ord_start_eval_protocols,
      setTime_ord_start_eval_protocols
    );
    formatDate(newTermData.ord_end_eval_protocols, setDate_ord_end_eval_protocols, setTime_ord_end_eval_protocols);
    formatDate(
      newTermData.ord_start_change_protocols,
      setDate_ord_start_change_protocols,
      setTime_ord_start_change_protocols
    );
    formatDate(
      newTermData.ord_end_change_protocols,
      setDate_ord_end_change_protocols,
      setTime_ord_end_change_protocols
    );
    formatDate(
      newTermData.ord_start_second_eval_protocols,
      setDate_ord_start_second_eval_protocols,
      setTime_ord_start_second_eval_protocols
    );
    formatDate(
      newTermData.ord_end_second_eval_protocols,
      setDate_ord_end_second_eval_protocols,
      setTime_ord_end_second_eval_protocols
    );
    formatDate(
      newTermData.ext_start_update_protocols,
      setDate_ext_start_update_protocols,
      setTime_ext_start_update_protocols
    );
    formatDate(
      newTermData.ext_end_update_protocols,
      setDate_ext_end_update_protocols,
      setTime_ext_end_update_protocols
    );
    formatDate(
      newTermData.ext_start_sort_protocols,
      setDate_ext_start_sort_protocols,
      setTime_ext_start_sort_protocols
    );
    formatDate(newTermData.ext_end_sort_protocols, setDate_ext_end_sort_protocols, setTime_ext_end_sort_protocols);
    formatDate(
      newTermData.ext_start_eval_protocols,
      setDate_ext_start_eval_protocols,
      setTime_ext_start_eval_protocols
    );
    formatDate(newTermData.ext_end_eval_protocols, setDate_ext_end_eval_protocols, setTime_ext_end_eval_protocols);
    formatDate(
      newTermData.ext_start_change_protocols,
      setDate_ext_start_change_protocols,
      setTime_ext_start_change_protocols
    );
    formatDate(
      newTermData.ext_end_change_protocols,
      setDate_ext_end_change_protocols,
      setTime_ext_end_change_protocols
    );
    formatDate(
      newTermData.ext_start_second_eval_protocols,
      setDate_ext_start_second_eval_protocols,
      setTime_ext_start_second_eval_protocols
    );
    formatDate(
      newTermData.ext_end_second_eval_protocols,
      setDate_ext_end_second_eval_protocols,
      setTime_ext_end_second_eval_protocols
    );
    if (prevTermData !== currentTermData) {
      setIsDataChanged(true);
    }
  }, [currentTermData, prevTermData]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement> | string, index: number | undefined) => {
    const value = typeof event === "string" ? event : event.target.value;
    const name = typeof event === "string" ? `time_${index}` : event.target.name;

    const updateCurrentTermData = (name: string) => {
      const newCurrentTermData = { ...currentTermData };
      let date = newCurrentTermData[name];
      if (!date) {
        date = new Date();
      } else {
        date = new Date(date);
      }
      date.setHours(Number(value.split(":")[0]));
      date.setMinutes(Number(value.split(":")[1]));
      newCurrentTermData[name] = date;
      setCurrentTermData(newCurrentTermData);
    };

    switch (name) {
      case "time_0":
        updateCurrentTermData("ord_start_update_protocols");
        break;
      case "time_1":
        updateCurrentTermData("ord_end_update_protocols");
        break;
      case "time_2":
        updateCurrentTermData("ord_start_sort_protocols");
        break;
      case "time_3":
        updateCurrentTermData("ord_end_sort_protocols");
        break;
      case "time_4":
        updateCurrentTermData("ord_start_eval_protocols");
        break;
      case "time_5":
        updateCurrentTermData("ord_end_eval_protocols");
        break;
      case "time_6":
        updateCurrentTermData("ord_start_change_protocols");
        break;
      case "time_7":
        updateCurrentTermData("ord_end_change_protocols");
        break;
      case "time_8":
        updateCurrentTermData("ord_start_second_eval_protocols");
        break;
      case "time_9":
        updateCurrentTermData("ord_end_second_eval_protocols");
        break;
      case "time_10":
        updateCurrentTermData("ext_start_update_protocols");
        break;
      case "time_11":
        updateCurrentTermData("ext_end_update_protocols");
        break;
      case "time_12":
        updateCurrentTermData("ext_start_sort_protocols");
        break;
      case "time_13":
        updateCurrentTermData("ext_end_sort_protocols");
        break;
      case "time_14":
        updateCurrentTermData("ext_start_eval_protocols");
        break;
      case "time_15":
        updateCurrentTermData("ext_end_eval_protocols");
        break;
      case "time_16":
        updateCurrentTermData("ext_start_change_protocols");
        break;
      case "time_17":
        updateCurrentTermData("ext_end_change_protocols");
        break;
      case "time_18":
        updateCurrentTermData("ext_start_second_eval_protocols");
        break;
      case "time_19":
        updateCurrentTermData("ext_end_second_eval_protocols");
        break;
      default:
        break;
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsCloseCycleChecked(event.target.checked);
    const newCurrentTermData = { ...currentTermData };
    newCurrentTermData.status = event.target.checked;
    setCurrentTermData(newCurrentTermData);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = event.target.value.split("-");
    const { name } = event.target;

    const updateCurrentTermData = (name: string) => {
      const newCurrentTermData = { ...currentTermData };
      let newDate = newCurrentTermData[name];
      if (!newDate) {
        newDate = new Date();
        newDate.setHours(0);
        newDate.setMinutes(0);
      } else {
        newDate = new Date(newDate);
      }
      newDate.setFullYear(Number(year));
      newDate.setMonth(Number(month) - 1);
      newDate.setDate(Number(day));

      if (name.includes("end") && newCurrentTermData[name.replace("end", "start")]) {
        const startDate = new Date(newCurrentTermData[name.replace("end", "start")]);
        if (newDate < startDate) {
          alert("La fecha de finalización no puede ser menor que la fecha de inicio.");
          return; // No actualizamos el estado si la validación falla
        }
      }

      newCurrentTermData[name] = newDate;
      setCurrentTermData(newCurrentTermData);
    };

    switch (name) {
      case "date_0":
        updateCurrentTermData("ord_start_update_protocols");
        break;
      case "date_1":
        updateCurrentTermData("ord_end_update_protocols");
        break;
      case "date_2":
        updateCurrentTermData("ord_start_sort_protocols");
        break;
      case "date_3":
        updateCurrentTermData("ord_end_sort_protocols");
        break;
      case "date_4":
        updateCurrentTermData("ord_start_eval_protocols");
        break;
      case "date_5":
        updateCurrentTermData("ord_end_eval_protocols");
        break;
      case "date_6":
        updateCurrentTermData("ord_start_change_protocols");
        break;
      case "date_7":
        updateCurrentTermData("ord_end_change_protocols");
        break;
      case "date_8":
        updateCurrentTermData("ord_start_second_eval_protocols");
        break;
      case "date_9":
        updateCurrentTermData("ord_end_second_eval_protocols");
        break;
      case "date_10":
        updateCurrentTermData("ext_start_update_protocols");
        break;
      case "date_11":
        updateCurrentTermData("ext_end_update_protocols");
        break;
      case "date_12":
        updateCurrentTermData("ext_start_sort_protocols");
        break;
      case "date_13":
        updateCurrentTermData("ext_end_sort_protocols");
        break;
      case "date_14":
        updateCurrentTermData("ext_start_eval_protocols");
        break;
      case "date_15":
        updateCurrentTermData("ext_end_eval_protocols");
        break;
      case "date_16":
        updateCurrentTermData("ext_start_change_protocols");
        break;
      case "date_17":
        updateCurrentTermData("ext_end_change_protocols");
        break;
      case "date_18":
        updateCurrentTermData("ext_start_second_eval_protocols");
        break;
      case "date_19":
        updateCurrentTermData("ext_end_second_eval_protocols");
        break;
      default:
        console.error("Invalid value");
        break;
    }
  };

  const handleSave = async () => {
    if (!isDataChanged || currentTerm === "") return;

    const formData = new URLSearchParams();
    formData.append("cycle", currentTerm);
    formData.append("status", isCloseCycleChecked ? "true" : "false");

    Object.entries(currentTermData).forEach(([key, value]) => {
      if (key !== "cycle" && key !== "status" && value !== prevTermData[key]) {
        const year = value.getUTCFullYear();
        const month = String(value.getUTCMonth() + 1).padStart(2, "0");
        const day = String(value.getUTCDate()).padStart(2, "0");
        const hours = String(value.getUTCHours()).padStart(2, "0");
        const minutes = String(value.getUTCMinutes()).padStart(2, "0");
        const seconds = String(value.getUTCSeconds()).padStart(2, "0");

        // Final formatted string
        const gmtDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        formData.append(key, gmtDate);
      }
    });

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/date`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData as BodyInit,
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      setIsDataChanged(false);
      setPrevTermData(currentTermData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("cycle", currentTerm);

      const response = await fetch(`http://127.0.0.1:8000/api/date`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
        body: formData as BodyInit,
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      const newListOfTerms = listOfTerms.filter((term) => term.cycle !== currentTerm);

      if (newListOfTerms.length === 0) {
        setListOfTerms([]);
        setIsListOfTermsEmpty(true);
        setCurrentTerm("");
      } else {
        setListOfTerms(newListOfTerms);
        setCurrentTerm(newListOfTerms[0].cycle);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleReset = () => {
    setCurrentTermData(prevTermData);
  };

  return (
    <div className="dates_and_terms">
      <div className="header-fechas">
        <div className="row-fechas">
          <div className="title-fechas">
            <button>
              <a onClick={() => navigate(-1)}>
                {" "}
                <FontAwesomeIcon icon={faChevronLeft} />
              </a>
            </button>{" "}
            Especificar Fechas
          </div>
          <div className="botones-fechas">
            {isListOfTermsEmpty ? (
              <></>
            ) : (
              <div className="dropdown-center d-inline margin-fe">
                <button className="boton-fec" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {currentTerm}
                </button>
                <ul className="dropdown-menu">
                  {listOfTerms.map((term, index) => (
                    <li key={index}>
                      <a className="dropdown-item drop-boton" onClick={() => updateCurrentTerm(term.cycle)}>
                        {term.cycle}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Popup
              ref={popupRef}
              trigger={(open) => (
                <button type="button" className="boton-ciclo">
                  Nuevo ciclo <FontAwesomeIcon icon={faPlus} className="estilo-c" />
                </button>
              )}
              modal
              nested
              closeOnDocumentClick={false}
              contentStyle={{ borderRadius: "15px" }}
            >
              {(close) => (
                <>
                  {" "}
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "1rem",
                      fontFamily: '"Poppins", sans-serif',
                      padding: "15px 15px 10px 15px",
                    }}
                  >
                    Agregar Nuevo Ciclo
                  </div>
                  <div className="input-group mb-3" style={{ padding: "10px 10px 0 10px" }}>
                    <input
                      className="form-num"
                      type="number"
                      min="2020"
                      placeholder="Ingrese año"
                      value={newCycle[0]}
                      onChange={(e) => setNewCycle([e.target.value, newCycle[1]])}
                      style={{
                        borderRadius: "15px",
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "0.9rem",
                        marginRight: "1rem",
                        padding: "0 1rem",
                      }}
                    />
                    <select
                      className="form-select"
                      value={newCycle[1]}
                      onChange={(e) => setNewCycle([newCycle[0], e.target.value])}
                      style={{
                        borderRadius: "15px",
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "0.9rem",
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end" style={{ padding: "0 0 15px 0" }}>
                    <button
                      className=" btn-outline-primary"
                      onClick={onPopupClose}
                      style={{
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        fontFamily: '"Poppins", sans-serif',
                        borderRadius: "15px",
                        padding: "5px 20px",
                        border: "2px solid #1c90f3",
                        color: "#1c90f3",
                      }}
                    >
                      Cancelar
                    </button>
                    <button
                      className="btn btn-primary ms-2"
                      onClick={() => createNewCycle(newCycle[0] + "/" + newCycle[1])}
                      style={{
                        fontWeight: 500,
                        fontSize: "0.8rem",
                        fontFamily: '"Poppins", sans-serif',
                        borderRadius: "15px",
                        margin: "0 10px 0 0",
                        padding: "5px 25px",
                        backgroundColor: "#1c90f3",
                        border: "1px solid #1c90f3",
                      }}
                    >
                      Agregar
                    </button>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
      {currentTerm === "" ? (
        <h1 className="no_data">No existen periodos en el sistema, por favor crea uno.</h1>
      ) : (
        <div className="page_body">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Fechas Ordinarias
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div className="fisrt_date_ord">
                    <h2 className="first_date_text_ord">
                      Definir rango de fechas para <b>subir protocolo</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_0"
                            value={date_ord_start_update_protocols}
                            onChange={(e) => handleDateChange(e)}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            name="time_0"
                            className="form-control"
                            value={time_ord_start_update_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            id="start_time"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end drp-ov">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 0)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_1"
                            value={date_ord_end_update_protocols}
                            onChange={(e) => handleDateChange(e)}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ord_end_update_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_1"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 1)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="second_date_ord">
                    <h2 className="second_date_text_ord">
                      Definir rango de fechas para la <b>clasificación de protocolos</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_2"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_start_sort_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ord_start_sort_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_2"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 2)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_3"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_end_sort_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ord_end_sort_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_3"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 3)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="third_date_ord">
                    <h2 className="third_date_text_ord">
                      Definir rango de fechas para la <b>evaluación de protocolos</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_4"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_start_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ord_start_eval_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_4"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 4)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_5"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_end_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ord_end_eval_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_5"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 5)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="fourth_date_ord">
                    <h2 className="fourth_date_text_ord">
                      Definir rango de fechas para la <b>corrección de protocolos</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_6"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_start_change_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ord_start_change_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_6"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 6)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_7"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_end_change_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ord_end_change_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_7"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 7)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="fifth_date_ord">
                    <h2 className="fifth_date_text_ord">
                      Definir rango de fechas para la <b>evaluación de correcciones</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_8"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_start_second_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ord_start_second_eval_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_8"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 8)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_9"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ord_end_second_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ord_end_second_eval_protocols}
                            name="time_9"
                            onChange={(e) => handleTimeChange(e, undefined)}
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 9)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Fechas Extraordinarias
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <div className="fisrt_date_ext">
                    <h2 className="first_date_text_ext">
                      Definir rango de fechas para <b>subir protocolo</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_10"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_start_update_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ext_start_update_protocols}
                            name="time_10"
                            onChange={(e) => handleTimeChange(e, undefined)}
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 10)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_11"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_end_update_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ext_end_update_protocols}
                            name="time_11"
                            onChange={(e) => handleTimeChange(e, undefined)}
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 11)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="second_date_ext">
                    <h2 className="second_date_text_ext">
                      Definir rango de fechas para la <b>clasificación de protocolos</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_12"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_start_sort_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ext_start_sort_protocols}
                            name="time_12"
                            onChange={(e) => handleTimeChange(e, undefined)}
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 12)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_13"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_end_sort_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ext_end_sort_protocols}
                            name="time_13"
                            onChange={(e) => handleTimeChange(e, undefined)}
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 13)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="third_date_ext">
                    <h2 className="third_date_text_ext">
                      Definir rango de fechas para la <b>evaluación de protocolos</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_14"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_start_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ext_start_eval_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_14"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 14)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_15"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_end_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ext_end_eval_protocols}
                            name="time_15"
                            onChange={(e) => handleTimeChange(e, undefined)}
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 15)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="fourth_date_ext">
                    <h2 className="fourth_date_text_ext">
                      Definir rango de fechas para la <b>corrección de protocolos</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_16"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_start_change_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ext_start_change_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_16"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 16)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_17"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_end_change_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ext_end_change_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_17"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 17)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                  <div className="fifth_date_ext">
                    <h2 className="fifth_date_text_ext">
                      Definir rango de fechas para la <b>evaluación de correcciones</b>
                    </h2>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="start_date"
                            name="date_18"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_start_second_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="start_time"
                            value={time_ext_start_second_eval_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_18"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 18)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-auto">
                        <span>al</span>
                      </div>
                      <div className="col">
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            id="end_date"
                            name="date_19"
                            onChange={(e) => handleDateChange(e)}
                            value={date_ext_end_second_eval_protocols}
                            disabled={isCloseCycleChecked}
                          />
                          <input
                            type="time"
                            className="form-control"
                            id="end_time"
                            value={time_ext_end_second_eval_protocols}
                            onChange={(e) => handleTimeChange(e, undefined)}
                            name="time_19"
                            disabled={isCloseCycleChecked}
                          />
                          <button
                            className="btn btn-primary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            disabled={isCloseCycleChecked}
                          />
                          <ul className="dropdown-menu dropdown-menu-end">
                            {timesArray.map((time, index) => (
                              <li key={index}>
                                <a className="dropdown-item" onClick={() => handleTimeChange(time, 19)}>
                                  {time}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="col-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row_botof">
            <div className="col_botof">
              <label
                className={`btn ${isCloseCycleChecked ? "btn-outline-primary" : "btn-danger1"}`}
                htmlFor="danger-outlined"
              >
                {isCloseCycleChecked ? "Desabilitar Periodo" : "Activar Periodo"}
              </label>
              <input
                type="checkbox"
                className="btn-check"
                name="options-outlined"
                id="danger-outlined"
                autoComplete="off"
                checked={isCloseCycleChecked}
                onChange={(e) => handleStatusChange(e)}
              />
              <button className="btn btn-danger2" onClick={handleDelete}>
                Borrar Periodo
              </button>
            </div>

            <div className="col_borg">
              <button className="btn btn-outline-primary" disabled={!isDataChanged} onClick={handleReset}>
                Restablecer Datos
              </button>
              <button className="btn btn-primary" disabled={!isDataChanged} onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
