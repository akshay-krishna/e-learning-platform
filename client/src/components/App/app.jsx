import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { userContext } from "@context/userContext";

import "./app.css";
import Login from "../Login/login";
import Departments from "../Departments/departments";
import Classroom from "../Classroom/classroom";

import { Menu } from "../Layout";
const App = () => {
  const { auth } = useContext(userContext).user;
  return (
    <Fragment>
      <div className="app__menu">{auth ? <Menu /> : null}</div>
      <div className="app">
        <Switch>{auth ? <PrivateRoutes /> : <AuthRoute />}</Switch>
      </div>
    </Fragment>
  );
};

const PrivateRoutes = () => {
  return (
    <Fragment>
      <Switch>
        <Route path="/departments" component={Departments} />
        <Route path="/classrooms/:cid" component={Classroom} />
      </Switch>
    </Fragment>
  );
};
const AuthRoute = () => {
  return <Route exact path="/login" component={Login} />;
};

export default App;
