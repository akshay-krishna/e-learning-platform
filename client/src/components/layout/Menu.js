import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
const Menu = () => {
  return (
    <Fragment>
      <div className="menu__container">
        <Link to="/department">department</Link>
        <Link to="/dashboard">dashboard</Link>
      </div>
    </Fragment>
  );
};

export default Menu;
