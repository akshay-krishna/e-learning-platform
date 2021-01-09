import { Fragment, useContext, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";
import department from "../../../../api/department";
import { create } from "../../../../api/staff";
import { userContext } from "../../../../context/userContext";
import { useHistory, useParams } from "react-router-dom";

const NewStaff = ({ setAdd, setDepartment }) => {
  const { token } = useContext(userContext).user;
  const { id } = useParams();
  const history = useHistory();

  const [staff, setStaff] = useState({
    name: "",
    password: "",
    eduMail: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    create({ token, deptId: id, staffs: [staff] })
      .then(() => {
        department
          .fetchOne(token, id)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${id}/staffs`);
            setAdd(false);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  const onChange = (e) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };
  const { name, password, eduMail } = staff;

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            margin="dense"
            label="name"
            name="name"
            value={name}
            onChange={onChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            margin="dense"
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
            margin="dense"
            label="password"
            name="password"
            value={password}
            type="password"
          />
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

export default NewStaff;
