import { useContext } from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Container from "@material-ui/core/Container";
import All from "./All/all";
import Department from "./Department/department";

const Departments = () => {
  const { path } = useRouteMatch();
  const { isAdmin, deptId, isDeptHead } = useContext(userContext).user;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        paddingTop: "5rem",
      }}
    >
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
