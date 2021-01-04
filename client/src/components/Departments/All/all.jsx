import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createDepartment,
  deleteDepartment,
  getAll,
} from "../../../api/department";
import { userContext } from "../../../context/userContext";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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

  const remove = (e, id) => {
    e.stopPropagation();
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
            <FormControl fullWidth>
              <TextField
                required
                variant="outlined"
                label="department name"
                onChange={onChange}
                value={deptName}
                name="deptName"
                id="department__name"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                variant="outlined"
                label="name of dept head"
                onChange={onChange}
                value={name}
                name="name"
                id="department__head"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                variant="outlined"
                label="Email"
                onChange={onChange}
                value={eduMail}
                type="email"
                name="eduMail"
                id="department__headEmail"
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                required
                variant="outlined"
                label="password"
                onChange={onChange}
                value={password}
                type="password"
                name="password"
                id="department__headPassword"
              />
            </FormControl>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
      <div className="department__cards">
        {departments.map(({ name, _id: id }) => {
          return (
            <Link key={id} to={`/departments/${id}/classrooms`}>
              <Card variant="outlined">
                <CardContent>
                  <div className="card__contents">
                    <Typography>{name}</Typography>
                    <IconButton onClick={(e) => remove(e, id)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default All;
