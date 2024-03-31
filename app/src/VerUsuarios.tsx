import { useState, useEffect } from "react";

import "./VerUsuarios.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FiltrosUsuario from "./FiltrosUsuario";
import EEUsuarios from "./EEUsuarios";

const usersTypes = ['Alumnos', 'Docentes'];
const careers = ['ISW', 'IIA', 'LCD'];
const curriculums = ['1999', '2009', '2020'];
const precedences = ['Interino', 'Externo'];
const academies = ['Ciencia de Datos', 'Ciencias Basicas', 'Ciencias de la Computacion'];

export default function VerUsuarios() {
  let urlData = validateUrlData();

  const [userType, setUserType] = useState(urlData[0]);
  const [career, setCareer] = useState(urlData[1]);
  const [curriculum, setCurriculum] = useState(urlData[2]);
  const [precedence, setPrecedence] = useState(urlData[3]);
  const [academy, setAcademy] = useState(urlData[4]);
  const [currentPage, setCurrentPage] = useState(urlData[5]);
  const [users, setUsers] = useState([]);

  const updateUserType = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('userType', value);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

    setUserType(value);
  }

  const updateCareer = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('career', value);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

    setCareer(value);
  }

  const updateCurriculum = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('curriculum', value);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

    setCurriculum(value);
  }

  const updatePrecedence = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('precedence', value);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

    setPrecedence(value);
  }

  const updateAcademy = (value) => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('academy', value);
    window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

    setAcademy(value);
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/users", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'page': currentPage.toString()
      }
    })
      .then((response) => response.json())
      .then((data) => {
        // Set the received data to the state
        console.log(data)
        //setUsers(data.students);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });

  return (
    <div>
      <div className="head-usr">
        <div className="tl-u">Viendo Usuarios</div>
        <div className="select-usr">
          <FiltrosUsuario
            name={"Tipo de Usuario"}
            currentStatus={userType}
            options={usersTypes}
            onChange={updateUserType}
          />
          {userType === 'Alumnos' ?
            (<>
              <FiltrosUsuario
                name={"Carrera"}
                currentStatus={career}
                options={careers}
                onChange={updateCareer}
              />
              {career === 'ISW' ? 
              (
                <FiltrosUsuario
                name={"Plan de Estudios"}
                currentStatus={curriculum}
                options={curriculums}
                onChange={updateCurriculum}
                />
              ):(<></>)}
              {career === 'IIA' || career === 'LCD' ? 
                (
                  <FiltrosUsuario
                  name={"Plan de Estudios"}
                  currentStatus={curriculum}
                  options={['2020']}
                  onChange={updateCurriculum}
                  />
                )
                :
                (<></>)}
            </>) : (<></>)}
          {userType === 'Docentes' ?
            (<>
              <FiltrosUsuario
                name={"Precedencia"}
                currentStatus={precedence}
                options={precedences}
                onChange={updatePrecedence}   
              />
              {precedence === "Interino" ? 
                (
                  <FiltrosUsuario
                  name={"Academia"}
                  currentStatus={academy}
                  options={academies}
                  onChange={updateAcademy}
                  />
                ) : (<></>)
              }
              
            </>) : (<></>)}
          <button className="plus-us">
            Nuevo Usuario <FontAwesomeIcon icon={faPlus} className="icon-us" />
          </button>
        </div>
      </div>
      <div className="container-users">
        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Andres Manuel Lopez Obrador</h1><h2>Profesor</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>


        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Nombre de ejemplor</h1><h2>Alumno</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>


        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Andres Manuel Lopez Obrador</h1><h2>Profesor</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>

        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Nombre de ejemplo</h1><h2>Alumno</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>

        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Andres Manuel Lopez Obrador</h1><h2>Profesor</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>

        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Nombre de ejemplo</h1><h2>Alumno</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>

        <div className="item">
          <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
            <div className="name-user"><h1>Andres Manuel Lopez Obrador</h1><h2>Profesor</h2></div>
            <div className="others-us">
              <EEUsuarios
                options={['Editar', 'Eliminar']}
              />
            </div>
          </div>
          <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>jmontanor1800@alumno.ipn.com</span></div>
            <div className="datos-us"><span>Procedencia</span> <span>Carrera</span> <span>Plan de estudio</span></div>
          </div>
        </div>

      </div>
    </div>
  );
}

function validateUrlData() {
  const queryParams = new URLSearchParams(window.location.search);
  let pageParam = parseInt(queryParams.get('page') ?? '');
  let userTypeParam = queryParams.get('userType') ?? '';
  let careerParam = queryParams.get('career') ?? '';
  let curriculumParam = queryParams.get('curriculum') ?? '';
  let precedenceParam = queryParams.get('precedence') ?? '';
  let academyParam = queryParams.get('academy') ?? '';

  if (isNaN(pageParam) || pageParam < 1) {
    pageParam = 1;
  }
  if (userTypeParam === 'Alumnos') {
    precedenceParam = '';
    academyParam = '';
    if(academyParam === ''){
      curriculumParam = '';
    } else {
      curriculumParam = ['LCD', 'IIA'].includes(careerParam) ? '2020' : curriculumParam;
    }
  } else if (userTypeParam === 'Docentes') {
    careerParam = '';
    curriculumParam = '';
    if(precedenceParam === "Externo"){
      academyParam = '';
    }
  } else {
    careerParam = '';
    curriculumParam = '';
    precedenceParam = '';
    academyParam = '';
    userTypeParam = '';
  }

  usersTypes.includes(userTypeParam) ? queryParams.set('userType', userTypeParam) : (queryParams.delete('userType'), userTypeParam = '');
  careers.includes(careerParam) ? queryParams.set('career', careerParam) : (queryParams.delete('career'), careerParam = '');
  curriculums.includes(curriculumParam) ? queryParams.set('curriculum', curriculumParam) : (queryParams.delete('curriculum'), curriculumParam = '');
  precedences.includes(precedenceParam) ? queryParams.set('precedence', precedenceParam) : (queryParams.delete('precedence'), precedenceParam = '');
  academies.includes(academyParam) ? queryParams.set('academy', academyParam) : (queryParams.delete('academy'), academyParam = '');
  queryParams.set('page', pageParam.toString());

  window.history.replaceState({}, '', `${window.location.pathname}?${queryParams}`);

  return [userTypeParam, careerParam, curriculumParam, precedenceParam, academyParam, pageParam]
}