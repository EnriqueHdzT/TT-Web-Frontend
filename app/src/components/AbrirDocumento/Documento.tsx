import "./Documento.scss";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";

interface DocumentoProps {
  pdfUrl: string;
}

const Documento: React.FC<DocumentoProps> = ( props ) => {
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');
  const { id: protocolId } = useParams();
  const navigate = useNavigate();

  function goBack() {
    navigate(-1); // This will navigate back to the previous page
  }

  async function fetchData(){
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/getProtocolDoc/${protocolId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a className="button-icon" onClick={goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Abrir Documento
        </div>
      </div>
      <section className="documentopen">
        <div className="vista-pdf">
          {loading ? 
            <span>Cargando...</span>
            :
            pdfUrl ? 
              <iframe 
                src={pdfUrl} 
                title="PDF Viewer" 
                className="pdf-viewer" 
              />
              :
              <span>Error al cargar el documento</span>
          }
        </div>
      </section>
    </div>
  );
};

export default Documento;