import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer row">
      <div className="footer-aling">
      <div className="col">
        <p>
          Copyright © 2024 ESCATT
        </p>
      </div>
      <div className="col-6">
        <a href="/terminos_de_uso">Terminos de Uso</a>
        <a href="/politicas_de_privacidad">Politicas de Privacidad </a>
        <a href="/buzon">Buzon de ayuda</a>
      </div>
      <div className="col">
      <a href="/">LOGO</a>
      </div>
      </div>
    </footer>
  );
}
