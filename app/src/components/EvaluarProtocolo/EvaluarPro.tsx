import "./EvaluarPro.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

interface EvaluarProtocoloProps {
  pdfEvaluar: string;
  titulo: string;
  identificador: string;
  fechaEvaluacion: string;
}

interface FormData {
  tituloProducto: string;
  observacionesTitulo: string;
  resumenPropuesta: string;
  observacionesResumen: string;
  palabrasClasificadas: string;
  observacionesPalabras: string;
  presentacionComprensible: string;
  observacionesPresentacion: string;
  objetivoPreciso: string;
  observacionesObjetivo: string;
  problemaClaro: string;
  observacionesProblema: string;
  contribucionJustificada: string;
  observacionesContribucion: string;
  viabilidadAdecuada: string;
  observacionesViabilidad: string;
  propuestaPertinente: string;
  observacionesPropuesta: string;
  calendarioAdecuado: string;
  observacionesCalendario: string;
  aprobadoProtocolo: string;
  recomendacionAdicional: string;
}

const EvaluarPro: React.FC<EvaluarProtocoloProps> = ({
  pdfEvaluar,
  titulo,
  identificador,
  fechaEvaluacion,
}) => {
  const [isMinimized, setIsMinimized] = useState(false); // Controla si el panel izquierdo está minimizado
  const [formData, setFormData] = useState<FormData>({
    tituloProducto: "",
    observacionesTitulo: "",
    resumenPropuesta: "",
    observacionesResumen: "",
    palabrasClasificadas: "",
    observacionesPalabras: "",
    presentacionComprensible: "",
    observacionesPresentacion: "",
    objetivoPreciso: "",
    observacionesObjetivo: "",
    problemaClaro: "",
    observacionesProblema: "",
    contribucionJustificada: "",
    observacionesContribucion: "",
    viabilidadAdecuada: "",
    observacionesViabilidad: "",
    propuestaPertinente: "",
    observacionesPropuesta: "",
    calendarioAdecuado: "",
    observacionesCalendario: "",
    aprobadoProtocolo: "",
    recomendacionAdicional: "",
  });

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized); // Alterna entre minimizar y expandir
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    console.log("Datos del documento:", {
      pdfEvaluar,
      titulo,
      identificador,
      fechaEvaluacion,
    });
    // Aquí se puede añadir la lógica para enviar los datos a una base de datos o entre usuarios
  };

  return (
    <div>
      <div className="headdocumento">
        <div className="tt-a">
          <a href="/" className="button-icon">
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>{" "}
          Evaluar
        </div>
      </div>
      <div className="split_container">
        {/* Sección izquierda */}
        <div className={`left_panel ${isMinimized ? "minimized" : ""}`}>
          <div className="info_containerd">
            <h1 className="titulo">Título de TT: {titulo}</h1>
            <p className="identificadord">
              Núm. de Registro de TT: {identificador}
            </p>
            <p className="palabra-claved">
              Fecha de Evaluación: {fechaEvaluacion}
            </p>

            {/* Formulario de evaluación */}
            <form onSubmit={handleSubmit}>
              <label>1. ¿El título corresponde al producto esperado?</label>
              <br />
              <select
                name="tituloProducto"
                value={formData.tituloProducto}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesTitulo"
                value={formData.observacionesTitulo}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>
                2. ¿El resumen expresa claramente la propuesta del TT, su
                importancia y aplicación?
              </label>
              <br />
              <select
                name="resumenPropuesta"
                value={formData.resumenPropuesta}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesResumen"
                value={formData.observacionesResumen}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>
                3. ¿Las palabras clave han sido clasificadas adecuadamente?
              </label>
              <br />
              <select
                name="palabrasClasificadas"
                value={formData.palabrasClasificadas}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesPalabras"
                value={formData.observacionesPalabras}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>
                4. ¿La presentación del problema a resolver es comprensible?
              </label>
              <br />
              <select
                name="presentacionComprensible"
                value={formData.presentacionComprensible}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesPresentacion"
                value={formData.observacionesPresentacion}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>5. ¿El objetivo es preciso y relevante?</label>
              <br />
              <select
                name="objetivoPreciso"
                value={formData.objetivoPreciso}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesObjetivo"
                value={formData.observacionesObjetivo}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>
                6. ¿El planteamiento del problema y la tentativa solución
                descrita son claros?
              </label>
              <br />
              <select
                name="problemaClaro"
                value={formData.problemaClaro}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesProblema"
                value={formData.observacionesProblema}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>
                7. ¿Sus contribuciones o beneficios están completamente
                justificados?
              </label>
              <br />
              <select
                name="contribucionJustificada"
                value={formData.contribucionJustificada}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesContribucion"
                value={formData.observacionesContribucion}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>8. ¿Su viabilidad es adecuada?</label>
              <br />
              <select
                name="viabilidadAdecuada"
                value={formData.viabilidadAdecuada}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesViabilidad"
                value={formData.observacionesViabilidad}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>9. ¿La propuesta metodológica es pertinente?</label>
              <br />
              <select
                name="propuestaPertinente"
                value={formData.propuestaPertinente}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesPropuesta"
                value={formData.observacionesPropuesta}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>
                10. ¿El calendario de actividades por estudiantes es adecuado?
              </label>
              <br />
              <select
                name="calendarioAdecuado"
                value={formData.calendarioAdecuado}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Observaciones:</label>
              <br />
              <textarea
                name="observacionesCalendario"
                value={formData.observacionesCalendario}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <label>Aprobado</label>
              <br />
              <select
                name="aprobadoProtocolo"
                value={formData.aprobadoProtocolo}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <label>Recomendaciones adicionales:</label>
              <br />
              <textarea
                name="recomendacionAdicional"
                value={formData.recomendacionAdicional}
                onChange={handleChange}
                placeholder="Escribe tus observaciones"
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
        <button className="minimize-button" onClick={toggleMinimize}>
          <FontAwesomeIcon
            icon={isMinimized ? faChevronRight : faChevronLeft}
          />
        </button>
        {/* Sección derecha con el PDF */}
        <div className={`pdf-panel ${isMinimized ? "full-width" : ""}`}>
          <iframe src={pdfEvaluar} title="PDF Evaluar" className="pdf-viewer" />
        </div>
      </div>
    </div>
  );
};

export default EvaluarPro;
