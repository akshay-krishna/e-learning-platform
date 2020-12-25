import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenNib } from "@fortawesome/free-solid-svg-icons";

import "./styles/userCard.css";
const UserCard = ({ data, saved, index }) => {
  const onClick = (e) => {
    if(!saved) {
      
    }
  };

  return (
    <div className="addMember__card">
      <div>{data.name}</div>
      <div>{data.eduMail}</div>
      <div>{data.password}</div>
      <div>
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="2x"
          transform="shrink-5"
          onClick={onClick}
        />
      </div>
      <div>
        <FontAwesomeIcon icon={faPenNib} size="2x" transform="shrink-5" />
      </div>
    </div>
  );
};

export default UserCard;
