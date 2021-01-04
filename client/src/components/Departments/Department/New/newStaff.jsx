import { Fragment, useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { FormControl } from "@material-ui/core";

const NewStaff = ({ onSubmit, setAdd }) => {
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
      <form onSubmit={(e) => onSubmit(e, staff)}>
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
