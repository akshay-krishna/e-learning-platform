import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faPenNib,
  faTimes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./userCard.css";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../../context/userContext";
import { useHistory, useParams } from "react-router-dom";
import { deleteUsers, updateUsers } from "../../../api/users";

const UserCard = ({ data, index, deleteEntry, updateEntry }) => {
  const backup = data;
  const [user, setUser] = useState(data);
  const [remove, setRemove] = useState(false);
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);

  const history = useHistory();
  const { token } = useContext(userContext).user;
  const { option, id: deptId } = useParams();

  const { _id: id } = data;

  useEffect(() => {
    const removeHandler = async () => {
      try {
        await deleteUsers(token, deptId, id, option);
        history.go(0);
      } catch (err) {
        console.error(err.message);
      }
    };
    const handleUpdate = async () => {
      try {
        await updateUsers(token, deptId, id, option, user);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (update) {
      handleUpdate();
    }
    if (remove) {
      removeHandler();
    }
  }, [remove, update]);

  const cancel = () => {
    if (edit) {
      setEdit(!edit);
      setUser(backup);
    } else if (index > -1) {
      deleteEntry(index);
    } else {
      setRemove(true);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onEdit = () => {
    if (updateEntry) {
      updateEntry(index, user);
    } else if (edit) {
      setUpdate(!update);
    }
    setEdit(!edit);
  };

  const { name, eduMail, password } = user;
  return (
    <div className={`addMember__card ${edit ? "edit__mode" : null}`}>
      <input type="text" name="name" value={name} onChange={onChange} />
      <input type="mail" name="eduMail" value={eduMail} onChange={onChange} />
      {password ? (
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
      ) : null}
      <div>
        <FontAwesomeIcon
          icon={edit ? faTimes : faTrashAlt}
          size="2x"
          transform="shrink-5"
          onClick={cancel}
        />
      </div>
      <div>
        <FontAwesomeIcon
          icon={edit ? faCheck : faPenNib}
          size="2x"
          transform="shrink-5"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

export default UserCard;
