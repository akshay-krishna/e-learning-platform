import { useContext } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { userContext } from "../../context/userContext";
import { Container } from "../Layout";
import All from "./All/all";
import Department from "./Department/department";
import "./departments.css";

const Departments = () => {
  const { path } = useRouteMatch();
  const { isAdmin, deptId, isDeptHead } = useContext(userContext).user;
  return (
    <div className="departments">
      <Container>
        <Switch>
          <Route
            path={`${path}/:id`}
            render={() =>
              isAdmin || isDeptHead ? (
                <Department />
              ) : (
                <div>
                  <h1>401</h1>
                </div>
              )
            }
          />
          <Route
            exact
            path={path}
            render={() =>
              isAdmin ? <All /> : <Redirect to={`${path}/${deptId}`} />
            }
          />
        </Switch>
      </Container>
    </div>
  );
};

export default Departments;
