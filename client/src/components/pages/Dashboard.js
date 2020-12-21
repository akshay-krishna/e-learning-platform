import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Dashboard = () => {
  const { user, dispatch } = useContext(userContext);
  const history = useHistory();

  const onClick = () => {
    dispatch({ type: "logout" });
    history.goBack();
  };
  return (
    <div>
      <h1>hello {user.name}</h1>
      <button onClick={onClick}>logout</button>
    </div>
  );
};

export default Dashboard;
