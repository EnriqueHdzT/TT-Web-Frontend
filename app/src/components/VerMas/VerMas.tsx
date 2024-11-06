import "./VerMas.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const VerMas = () => {
  const [vermas] = [
    {
      id: 1,
      image: ["https://i.imgur.com/GPTo4e3.png"],
      titua: "Titulo del aviso 1",
      info: "Objetivo. - Diseñar la correspondiente comunicación en red de una serie de estaciones de carga para vehículos eléctricos, para de esta manera disponer de la información en tiempo real para tomar correctas decisiones.",
      tiempo: "8 minutes ago",
    },
    // Agrega más avisos según sea necesario
  ];

  return (
    <div className="aviso-detalle">
      <div className="detalle-info">
        <div className="detail-superior">
          <div className="detalle-bell">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <div className="detalle-titulo">
            <h1>{vermas.titua}</h1>
            <h2>{vermas.tiempo}</h2>
          </div>
        </div>
        <div className="detail-medio">
          <p className="detalle-info-texto">{vermas.info}</p>
        </div>
      </div>

      <div className="detalle-imagenes">
        {vermas.image.map((img, index) => (
          <img key={index} src={img} alt={`Aviso Imagen ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default VerMas;
