import { Fragment, useContext, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import { fetchAll } from "../../../../api/users";
import { useParams } from "react-router-dom";
import { userContext } from "../../../../context/userContext";

const NewStudent = ({ onSubmit, setAdd }) => {
  const [student, setStudent] = useState({
    name: "",
    password: "",
    eduMail: "",
    classroom: "",
  });
  const { id } = useParams();
  const { token } = useContext(userContext).user;

  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    fetchAll(token, id, "classrooms")
      .then(({ classrooms }) => {
        setClassrooms(classrooms);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const { name, password, eduMail } = student;

  return (
    <Fragment>
      <form onSubmit={(e) => onSubmit(e, student)}>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            label="name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            label="email"
            onChange={onChange}
            name="eduMail"
            value={eduMail}
            type="email"
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            onChange={onChange}
            label="password"
            name="password"
            value={password}
            type="password"
          />
        </FormControl>
        <FormControl fullWidth>
          <select
            onChange={(e) => {
              setStudent({ ...student, [e.target.name]: e.target.value });
            }}
            name="classroom"
          >
            <option value={null}>Select Classroom</option>
            {classrooms.map(({ _id: id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </FormControl>

        <FormControl fullWidth>
          <Button variant="contained" color="primary" type="submit">
            Create
          </Button>
        </FormControl>
        <FormControl fullWidth>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setAdd(false);
            }}
          >
            Cancel
          </Button>
        </FormControl>
      </form>
    </Fragment>
  );
};
export default NewStudent;
