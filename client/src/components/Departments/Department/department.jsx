import { useContext, useEffect, useState } from "react";
import {
  useParams,
  Route,
  useRouteMatch,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";

import axios from "axios";

import { getDepartment } from "../../../api/department";
import { userContext } from "../../../context/userContext";
import Button from "@material-ui/core/Button";
import Display from "./Display/display";

import "./department.css";
import { Container, Paper, Tab, Tabs } from "@material-ui/core";
import NewStaff from "./New/newStaff";
import NewStudent from "./New/newStudent";
import NewClassroom from "./New/newClassroom";
import { create } from "../../../api/users";

const Department = () => {
  const links = ["classrooms", "staffs", "students"];
  const { path, url } = useRouteMatch();

  const [department, setDepartment] = useState({});
  const { pathname } = useLocation();
  const [_, option] = pathname.split(`${url}/`);
  const [value, setValue] = useState(links.indexOf(option));

  const history = useHistory();
  const [add, setAdd] = useState(false);

  const { id } = useParams();
  const { token } = useContext(userContext).user;

  const onSubmit = (e, data) => {
    e.preventDefault();
    create(token, id, [data], option)
      .then(() => {
        getDepartment(token, id)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${id}/${option}`);
            setAdd(false);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const source = axios.CancelToken.source();
    const res = getDepartment(token, id, source.token);
    res
      .then(({ department }) => {
        setDepartment(department);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      source.cancel();
    };
  }, [id, token]);

  const onChange = (e, newValue) => {
    history.push(`${url}/${links[newValue]}`);
    setValue(newValue);
  };

  return (
    <div>
      <div className="navBar">
        <Paper>
          <Tabs
            value={value}
            onChange={onChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Classrooms" />
            <Tab label="Staffs" />
            <Tab label="Students" />
          </Tabs>
        </Paper>

        <div className="nav__btn">
          <Button
            onClick={() => setAdd(!add)}
            variant="contained"
            color="primary"
            size="large"
          >
            Add
          </Button>
        </div>
      </div>

      <ChooseComponent
        setAdd={setAdd}
        add={add}
        option={option}
        onSubmit={onSubmit}
      />

      <Switch>
        <Route exact path={`${path}/:option`}>
          <Display department={department} setDepartment={setDepartment} />
        </Route>
      </Switch>
    </div>
  );
};

const ChooseComponent = ({ add, option, onSubmit, setAdd }) => {
  let component = null;
  if (!add) return component;
  switch (option) {
    case "staffs":
      component = <NewStaff onSubmit={onSubmit} setAdd={setAdd} />;
      break;
    case "students":
      component = <NewStudent onSubmit={onSubmit} setAdd={setAdd} />;
      break;
    default:
      component = <NewClassroom onSubmit={onSubmit} setAdd={setAdd} />;
  }

  return (
    <div className="new">
      <Container maxWidth="sm">
        <Paper>{component}</Paper>
      </Container>
    </div>
  );
};

export default Department;
