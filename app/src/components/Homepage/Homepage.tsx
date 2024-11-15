import React from 'react';
import './Homepage.scss';
import Bienvenida from './components/Bienvenida';
import Avisos from './components/Avisos';
import Tips from './components/Tips';


export default function Homepage() {
  return (
    <>
    <div className="homepage">
      <div className="toppg">
    <Bienvenida />
      </div>
      <div className="content">
      <div className="leftpg"><Avisos/></div>
      <div className="rightpg"><Tips /></div>
      </div>
    </div>
    </>
  );
}