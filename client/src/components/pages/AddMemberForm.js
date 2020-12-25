import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { createUsers } from "../../api/staff";

import "./styles/addMembers.css";
import { Fragment, useContext, useState } from "react";
import { userContext } from "../../context/userContext";
import UserCard from "../layout/userCard";
import { departmentContext } from "../../context/departmentContext";
import { useHistory, useParams } from "react-router-dom";
import FileUpload from "../layout/FileUpload";

const AddMemberForm = () => {
  const { token } = useContext(userContext).user;
  const { department } = useContext(departmentContext);
  const { _id } = department;
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    eduMail: "",
    password: "",
  });
  const history = useHistory();
  const { option } = useParams();
  const onClick = (e) => {
    e.preventDefault();
    setUsers([...users, user]);
    setUser({ name: "", eduMail: "", password: "" });
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onBlur = (e) => {
    const parent = e.target.parentNode;
    parent.classList.remove("input__container--focus");
  };

  const onFocus = (e) => {
    const parent = e.target.parentNode;
    parent.classList.add("input__container--focus");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUsers(token, _id, { list: users }, option);
      history.go(`/departments/${_id}/${option}`);
    } catch (err) {
      console.error(err);
    }
  };

  const { name, eduMail, password } = user;

  return (
    <div className="addMember">
      <form onSubmit={onClick}>
        <div className="input__container">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Eg.John Doe"
            onChange={onChange}
            value={name}
            type="text"
            name="name"
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>
        <label className="input__container">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Eg.johndoe@gmail.com"
            id="email"
            value={eduMail}
            onChange={onChange}
            type="email"
            name="eduMail"
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </label>
        <div className="input__container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            placeholder="min 6 characters"
            value={password}
            onChange={onChange}
            type="password"
            name="password"
            onBlur={onBlur}
            onFocus={onFocus}
          />
        </div>
        <button type="submit" className="addMember__btn">
          <FontAwesomeIcon icon={faPlus} size="2x" transform="shrink-2" />
        </button>
      </form>
      <div className="addMember__card__container">
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
        <div className="create__staffs">
          <form onSubmit={onSubmit}>
            <button type="submit">Create staffs</button>
          </form>
        </div>
        <div className="upload__section">
          <FileUpload setUsers={setUsers} />
        </div>
      </div>
    </div>
  );
};

export default AddMemberForm;
