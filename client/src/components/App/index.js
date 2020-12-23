import { Fragment, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Menu from "../layout/Menu";
import Dashboard from "../pages/Dashboard";
import Department from "../pages/Department";
import Login from "../pages/Login";

import "./app.css";

const App = () => {
  const { auth } = useContext(userContext).user;
  return (
    <Fragment>
      <div className="app__container">
        {auth ? <Menu /> : null}
        <Switch>{auth ? <PrivateRoutes /> : <AuthRoute />}</Switch>
      </div>
    </Fragment>
  );
};

const PrivateRoutes = () => {
  return (
    <Fragment>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/department" component={Department} />
    </Fragment>
  );
};
const AuthRoute = () => {
  return <Route exact path="/login" component={Login} />;
};
export default App;
