import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  createDepartment,
  deleteDepartment,
  getAll,
} from "../../../api/department";
import { userContext } from "../../../context/userContext";
import axios from "axios";
import { Button, Card, Input } from "../../Layout";
import "./admin.css";
const Admin = () => {
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState({ name: "" });
  const history = useHistory();
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

  const onClick = (id) => {
    history.push(`/departments/${id}`);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const res = createDepartment(token, department);
    res
      .then((res) => {
        if (res === 201) {
          setDepartment({ name: "" });
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
    const { id } = e.target.parentNode;
  };
  return (
    <div className="admin">
      <div className="admin__header">
        <div className="newDepartment">
          <h2> Add a Department</h2>
          <form onSubmit={onSubmit}>
            <Input
              placeholder="name"
              onChange={onChange}
              value={department.name}
              name="name"
              id="department__name"
            />
            <Button>Create</Button>
          </form>
        </div>
      </div>
      <div className="department__cards">
        {departments.map(({ name, _id: id }) => {
          return (
            <Card key={id}>
              <div
                id={id}
                onClick={() => onClick(id)}
                className="department__cardContent"
              >
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
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
