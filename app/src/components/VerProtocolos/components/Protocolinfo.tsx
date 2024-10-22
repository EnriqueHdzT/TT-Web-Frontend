import "./Protocolinfo.scss";
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Protocolinfo({
  idProtocol = null,
  titleProtocol = null,
  statusProtocol = null,
  studentList = [],
  directorList = [],
  sinodalList = [],
}) {
  return (
    <div className="p-box">
      <div className="p-tit">
        {titleProtocol} <br></br>
        {idProtocol}
      </div>
      <div className="p-buttons">
        <Popup
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
        </Popup>
        <button type="button" className="btn btn-outline-primary">
          Documento
        </button>
      </div>
      <div className="p-info">
        <div className="p-alumn">
          {studentList.map((student) => (
            <a key={student.idBoleta}>
              {student.studentName + " " + student.idBoleta}
              <br></br>
            </a>
          ))}
        </div>
        <div className="p-director">
          {directorList.map((director) => (
            <a key={director.precedencia}>
              {director.directorName + " " + director.precedencia}
              <br></br>
            </a>
          ))}
        </div>
        <div className="p-sinodal">
          {sinodalList.map((sinodal) => (
            <a key={sinodal.academy}>
              {sinodal.sinodalName + " " + sinodal.academy}
              <br></br>
            </a>
          ))}
        </div>
      </div>
      <div className="p-statu">
        <button type="button" className="btn btn-outline-primary">
          {statusProtocol}
        </button>
      </div>
    </div>
  );
}
