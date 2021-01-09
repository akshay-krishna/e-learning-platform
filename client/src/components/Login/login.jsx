import { useContext, useState } from "react";
import login from "../../api/login";
import { userContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";

import "./login.css";

import { Button, FormControl, TextField } from "@material-ui/core";
const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(userContext);
  const [staff, setStaff] = useState(false);
  const [data, setData] = useState({
    eduMail: "",
    password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: resData } = await login(data, staff);
      resData.auth = true;
      dispatch({ type: "login", data: resData });
      localStorage.setItem("user", JSON.stringify(resData));
      let URL = "";
      const {
        isAdmin,
        isDeptHead,
        deptId,
        isHomeroomTeacher,
        homeroom,
      } = resData;
      if (isAdmin) URL = "/departments";
      else if (isDeptHead) URL = `/departments/${deptId}/classrooms`;
      else if (isHomeroomTeacher) URL = `/classrooms/${homeroom}`;
      history.push(URL);
    } catch (err) {
      console.error(err.message);
    }
  };

  const { eduMail, password } = data;

  return (
    <div className="login">
      <div className="login__container">
        <form onSubmit={onSubmit}>
          <FormControl>
            <TextField
              margin="dense"
              fullWidth
              required
              variant="outlined"
              value={eduMail}
              name="eduMail"
              onChange={onChange}
              label="email"
            />
          </FormControl>
          <FormControl>
            <TextField
              fullWidth
              margin="dense"
              required
              variant="outlined"
              value={password}
              name="password"
              onChange={onChange}
              label="password"
            />
          </FormControl>
          <FormControl fullWidth>
            <div className="login__optionBtn">
              <Button
                color={!staff ? "secondary" : "default"}
                onClick={() => setStaff(false)}
              >
                Student
              </Button>
              <Button
                color={staff ? "secondary" : "default"}
                onClick={() => setStaff(true)}
              >
                Staff
              </Button>
            </div>
          </FormControl>
          <FormControl>
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </FormControl>
        </form>
      </div>
    </div>
  );
};

export default Login;
