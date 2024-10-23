import "./Documento.scss";
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface DocumentoProps {
  pdfUrl: string;
}

const Documento: React.FC<DocumentoProps> = ({ pdfUrl }) => {
  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a href="/" className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Abrir Documento
        </div>
      </div>
      <section className="documentopen">
        <div className="vista-pdf">
          <iframe 
            src={pdfUrl} 
            title="PDF Viewer" 
            className="pdf-viewer" 
          />
        </div>
      </section>
    </div>
  );
};

export default Documento;