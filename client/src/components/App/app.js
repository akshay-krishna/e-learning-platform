import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import DepartmentContextProvider from "../../context/departmentContext";
import { userContext } from "../../context/userContext";

import "./app.css";
import Login from "../Login/login";
import Dashboard from "../Dashboard/dashboard";
import Department from "../Department/department";
import DepartmentDetails from "../DepartmentDetails/departmentDetails";
import Classroom from "../Classroom/classroom";

import { Menu } from "../Layout";
const App = () => {
  const { auth } = useContext(userContext).user;
  return (
    <Fragment>
      <div className="app__menu">{auth ? <Menu /> : null}</div>
      <div className="app">
        <Switch>{auth ? <PrivateRoutes /> : <AuthRoute />}</Switch>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
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
            component={Classroom}
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
