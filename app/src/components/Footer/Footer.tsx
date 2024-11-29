import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer row">
      <div className="col">
        <p>
          Copyright © 2023 ESCATT
          <br />
          Todos los derechos reservados
        </p>
      </div>
      <div className="col-6">
        <a>Términos de Uso | </a>
        <a>Políticas de Privacidad | </a>
        <a>Buzón de Sugerencias</a>
      </div>
      <div className="col">
        <a>LOGO</a>
      </div>
    </footer>
  );
}
