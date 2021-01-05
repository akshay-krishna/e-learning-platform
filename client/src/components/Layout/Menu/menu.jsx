import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "./menu.css";

import { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../../context/userContext";

import Container from "@material-ui/core/Container";
import { AppBar, Tab, Tabs } from "@material-ui/core";

const Menu = () => {
  const { dispatch, user } = useContext(userContext);
  const { isDeptHead, isAdmin, homeroom, deptId } = user;
  const history = useHistory();
  const [value, setValue] = useState(0);
  const onChange = (e, newValue) => setValue(newValue);

  return (
    <Fragment>
      <AppBar color="transparent" >
        <Container>
          <div className="menu__nav">
            <Tabs
              value={value}
              onChange={onChange}
              indicatorColor="primary"
              textColor="primary"
            >
              {isDeptHead || isAdmin ? (
                <Tab
                  label="department"
                  to={
                    isDeptHead
                      ? `/departments/${deptId}/classrooms`
                      : "/departments"
                  }
                  component={Link}
                />
              ) : null}
              {homeroom ? (
                <Tab
                  label="classroom"
                  to={`/classrooms/${homeroom}`}
                  component={Link}
                />
              ) : null}
              <Tab
                label="logout"
                onClick={() => {
                  dispatch({ type: "logout" });
                  localStorage.clear("user");
                  history.push("/login");
                }}
              />
            </Tabs>
          </div>
        </Container>
      </AppBar>
    </Fragment>
  );
};
export default Menu;
