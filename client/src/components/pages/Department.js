import { useContext, useEffect, useState } from "react";
import { createDepartment, getAll } from "../../api/department";
import { userContext } from "../../context/userContext";
import Card from "../layout/Card";
import "./styles/department.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const Department = () => {
  const [newForm, setNewForm] = useState(false);

  const { token } = useContext(userContext).user;
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const { departments } = await getAll(token);
        setDepartments(departments);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData(token);
  }, [token, newForm]);
  return (
    <div className="department">
      <div className="container">
        <div className="department__cards">
          {departments.map((department) => {
            return <Card key={department._id} department={department} />;
          })}
        </div>
      </div>
      <div className="department__addIcon" onClick={() => setNewForm(!newForm)}>
        <FontAwesomeIcon icon={faPlus} size="3x" transform="shrink-5" />
      </div>
      {newForm ? (
        <NewDepartmentForm newForm={newForm} setNewForm={setNewForm} />
      ) : null}
    </div>
  );
};

const NewDepartmentForm = ({ newForm, setNewForm }) => {
  const [department, setDepartment] = useState({ name: "", description: "" });
  const { token } = useContext(userContext).user;
  const history = useHistory();
  const onChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createDepartment(token, department);
      setNewForm(!newForm);
      history.go("/department");
    } catch (err) {
      console.error(err.message);
    }
  };

  const { name, description } = department;
  return (
    <div className="department__newDepartment">
      <div
        className="department__click"
        onClick={() => {
          setNewForm(!newForm);
        }}
      ></div>
      <div className="newDepartment">
        <form onSubmit={onSubmit}>
          <div className="newDepartment__title ">
            <input
              onChange={onChange}
              type="text"
              name="name"
              value={name}
              placeholder="department name"
              onBlur={() => {
                const ele = document.querySelector(".newDepartment__title");
                ele.classList.remove("newDepartment--focus");
              }}
              onFocus={() => {
                const ele = document.querySelector(".newDepartment__title");
                ele.classList.add("newDepartment--focus");
              }}
            />
          </div>
          <div className="newDepartment__description">
            <textarea
              onChange={onChange}
              onBlur={() => {
                const ele = document.querySelector(
                  ".newDepartment__description"
                );
                ele.classList.remove("newDepartment--focus");
              }}
              onFocus={() => {
                const ele = document.querySelector(
                  ".newDepartment__description"
                );
                ele.classList.add("newDepartment--focus");
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
    </div>
  );
};

export default Department;
