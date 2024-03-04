import './StudentCard.scss';

export default function StudentCard({ key=null, cardTitle=null, cardSubtitle=null, cardText=null }) {
  private function onClickEdit (){
    
  }

  private function onClickDelete (){

  }

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{cardSubtitle}</h6>
        <p className="card-text">{cardText}</p>
        <button className='btn btn-primary' onClick={}>Editar</a>
        <button className='btn btn-primary' onClick={}>Eliminar</a>
      </div>
    </div>
  );
};