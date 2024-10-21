import "./ValidateCorreo.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function ValidateCorreo() {

    return (
        <div className="contenedor-form">
            <div className="cont-ver">
          <div className="title-v">Valida tu correo</div>
          <form className="validate-email">
            <div className="flex-lg">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Correo Institucional"
                required
              />
            </div>
            <div className="flex-lg">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} className="style-icon" />
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Reingresa Correo Institucional"
                required
              />
            </div>
         <div><button>Validar</button></div>
            </form>
            <div className="messa-re">
            <a href="#" className="reg">
              Regresar
            </a>
          </div>
          </div>
          
        </div>
    )
}