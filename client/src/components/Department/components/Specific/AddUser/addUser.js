import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Input } from "../../../../Layout";
import { createUsers } from "../../../../../api/users";

import { userContext } from "../../../../../context/userContext";
import "./addUser.css";

const AddUser = () => {
  const { token } = useContext(userContext);
  const { option, id } = useParams();
  const history = useHistory();
  const initialState = {
    name: "",
    eduMail: "",
    phone: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const res = createUsers(token, id, [user], option);
    res.then(() => {}).catch((err) => console.error(err));
  };

  const onClick = () => {
    history.goBack();
  };

  const { name, eduMail, phone, password } = user;
  return (
    <div className="addUser">
      <div className="addUser__container">
        <div className="addUserForm">
          <h2>Add new {option}</h2>
          <form onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              placeholder="Name"
              id="name"
              name="name"
              value={name}
            />
            <Input
              onChange={onChange}
              placeholder="Mail"
              id="email"
              type="email"
              name="eduMail"
              value={eduMail}
            />
            <Input
              onChange={onChange}
              placeholder="Mobile"
              id="mobile"
              name="phone"
              value={phone}
            />
            <Input
              onChange={onChange}
              placeholder="password"
              id="password"
              type="password"
              name="password"
              value={password}
            />
            <div className="form__btn">
              <Button type="submit">ADD</Button>
              <Button className="cancel" onClick={onClick}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
