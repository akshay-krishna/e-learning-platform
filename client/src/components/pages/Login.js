import { Fragment, useContext, useState } from "react";
import login from "../../api/login";
import { userContext } from "../../context/userContext";
import { useHistory } from "react-router-dom";

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
      const res = await login(data);
      res.data.auth = true;
      dispatch({ type: "login", data: res.data });
      history.push("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  const { eduMail, password } = data;

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input type="text" name="eduMail" value={eduMail} onChange={onChange} />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </Fragment>
  );
};

export default Login;
