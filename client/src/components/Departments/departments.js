import { useContext } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { Container } from "../Layout";
import All from "./components/All/all";
import Department from "./components/Department/department";
import "./departments.css";

const Departments = () => {
  const { deptId, isAdmin } = useContext(userContext).user;
  const { path, url } = useRouteMatch();

  return (
    <div className="departments">
      <Container>
        <Switch>
          <Route path={`${path}/:id`} component={Department} />
          <Route exact path={path} component={All} />
        </Switch>
      </Container>
    </div>
  );
};

export default Departments;
