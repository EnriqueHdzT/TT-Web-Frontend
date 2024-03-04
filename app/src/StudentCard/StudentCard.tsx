import "./StudentCard.scss";

export default function StudentCard({
  studentKey = null,
  cardTitle = null,
  cardSubtitle = null,
  cardText = null,
  onDelete = Function,
}) {
  /*
  private function onClickEdit (){
    
  }
*/
  const onClickDelete = () => {
    onDelete(studentKey);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          {cardSubtitle}
        </h6>
        <p className="card-text">{cardText}</p>
        <button className="btn btn-primary">Editar</button>
        <button className="btn btn-primary" onClick={onClickDelete}>
          Eliminar
        </button>
      </div>
    </div>
  );
}
