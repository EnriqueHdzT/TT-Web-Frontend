import "./VerifiCorreo.scss";
export default function VerifiCorreo() {
  return (
    <div className="contenedor-form">
      <div className="cont-ver">
        <div className="title-v">Verifica tu correo</div>
        <div className="cont-txt text-center">
          Se envió un mensaje a tu correo.
          <br />
          <br />
          Por favor, sigue el link dentro de este para continuar.
        </div>
        <a href="/login" className="btn btn-primary">
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
}
