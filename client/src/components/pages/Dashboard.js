import { useContext } from "react";
import { useHistory } from "react-router-dom";
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
      hello{user.id}
      <button onClick={onClick}>logout</button>
    </div>
  );
};

export default Dashboard;
