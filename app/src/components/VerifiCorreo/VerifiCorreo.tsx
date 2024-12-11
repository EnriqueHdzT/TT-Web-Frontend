import "./VerifiCorreo.scss";
export default function VerifiCorreo() {
  return (
    <div className="contenedor-forms">
      <div className="cont-ver">
        <div className="title-ver">Verifica tu correo</div>
        <div className="cont-txtver">
          Se envió un link de verificación de correo a tu cuenta, favor de revisarla entre los mensajes recientes o como spam.
          <br />
          <br />
          Una vez verificado tu correo podrás ingresar correctamente a la aplicación.
        </div>
        <button>
        <a href="/login">
          Iniciar Sesión
        </a></button>
      </div>
    </div>
  );
}
