import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createClassrooms } from "../../api/classrooms";
import { userContext } from "../../context/userContext";

import "./styles/addClassroomForm.css";

const AddClassroomForm = () => {
  const [classroom, setClassroom] = useState({
    name: "",
    description: "",
  });
  const { token } = useContext(userContext).user;
  const history = useHistory();
  const { id, option } = useParams();

  const onChange = (e) => {
    setClassroom({ ...classroom, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createClassrooms(token, id, classroom);
      history.go(`/departments/${id}/${option}`);
    } catch (error) {}
  };

  const { name, description } = classroom;

  return (
    <div className="newClassroom">
      <form onSubmit={onSubmit}>
        <div className="newClassroom__title">
          <input
            onChange={onChange}
            type="text"
            name="name"
            value={name}
            placeholder="classroom name"
            onBlur={() => {
              const ele = document.querySelector(".newClassroom__title");
              ele.classList.remove("newClassroom--focus");
            }}
            onFocus={() => {
              const ele = document.querySelector(".newClassroom__title");
              ele.classList.add("newClassroom--focus");
            }}
          />
        </div>
        <div className="newClassroom__description">
          <textarea
            onChange={onChange}
            onBlur={() => {
              const ele = document.querySelector(".newClassroom__description");
              ele.classList.remove("newClassroom--focus");
            }}
            onFocus={() => {
              const ele = document.querySelector(".newClassroom__description");
              ele.classList.add("newClassroom--focus");
            }}
            name="description"
            value={description}
            placeholder="Provide a short description"
            maxLength="580"
          ></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddClassroomForm;
