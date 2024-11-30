import "./VerifiCorreo.scss";
export default function VerifiCorreo() {
  return (
    <div className="contenedor-forms">
      <div className="cont-ver">
        <div className="title-ver">Verifica tu correo</div>
        <div className="cont-txtver">
          Se envió un mensaje a tu correo.
          <br />
          <br />
          Por favor, sigue el link dentro de este para continuar.
        </div>
        <button>
        <a href="/login">
          Iniciar Sesión
        </a></button>
      </div>
    </div>
  );
}
