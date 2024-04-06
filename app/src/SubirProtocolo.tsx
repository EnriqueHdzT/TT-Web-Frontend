import "./SubirProtocolo.scss";
import AgregarAlumnos from "./AgregarAlumnos";
import AgregarDirector from "./AgregarDirector";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faPen } from "@fortawesome/free-solid-svg-icons";
import AgregarPalabras from "./AgregarPalabras";
import ArchivoProtocolo from "./ArchivoProtocolo";

export default function SubirProtocolo() {

return(
<div><div className="head-pr">
    <div className="tl-u"><FontAwesomeIcon icon={faAngleLeft} className="icon" /> Subir protocolos</div></div>

    <div className="protocol-bd">
        <div className="item">
            <div className="tit-pr">Titulo del protocolo</div>
            <div className="cont-pr"><input type="text" placeholder="Escribe el nombre de tu protocolo"/></div>
            <div className="icon-ed"><FontAwesomeIcon icon={faPen} className="icon" /></div>
        </div>
        <div>
            <AgregarAlumnos />
        </div>
        <div>
            <AgregarDirector />
        </div>
        <div>
            <AgregarPalabras />
        </div>
        <div>
            <ArchivoProtocolo />
        </div>
    </div>
    <div className="protocol-button"> <button className="RD">Reiniciar Datos</button> <button className="SP">Subir Protocolo</button></div>
    
</div>

)
}