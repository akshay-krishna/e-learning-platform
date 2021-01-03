import { Fragment, useState } from "react";
import { Button, Input } from "../../../../Layout";

import "./newStudent.css";

const NewStudent = ({ onSubmit }) => {
  const [student, setStudent] = useState({
    name: "",
    password: "",
    eduMail: "",
  });

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const { name, password, eduMail } = student;

  return (
    <Fragment>
      <form className="newStudent" onSubmit={(e) => onSubmit(e, student)}>
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
export default NewStudent;
