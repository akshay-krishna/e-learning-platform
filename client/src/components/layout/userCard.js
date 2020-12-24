import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import "./styles/userCard.css";
const UserCard = ({ user }) => {
  return (
    <div className="addMember__card">
      <div>{user.name}</div>
      <div>{user.eduMail}</div>
      <div>{user.password}</div>
      <div>
        <FontAwesomeIcon icon={faTrashAlt} size="2x" transform="shrink-5" />
      </div>
    </div>
  );
};

export default UserCard;
