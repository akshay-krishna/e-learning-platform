import { useContext, useState } from "react";
import login from "../../api/login";
import { userContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";

import "./styles/login.css";
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
      history.push("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  const { eduMail, password } = data;

  return (
    <div className="login">
      <div className="login__container">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="eduMail"
            value={eduMail}
            onChange={onChange}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
