import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../../context/userContext";
import Container from "../Container/container";

const Menu = () => {
  const { dispatch } = useContext(userContext);
  const pathName = useLocation().pathname;
  const history = useHistory();

  const onClick = () => {
    dispatch({ type: "logout" });
    localStorage.clear("user");
    history.push("/login");
  };

  const isActive = (path) => {
    return path === pathName;
  };

  return (
    <Fragment>
      <div className="menu">
        <Container>
          <div className="menu__nav">
            <div className="menu__navItem">
              <Link
                to="/departments"
                className={isActive("/departments") ? "active__link" : null}
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
        </Container>
      </div>
    </Fragment>
  );
};
export default Menu;
