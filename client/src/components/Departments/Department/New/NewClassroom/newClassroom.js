import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAll } from "../../../../../api/users";
import { userContext } from "../../../../../context/userContext";
import { Button, Input } from "../../../../Layout";

import "./newClassroom.css";
const NewClassroom = ({ onSubmit }) => {
  const [classroom, setClassroom] = useState({ name: "", homeRoomTeacher: "" });
  const [staff, setStaff] = useState([]);
  const { token } = useContext(userContext).user;
  const { id } = useParams();
  useEffect(() => {
    fetchAll(token, id, "staffs")
      .then(({ staffs }) => {
        setStaff(staffs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  console.log(classroom);
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
        <select
          onChange={(e) => {
            setClassroom({ ...classroom, [e.target.name]: e.target.value });
          }}
          name="homeRoomTeacher"
        >
          <option value="">Choose a classroom teacher</option>
          {staff.map(({ _id: id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <Button type="submit">Create</Button>
      </form>
    </Fragment>
  );
};

export default NewClassroom;
