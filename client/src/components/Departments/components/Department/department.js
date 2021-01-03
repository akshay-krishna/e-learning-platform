import { useContext, useEffect, useState } from "react";
import {
  useParams,
  Link,
  Route,
  useRouteMatch,
  Switch,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import { getDepartment } from "../../../../api/department";
import { userContext } from "../../../../context/userContext";
import { Button, Nav } from "../../../Layout";

import New from "./New/new";
import Display from "./Display/display";

import "./department.css";

const Department = () => {
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const { id } = useParams();
  const { token } = useContext(userContext).user;
  const [department, setDepartment] = useState([]);

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
  }, []);

  return (
    <div>
      <div className="navBar">
        <Nav id="classroom">
          <Link to={`${url}/classrooms`}>Classrooms</Link>
        </Nav>

        <Nav id="staff">
          <Link to={`${url}/staffs`}>Staffs</Link>
        </Nav>

        <Nav id="student">
          <Link to={`${url}/students`}>Students</Link>
        </Nav>

        <div className="nav__btn">
          <Link to={`${pathname}/new`}>
            <Button>Add</Button>
          </Link>
        </div>
      </div>

      <Switch>
        <Route path={`${path}/:option/new`}>
          <New />
        </Route>

        <Route path={`${path}/:option`}>
          <Display {...department} />
        </Route>
      </Switch>
    </div>
  );
};

export default Department;
