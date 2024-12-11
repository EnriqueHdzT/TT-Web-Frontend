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
        <a href="/avisos_de_privacidad">Aviso de Privacidad Integral </a>
        <a href="/buzon">Buzon de ayuda</a>
      </div>
      </div>
    </footer>
  );
}
