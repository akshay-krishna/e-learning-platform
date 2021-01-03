import { useContext, useState } from "react";
import login from "../../api/login";
import { userContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";

import "./login.css";
import { Button, Input } from "../Layout";
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
          <Input
            placeholder="email"
            type="text"
            name="eduMail"
            value={eduMail}
            onChange={onChange}
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
