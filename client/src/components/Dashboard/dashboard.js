import { useContext } from "react";
import { userContext } from "../../context/userContext";

import "./dashboard.css";

const Dashboard = () => {
  const { user } = useContext(userContext);
  return <div className="dashboard"></div>;
};

export default Dashboard;
