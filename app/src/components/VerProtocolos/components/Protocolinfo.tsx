import "./Protocolinfo.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Protocolinfo({
  uuidProtocol = null,
  idProtocol = null,
  titleProtocol = null,
  statusProtocol = null,
  studentList = [],
  directorList = [],
  sinodalList = [],
}) {

  const navigate = useNavigate();

  function seeDocument(){
    navigate(`/documento/${idProtocol}`);
  };

  function goToValidate(){
    navigate(`/validarprotocolo/${idProtocol}`);
  }

  function seeStatus(){
    navigate(`/monitoreoprotocolo/${idProtocol}`);
  }

  return (
    <div className="p-box">
      <div className="p-tit">
        {titleProtocol} <br></br>
        {idProtocol}
      </div>
      <div className="p-buttons">
        {/* <Popup
          trigger={(open) => (
            <button type="button" className="btn btn-outline-primary">
              Validar
            </button>
          )}
          modal
          nested
          closeOnDocumentClick={false}
        >
          {(close) => (
            <>
              <h1 className="popup_title">¿Vas a validar?</h1>
              <div>
                <button className="btn btn-outline-primary" onClick={close}>
                  Ño
                </button>
                <button className="btn btn-primary">Shi</button>
              </div>
            </>
          )}
        </Popup> */}
        {statusProtocol == 'validating' && 
        <button type="button" className="btn btn-outline-primary" onClick={goToValidate}>
          Validar
        </button>}
        <button type="button" className="btn btn-outline-primary" onClick={seeDocument}>
          Documento
        </button>
        <button type="button" className="btn btn-outline-primary" onClick={seeStatus}>
          Ver Status
        </button>
      </div>
      {/* <div className="p-info">
        <div className="p-alumn">
          {studentList.map((student) => (
            <a key={student.curriculum}>
              {student.name + " " + student.curriculum}
              <br></br>
            </a>
          ))}
        </div>
        <div className="p-director">
          {directorList.map((director) => (
            <a key={director.precedence}>
              {director.name + " " + director.precedence}
              <br></br>
            </a>
          ))}
        </div>
        <div className="p-sinodal">
          {sinodalList.map((sinodal) => (
            <a key={sinodal.academy}>
              {sinodal.name + " " + sinodal.academy}
              <br></br>
            </a>
          ))}
        </div>
      </div> */}
      <div className="p-statu">
        <button type="button" className="btn btn-outline-primary">
          {statusProtocol}
        </button>
      </div>
    </div>
  );
}