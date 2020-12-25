import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPenNib } from "@fortawesome/free-solid-svg-icons";

import "./styles/userCard.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userContext";
import { useHistory, useParams } from "react-router-dom";
import { deleteUsers } from "../../api/staff";

const UserCard = ({ data, index, deleteEntry }) => {
  const [remove, setRemove] = useState(false);
  const { token } = useContext(userContext).user;
  const { option, id: deptId } = useParams();
  const { _id: id } = data;
  const history = useHistory();
  useEffect(() => {
    const removeHandler = async () => {
      try {
        await deleteUsers(token, deptId, id, option);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (remove) {
      removeHandler();
      history.go(0);
    }
  }, [remove]);

  const onClick = () => {
    if (index) {
      deleteEntry(index);
    } else {
      setRemove(true);
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
