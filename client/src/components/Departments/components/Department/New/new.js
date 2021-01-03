import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Input } from "../../../../Layout";
import { create } from "../../../../../api/users";

import { userContext } from "../../../../../context/userContext";
import "./new.css";
import NewClassroom from "./NewClassroom/newClassroom";

const New = () => {
  const { token } = useContext(userContext).user;
  const { option, id } = useParams();
  const history = useHistory();

  const onSubmit = (e, classroom) => {
    e.preventDefault();
    const res = create(token, id, [classroom], option);
    res
      .then(() => {
        history.goBack();
      })
      .catch((err) => console.error(err));
  };

  const onClick = () => {
    history.goBack();
  };

  const { name, eduMail, phone, password } = {};
  return (
    <div className="new">
      <div className="new__container">
        <NewClassroom onSubmit={onSubmit} />
        {/*  <div className="newForm">
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
        </div> */}
      </div>
    </div>
  );
};

export default New;
