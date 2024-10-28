import { useEffect, useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useNavigate } from "react-router-dom";

interface TermData {
  cycle: string;
  status: boolean;
  start_recv_date_ord: Date | string;
  end_recv_date_ord: Date | string;
  recom_classif_end_date_ord: Date | string;
  recom_eval_end_date_ord: Date | string;
  correc_end_date_ord: Date | string;
  recom_second_eval_end_date_ord: Date | string;
  start_recv_date_ext: Date | string;
  end_recv_date_ext: Date | string;
  recom_classif_end_date_ext: Date | string;
  recom_eval_end_date_ext: Date | string;
  correc_end_date_ext: Date | string;
  recom_second_eval_end_date_ext: Date | string;
}

const TermDataInit: TermData = {
  cycle: "",
  status: false,
  start_recv_date_ord: "",
  end_recv_date_ord: "",
  recom_classif_end_date_ord: "",
  recom_eval_end_date_ord: "",
  correc_end_date_ord: "",
  recom_second_eval_end_date_ord: "",
  start_recv_date_ext: "",
  end_recv_date_ext: "",
  recom_classif_end_date_ext: "",
  recom_eval_end_date_ext: "",
  correc_end_date_ext: "",
  recom_second_eval_end_date_ext: "",
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
  const [currentTermData, setCurrentTermData] = useState<TermData>(TermDataInit);
  const [listOfTerms, setListOfTerms] = useState([]);
  const [isListOfTermsEmpty, setIsListOfTermsEmpty] = useState(true);
  const [newCycle, setNewCycle] = useState(["", "1"]);
  const [isCloseCycleChecked, setIsCloseCycleChecked] = useState(false);
  const [ord_start_update_protocols, setOrd_start_update_protocols] = useState<Date | null>(null);
  const [ord_end_update_protocols, setOrd_end_update_protocols] = useState<Date | null>(null);
  const [ord_start_sort_protocols, setOrd_start_sort_protocols] = useState<Date | null>(null);
  const [ord_end_sort_protocols, setOrd_end_sort_protocols] = useState<Date | null>(null);
  const [ord_start_eval_protocols, setOrd_start_eval_protocols] = useState<Date | null>(null);
  const [ord_end_eval_protocols, setOrd_end_eval_protocols] = useState<Date | null>(null);
  const [ord_start_change_protocols, setOrd_start_change_protocols] = useState<Date | null>(null);
  const [ord_end_change_protocols, setOrd_end_change_protocols] = useState<Date | null>(null);
  const [ord_start_second_eval_protocols, setOrd_start_second_eval_protocols] = useState<Date | null>(null);
  const [ord_end_second_eval_protocols, setOrd_end_second_eval_protocols] = useState<Date | null>(null);
  const [ext_start_update_protocols, setExt_start_update_protocols] = useState<Date | null>(null);
  const [ext_end_update_protocols, setExt_end_update_protocols] = useState<Date | null>(null);
  const [ext_start_sort_protocols, setExt_start_sort_protocols] = useState<Date | null>(null);
  const [ext_end_sort_protocols, setExt_end_sort_protocols] = useState<Date | null>(null);
  const [ext_start_eval_protocols, setExt_start_eval_protocols] = useState<Date | null>(null);
  const [ext_end_eval_protocols, setExt_end_eval_protocols] = useState<Date | null>(null);
  const [ext_start_change_protocols, setExt_start_change_protocols] = useState<Date | null>(null);
  const [ext_end_change_protocols, setExt_end_change_protocols] = useState<Date | null>(null);
  const [ext_start_second_eval_protocols, setExt_start_second_eval_protocols] = useState<Date | null>(null);
  const [ext_end_second_eval_protocols, setExt_end_second_eval_protocols] = useState<Date | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const updateCurrentTerm = (newTerm: string) => {
    setCurrentTerm(newTerm);
    updateUrlCycleParam(newTerm);
  };

  const updateUrlCycleParam = (newCycle: string) => {
    if (newCycle !== "") {
      const url = new URL(window.location.href);
      url.searchParams.set("cycle", newCycle);
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
          setCurrentTerm(termsList[0].cycle);
          updateUrlCycleParam(termsList[0].cycle);
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
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to get data from the current term: ${currentTerm}`);
        }

        const data = await response.json();
        setCurrentTermData(data);
        console.log(data);
      } catch (error) {
        setCurrentTermData(TermDataInit);
      }
    }
    if (currentTerm !== "") {
      fetchCurrentTermData();
    }
  }, [currentTerm]);

  const checkTimeOrDefault = (date: Date | null): string => {
    const isDefaultDate = date instanceof Date && date.getTime() === Date.UTC(1970, 0, 1);

    if (!date || isDefaultDate) {
      return "";
    }

    // Extract hours and minutes, and format as "HH:MM"
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (time: string, value: number) => {
    const updateTime = (currentDate: Date | null, setterFunc: (date: Date) => void) => {
      const [hours, minutes] = time.split(":").map(Number);
      let newDate;

      if (currentDate instanceof Date && !isNaN(currentDate)) {
        // Clone the current date and only update the time
        newDate = new Date(currentDate);
        newDate.setHours(hours);
        newDate.setMinutes(minutes);
        newDate.setSeconds(0);
        newDate.setMilliseconds(0);
      } else {
        // Create a new "time-only" Date at UTC 1970-01-01
        const now = new Date();
        newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0, 0);
      }

      setterFunc(newDate);
    };
    switch (value) {
      case 0:
        updateTime(ord_start_update_protocols, setOrd_start_update_protocols);
        break;
      case 1:
        updateTime(ord_end_update_protocols, setOrd_end_update_protocols);
        break;
      case 2:
        updateTime(ord_start_sort_protocols, setOrd_start_sort_protocols);
        break;
      case 3:
        updateTime(ord_end_sort_protocols, setOrd_end_sort_protocols);
        break;
      case 4:
        updateTime(ord_start_eval_protocols, setOrd_start_eval_protocols);
        break;
      case 5:
        updateTime(ord_end_eval_protocols, setOrd_end_eval_protocols);
        break;
      case 6:
        updateTime(ord_start_change_protocols, setOrd_start_change_protocols);
        break;
      case 7:
        updateTime(ord_end_change_protocols, setOrd_end_change_protocols);
        break;
      case 8:
        updateTime(ord_start_second_eval_protocols, setOrd_start_second_eval_protocols);
        break;
      case 9:
        updateTime(ord_end_second_eval_protocols, setOrd_end_second_eval_protocols);
        break;
      case 10:
        updateTime(ext_start_update_protocols, setExt_start_update_protocols);
        break;
      case 11:
        updateTime(ext_end_update_protocols, setExt_end_update_protocols);
        break;
      case 12:
        updateTime(ext_start_sort_protocols, setExt_start_sort_protocols);
        break;
      case 13:
        updateTime(ext_end_sort_protocols, setExt_end_sort_protocols);
        break;
      case 14:
        updateTime(ext_start_eval_protocols, setExt_start_eval_protocols);
        break;
      case 15:
        updateTime(ext_end_eval_protocols, setExt_end_eval_protocols);
        break;
      case 16:
        updateTime(ext_start_change_protocols, setExt_start_change_protocols);
        break;
      case 17:
        updateTime(ext_end_change_protocols, setExt_end_change_protocols);
        break;
      case 18:
        updateTime(ext_start_second_eval_protocols, setExt_start_second_eval_protocols);
        break;
      case 19:
        updateTime(ext_end_second_eval_protocols, setExt_end_second_eval_protocols);
        break;
      default:
        console.error("Invalid value");
        break;
    }
  };

  const checkDateOrDefault = (date: Date | null): string => {
    const isDefaultDate = date instanceof Date && date.getTime() === Date.UTC(1970, 0, 1);

    if (!date || isDefaultDate) {
      return "";
    }
    return date instanceof Date ? date.toISOString().slice(0, 10) : "";
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = event.target.value;
    const [year, month, day] = newDateString.split("-").map(Number);

    const updateDateWithCurrentTime = (currentDate: Date | null, setterFunc) => {
      let newDate;

      if (currentDate instanceof Date && !isNaN(currentDate)) {
        newDate = new Date(currentDate);
        newDate.setFullYear(year);
        newDate.setMonth(month - 1); // Month is 0-indexed
        newDate.setDate(day);
      } else {
        // Default to current date with midnight as time
        newDate = new Date(year, month - 1, day);
      }

      setterFunc(newDate);
    };

    switch (event.target.name) {
      case "date_0":
        updateDateWithCurrentTime(ord_start_update_protocols, setOrd_start_update_protocols);
        break;
      case "date_1":
        updateDateWithCurrentTime(ord_end_update_protocols, setOrd_end_update_protocols);
        break;
      case "date_2":
        updateDateWithCurrentTime(ord_start_sort_protocols, setOrd_start_sort_protocols);
        break;
      case "date_3":
        updateDateWithCurrentTime(ord_end_sort_protocols, setOrd_end_sort_protocols);
        break;
      case "date_4":
        updateDateWithCurrentTime(ord_start_eval_protocols, setOrd_start_eval_protocols);
        break;
      case "date_5":
        updateDateWithCurrentTime(ord_end_eval_protocols, setOrd_end_eval_protocols);
        break;
      case "date_6":
        updateDateWithCurrentTime(ord_start_change_protocols, setOrd_start_change_protocols);
        break;
      case "date_7":
        updateDateWithCurrentTime(ord_end_change_protocols, setOrd_end_change_protocols);
        break;
      case "date_8":
        updateDateWithCurrentTime(ord_start_second_eval_protocols, setOrd_start_second_eval_protocols);
        break;
      case "date_9":
        updateDateWithCurrentTime(ord_end_second_eval_protocols, setOrd_end_second_eval_protocols);
        break;
      case "date_10":
        updateDateWithCurrentTime(ext_start_update_protocols, setExt_start_update_protocols);
        break;

      case "date_11":
        updateDateWithCurrentTime(ext_end_update_protocols, setExt_end_update_protocols);
        break;
      case "date_12":
        updateDateWithCurrentTime(ext_start_sort_protocols, setExt_start_sort_protocols);
        break;
      case "date_13":
        updateDateWithCurrentTime(ext_end_sort_protocols, setExt_end_sort_protocols);
        break;
      case "date_14":
        updateDateWithCurrentTime(ext_start_eval_protocols, setExt_start_eval_protocols);
        break;
      case "date_15":
        updateDateWithCurrentTime(ext_end_eval_protocols, setExt_end_eval_protocols);
        break;
      case "date_16":
        updateDateWithCurrentTime(ext_start_change_protocols, setExt_start_change_protocols);
        break;
      case "date_17":
        updateDateWithCurrentTime(ext_end_change_protocols, setExt_end_change_protocols);
        break;
      case "date_18":
        updateDateWithCurrentTime(ext_start_second_eval_protocols, setExt_start_second_eval_protocols);
        break;
      case "date_19":
        updateDateWithCurrentTime(ext_end_second_eval_protocols, setExt_end_second_eval_protocols);
        break;
      default:
        console.error("Invalid value");
        break;
    }
  };

  return (
    <div className="dates_and_terms">
      <div className="title-bar">
        <div className="row">
          <div className="col">
            <h1>
              <a onClick={() => navigate(-1)}>&lt;</a> Especificar Fechas
            </h1>
          </div>
          <div className="col">
            {isListOfTermsEmpty ? (
              <></>
            ) : (
              <div className="dropdown-center d-inline">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {currentTerm}
                </button>
                <ul className="dropdown-menu">
                  {listOfTerms.map((term, index) => (
                    <li key={index}>
                      <a className="dropdown-item" onClick={() => updateCurrentTerm(term.cycle)}>
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
                <button type="button" className="btn btn-outline-primary">
                  Nuevo Ciclo +
                </button>
              )}
              modal
              nested
              closeOnDocumentClick={false}
            >
              {(close) => (
                <>
                  <h1 className="popup_title">Agregar Nuevo Ciclo</h1>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="number"
                      min="1993"
                      placeholder="Ingrese anio"
                      value={newCycle[0]}
                      onChange={(e) => setNewCycle([e.target.value, newCycle[1]])}
                    />
                    <select
                      className="form-select"
                      value={newCycle[1]}
                      onChange={(e) => setNewCycle([newCycle[0], e.target.value])}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                    </select>
                  </div>
                  <div>
                    <button className="btn btn-outline-primary" onClick={onPopupClose}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={() => createNewCycle(newCycle[0] + "/" + newCycle[1])}>
                      Agregar
                    </button>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
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
                  <h2 className="first_date_text_ord">Definir rango de fechas para subir protocolo</h2>
                  <div className="row">
                    <div className="col-1" />
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          id="start_date"
                          name="date_0"
                          value={checkDateOrDefault(ord_start_update_protocols)}
                          onChange={(e) => handleDateChange(e)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          name="start_time_0"
                          className="form-control"
                          value={checkTimeOrDefault(ord_start_update_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 0)}
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
                        <ul className="dropdown-menu dropdown-menu-end">
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
                          value={checkDateOrDefault(ord_end_update_protocols)}
                          onChange={(e) => handleDateChange(e)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ord_end_update_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 1)}
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
                  <h2 className="second_date_text_ord">Definir rango de fechas para la clasificacion de protocolos</h2>
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
                          value={checkDateOrDefault(ord_start_sort_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ord_start_sort_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 2)}
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
                          value={checkDateOrDefault(ord_end_sort_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ord_end_sort_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 3)}
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
                  <h2 className="third_date_text_ord">Definir rango de fechas para la evaluacion de protocolos</h2>
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
                          value={checkDateOrDefault(ord_start_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ord_start_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 4)}
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
                          value={checkDateOrDefault(ord_end_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ord_end_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 5)}
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
                  <h2 className="fourth_date_text_ord">Definir rango de fechas para la correccion de protocolos</h2>
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
                          value={checkDateOrDefault(ord_start_change_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ord_start_change_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 6)}
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
                          value={checkDateOrDefault(ord_end_change_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ord_end_change_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 7)}
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
                  <h2 className="fifth_date_text_ord">Definir rango de fechas para la evaluacion de correcciones</h2>
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
                          value={checkDateOrDefault(ord_start_second_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ord_start_second_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 8)}
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
                          value={checkDateOrDefault(ord_end_second_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ord_end_second_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 9)}
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
                  <h2 className="first_date_text_ext">Definir rango de fechas para subir protocolo</h2>
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
                          value={checkDateOrDefault(ext_start_update_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ext_start_update_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 10)}
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
                          value={checkDateOrDefault(ext_end_update_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ext_end_update_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 11)}
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
                  <h2 className="second_date_text_ext">Definir rango de fechas para la clasificacion de protocolos</h2>
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
                          value={checkDateOrDefault(ext_start_sort_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ext_start_sort_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 12)}
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
                          value={checkDateOrDefault(ext_end_sort_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ext_end_sort_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 13)}
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
                  <h2 className="third_date_text_ext">Definir rango de fechas para la evaluacion de protocolos</h2>
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
                          value={checkDateOrDefault(ext_start_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ext_start_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 14)}
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
                          value={checkDateOrDefault(ext_end_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ext_end_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 15)}
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
                  <h2 className="fourth_date_text_ext">Definir rango de fechas para la correccion de protocolos</h2>
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
                          value={checkDateOrDefault(ext_start_change_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ext_start_change_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 16)}
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
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ext_end_change_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 17)}
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
                  <h2 className="fifth_date_text_ext">Definir rango de fechas para la evaluacion de correcciones</h2>
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
                          value={checkDateOrDefault(ext_start_second_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="start_time"
                          value={checkTimeOrDefault(ext_start_second_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 18)}
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
                          value={checkDateOrDefault(ext_end_second_eval_protocols)}
                          disabled={isCloseCycleChecked}
                        />
                        <input
                          type="time"
                          className="form-control"
                          id="end_time"
                          value={checkTimeOrDefault(ext_end_second_eval_protocols)}
                          onChange={(e) => handleTimeChange(e.target.value, 19)}
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

        <div className="row">
          <div className="col">
            <label
              className={`btn ${isCloseCycleChecked ? "btn-outline-primary" : "btn-danger"}`}
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
              onChange={(e) => setIsCloseCycleChecked(e.target.checked)}
            />
          </div>
          <div className="col-4" />
          <div className="col">
            <button className="btn btn-outline-primary">Restablecer Datos</button>
            <button className="btn btn-primary">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
