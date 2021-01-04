import { useContext, useState } from "react";
import login from "../../api/login";
import { userContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";

import "./login.css";

import { Button, TextField } from "@material-ui/core";
const Login = () => {
  const history = useHistory();
  const { dispatch } = useContext(userContext);
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
      const { data: resData } = await login(data);
      resData.auth = true;
      dispatch({ type: "login", data: resData });
      localStorage.setItem("user", JSON.stringify(resData));
      history.push("/departments");
    } catch (err) {
      console.error(err.message);
    }
  };

  const { eduMail, password } = data;

  return (
    <div className="login">
      <div className="login__container">
        <form onSubmit={onSubmit}>
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
          <Button color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
