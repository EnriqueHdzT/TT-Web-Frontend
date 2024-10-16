import "./VerUsuarios.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FiltrosUsuario from "./FiltrosUsuario";
import EEUsuarios from "./EEUsuarios";


export default function VerUsuarios () {
   
    return (
      <div>
        <div className="head-usr">
          <div className="tl-u">Viendo Usuarios</div>
          <div className="select-usr">
          <FiltrosUsuario
          options={['CATT','Alumnos', 'Docente']}
          defaultOption="Alumnos"
          />
          <FiltrosUsuario
          options={['Lic. en Ciencia de Datos', 'Ing. en Inteligencia Artificial', 'Ing. en Sis. Computacionales']}
          defaultOption="Lic. en Ciencia de Datos"
          />
          <FiltrosUsuario
          options={['Plan 2020', 'Plan 2009', 'Plan 1/1/1999']}
          defaultOption="Plan 2020"
          />
          <FiltrosUsuario
          options={['Internos', 'Externos']}
          defaultOption="Internos"
          />
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
