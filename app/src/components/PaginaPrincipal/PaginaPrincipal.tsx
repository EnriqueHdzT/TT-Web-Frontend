import React from 'react';
import './PaginaPrincipal.scss';
import Avisos from './components/Avisos';
import Tips from './components/Tips';
import Preguntas from './components/Preguntas';


export default function PaginaPrincipal() {
  return (
    <>
    <div className="pagprin">
      <div className="toppg">
    <Avisos />
      </div>
      <div className="content">
      <div className="leftpg"><Tips /></div>
      <div className="rightpg"><Preguntas /></div>
      </div>
    </div>
    </>
  );
}