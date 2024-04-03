import "./UserCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import EEUsuarios from "../EEUsuarios";

export default function UserCard({
  userKey = null,
  name = null,
  userType = null,
  email = null,
  cardText = null,
  onDelete = Function,
}) {

  const onClickDelete = () => {
    onDelete(userKey);
  };

  return (
    <div className="item">
      <div className="box-us"><div className="bk-icon"><FontAwesomeIcon icon={faUser} className="icon-us" /></div>
        <div className="name-user"><h1>{name}</h1><h2>{userType}</h2></div>
        <div className="others-us">
          <EEUsuarios
            userKey={userKey}
            onDelete={onClickDelete}
          />
        </div>
      </div>
      <div className="inf-us"><div className="ema-us"><FontAwesomeIcon icon={faEnvelope} className="icon-us" /> <span>{email}</span></div>
        <div className="datos-us">{cardText}</div>
      </div>
    </div>
  );
}
