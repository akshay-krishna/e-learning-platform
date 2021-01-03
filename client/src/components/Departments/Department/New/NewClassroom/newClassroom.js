import { Fragment, useState } from "react";
import { Button, Input } from "../../../../Layout";

import "./newClassroom.css";
const NewClassroom = ({ onSubmit }) => {
  const [classroom, setClassroom] = useState({ name: "" });
  return (
    <Fragment>
      <form className="newClassroom" onSubmit={(e) => onSubmit(e, classroom)}>
        <Input
          placeholder="class name"
          id="name"
          name="name"
          value={classroom.name}
          onChange={(e) =>
            setClassroom({ ...classroom, [e.target.name]: e.target.value })
          }
        />
        <Button type="submit">Create</Button>
      </form>
    </Fragment>
  );
};

export default NewClassroom;
