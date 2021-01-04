import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createDepartment,
  deleteDepartment,
  getAll,
} from "../../../api/department";
import { userContext } from "../../../context/userContext";
import axios from "axios";
import { Button, Card, Input } from "../../Layout";
import "./all.css";

const All = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({
    deptName: "",
    name: "",
    eduMail: "",
    password: "",
  });
  const { token } = useContext(userContext).user;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const res = getAll(token, source.token);
    res
      .then(({ departments }) => {
        setDepartments(departments);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      source.cancel();
    };
  }, [token, departments.length]);

  // Event Handlers
  const onChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(department);
    const res = createDepartment(token, department);
    res
      .then((res) => {
        if (res === 201) {
          setDepartment({ deptName: "", name: "", eduMail: "", password: "" });
          setDepartments([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const remove = (e) => {
    e.stopPropagation();
    const { id } = e.target.parentNode;
    const res = deleteDepartment(token, id);
    res
      .then((res) => {
        if (res === 200) {
          setDepartments([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const edit = (e) => {
    e.stopPropagation();
  };
  const { deptName, name, password, eduMail } = department;
  return (
    <div className="admin">
      <div className="admin__header">
        <div className="newDepartment">
          <h2> Add a Department</h2>
          <form onSubmit={onSubmit}>
            <Input
              placeholder="department name"
              onChange={onChange}
              value={deptName}
              name="deptName"
              id="department__name"
            />
            <Input
              placeholder="name of dept head"
              onChange={onChange}
              value={name}
              name="name"
              id="department__head"
            />
            <Input
              placeholder="Email"
              onChange={onChange}
              value={eduMail}
              type="email"
              name="eduMail"
              id="department__headEmail"
            />
            <Input
              placeholder="password"
              onChange={onChange}
              value={password}
              type="password"
              name="password"
              id="department__headPassword"
            />
            <Button>Create</Button>
          </form>
        </div>
      </div>
      <div className="department__cards">
        {departments.map(({ name, _id: id }) => {
          return (
            <Link key={id} to={`/departments/${id}/classrooms`}>
              <Card>
                <div id={id} className="department__cardContent">
                  <div className="department__cardTitle">
                    <p>{name}</p>
                  </div>
                  <div className="icon__btn" onClick={edit}>
                    <FontAwesomeIcon icon={faUserEdit} />
                  </div>
                  <div className="icon__btn" onClick={remove}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default All;
