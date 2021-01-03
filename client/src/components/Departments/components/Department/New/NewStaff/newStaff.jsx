import { Fragment, useState } from "react";
import { Button, Input } from "../../../../../Layout";
import "./newStaff.css";

const NewStaff = ({ onSubmit }) => {
  const [staff, setStaff] = useState({
    name: "",
    password: "",
    eduMail: "",
  });

  const onChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };
  const { name, password, eduMail } = staff;

  return (
    <Fragment>
      <form className="newStaff" onSubmit={(e) => onSubmit(e, staff)}>
        <Input
          placeholder="name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <Input
          placeholder="email"
          onChange={onChange}
          name="eduMail"
          value={eduMail}
          type="email"
        />
        <Input
          onChange={onChange}
          placeholder="name"
          name="password"
          value={password}
          type="password"
        />
        <Button type="submit">Create</Button>
      </form>
    </Fragment>
  );
};

export default NewStaff;
