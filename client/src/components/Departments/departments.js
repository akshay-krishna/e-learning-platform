import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Container } from "../Layout";
import All from "./All/all";
import Department from "./Department/department";
import "./departments.css";

const Departments = () => {
  const { path } = useRouteMatch();

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
