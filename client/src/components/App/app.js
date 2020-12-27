import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import DepartmentContextProvider from "../../context/departmentContext";
import { userContext } from "../../context/userContext";

import "./app.css";
import Login from "../Login/login";
import Dashboard from "../Dashboard/dashboard";
import Department from "../Department/department";
import DepartmentDetails from "../DepartmentDetails/departmentDetails";
import Menu from "../Menu/menu";

const App = () => {
  const { auth } = useContext(userContext).user;
  return (
    <Fragment>
      <div>
        {auth ? <Menu /> : null}
        <Switch>{auth ? <PrivateRoutes /> : <AuthRoute />}</Switch>
      </div>
    </Fragment>
  );
};

const PrivateRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <DepartmentContextProvider>
          <Route exact path="/departments" component={Department} />
          <Route
            exact
            path="/departments/:id/:option"
            component={DepartmentDetails}
          />
          <Route
            exact
            path="/departments/:id/classrooms/:cid"
            component={Login}
          />
        </DepartmentContextProvider>
      </Switch>
    </Fragment>
  );
};
const AuthRoute = () => {
  return <Route exact path="/login" component={Login} />;
};

export default App;
