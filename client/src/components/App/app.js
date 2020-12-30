import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { userContext } from "../../context/userContext";

import "./app.css";
import Login from "../Login/login";
import Dashboard from "../Dashboard/dashboard";
import Department from "../Department/department";

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
  const { isAdmin } = useContext(userContext).user;
  return (
    <Fragment>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route
          exact
          path="/departments/:id"
          render={() => <Department specific />}
        />
        <Route
          exact
          path="/departments"
          render={() => (isAdmin ? <Department /> : null)}
        />
      </Switch>
    </Fragment>
  );
};
const AuthRoute = () => {
  return <Route exact path="/login" component={Login} />;
};

export default App;
