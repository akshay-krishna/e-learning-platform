import { useContext, useEffect, useState } from "react";
import {
  useParams,
  Route,
  useRouteMatch,
  Switch,
  useLocation,
  Link,
} from "react-router-dom";

import axios from "axios";

import { fetchOne } from "../../../api/department";
import { userContext } from "../../../context/userContext";
import Button from "@material-ui/core/Button";

import { Container, Paper, Tab, Tabs } from "@material-ui/core";

import Display from "./Display/display";
import NewStaff from "./New/newStaff";
import NewStudent from "./New/newStudent";
import NewClassroom from "./New/newClassroom";

import "./department.css";

const Department = () => {
  const links = ["classrooms", "staffs", "students"];
  const { path, url } = useRouteMatch();

  const [department, setDepartment] = useState({});
  const { pathname } = useLocation();
  const option = pathname.split(`${url}/`)[1];
  const [value, setValue] = useState(links.indexOf(option));

  const [add, setAdd] = useState(false);

  const { id } = useParams();
  const { token } = useContext(userContext).user;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const res = fetchOne(token, id, source.token);
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

  const onChange = (e, newValue) => setValue(newValue);
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
            <Tab label="Classrooms" to={`${url}/classrooms`} component={Link} />
            <Tab label="Staffs" to={`${url}/staffs`} component={Link} />
            <Tab label="Students" to={`${url}/students`} component={Link} />
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
        setDepartment={setDepartment}
        setAdd={setAdd}
        add={add}
        option={option}
      />

      <Switch>
        <Route exact path={`${path}/:option`}>
          <Display department={department} setDepartment={setDepartment} />
        </Route>
      </Switch>
    </div>
  );
};

const ChooseComponent = ({ add, option, setAdd, setDepartment }) => {
  let component = null;
  if (!add) return component;
  switch (option) {
    case "staffs":
      component = <NewStaff setDepartment={setDepartment} setAdd={setAdd} />;
      break;
    case "students":
      component = <NewStudent setDepartment={setDepartment} setAdd={setAdd} />;
      break;
    default:
      component = (
        <NewClassroom setDepartment={setDepartment} setAdd={setAdd} />
      );
      break;
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
