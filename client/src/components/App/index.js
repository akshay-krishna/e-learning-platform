import { Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

const App = () => {
  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
};

export default App;
