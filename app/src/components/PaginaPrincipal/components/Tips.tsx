import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tips.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faBell } from "@fortawesome/free-solid-svg-icons";

const Tips = () => {
  const [buttons, setButtons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const buttonsPerPage = 3;
  const navigate = useNavigate();

  // Función para obtener los datos de la base de datos
  const fetchTips = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tip');
      const data = await response.json();

      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        navigate("/login");
      }

      const filteredData = data.filter(item => item.tipo_contenido === 'tip');
      setButtons(filteredData); // Guarda el dato completo

    } catch (error) {
      console.error('Error al obtener los tips:', error);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const addButton = () => {
    const newButton = { id: buttons.length + 1, titulo: `Tip ${buttons.length + 1}`, tipo: 'tip' };
    setButtons([...buttons, newButton]);
    navigate('/crear_publicacion?tipo=tip'); // Navega a la página de crear publicación con el tipo de contenido
  };

  const maxPages = Math.ceil(buttons.length / buttonsPerPage);
  const currentButtons = buttons.slice(
      currentPage * buttonsPerPage,
      (currentPage + 1) * buttonsPerPage
  );

  const nextPage = () => {
    if (currentPage < maxPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
      <div className="tips-container">
        <div className="tips-top">
          <div className="tips-title">Tips Recientes</div>
          <div className="add-button-container">
            <button className="add-button" onClick={addButton}>
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
        </div>
        <div className="tips-content">
          {buttons.length === 0 ? (
              <p>No hay tips</p>
          ) : (
              <>
                <div className="button-grid">
                  {currentButtons.map((button, index) => (
                      <button
                          key={index}
                          className="tip-button"
                          onClick={() => navigate(`/vermas/tip/${button.id_contenido}`)} // Redirige con tipo e id
                      >
                        <div className="campana">
                          <FontAwesomeIcon icon={faBell} />
                        </div>
                        <div className="titip">{button.titulo}</div>
                      </button>
                  ))}
                </div>
                <div className="pagination-controls">
                  <button onClick={prevPage} disabled={currentPage === 0}>
                    Anterior
                  </button>
                  <button onClick={nextPage} disabled={currentPage === maxPages - 1}>
                    Siguiente
                  </button>
                </div>
              </>
          )}
        </div>
      </div>
  );
};

export default Tips;