import "./VerifiCorreo.scss"
export default function VerifiCorreo() {

    return (
        <div className="contenedor-form">
            <div className="cont-ver">
          <div className="title-v">Verifica tu correo</div>
          <div className="cont-txt">Se envió un link de verificación a tu cuenta, favor de revisarla entre los mensajes recientes o como spam. Una vez verificado tu correo podrás ingresar correctamente a la aplicación.</div>
          <a href="/login" className="btn btn-primary">
              Iniciar Sesión
            </a>
          </div>
          
        </div>
    )
}