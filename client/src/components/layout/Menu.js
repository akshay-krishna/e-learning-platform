import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./styles/menu.css";

import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../context/userContext";

const Menu = () => {
  const { dispatch } = useContext(userContext);
  const pathName = useLocation().pathname;

  const history = useHistory();
  const onClick = () => {
    dispatch({ type: "logout" });
    history.push("/login");
  };

  const isActive = (path) => {
    console.log(path, pathName);
    return path === pathName;
  };

  return (
    <Fragment>
      <div className="menu">
        <div className="container">
          <div className="menu__nav">
            <div className="menu__navItem">
              <Link
                to="/classroom"
                className={isActive("/classroom") ? "active__link" : null}
              >
                classroom
              </Link>
            </div>
            <div className="menu__navItem">
              <Link
                to="/department"
                className={isActive("/department") ? "active__link" : null}
              >
                department
              </Link>
            </div>
            <div className="menu__navItem">
              <Link
                to="/dashboard"
                className={isActive("/dashboard") ? "active__link" : null}
              >
                dashboard
              </Link>
            </div>
            <div className="menu__navItem">
              <Link to="/login" onClick={onClick}>
                logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Menu;
