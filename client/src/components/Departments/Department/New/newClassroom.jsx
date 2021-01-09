import { Fragment, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAll as fetchAllStaff } from "../../../../api/staff";
import { userContext } from "../../../../context/userContext";

import Button from "@material-ui/core/Button";
import { FormControl, TextField } from "@material-ui/core";

import { create as createClassroom } from "../../../../api/classroom";
import department from "../../../../api/department";

const NewClassroom = ({ setAdd, setDepartment }) => {
  const [classroom, setClassroom] = useState({ name: "", homeRoomTeacher: "" });
  const [staff, setStaff] = useState([]);
  const { token } = useContext(userContext).user;
  const { id } = useParams();

  useEffect(() => {
    fetchAllStaff({ token, deptId: id })
      .then(({ staffs }) => {
        setStaff(staffs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, id]);

  const onSubmit = (e) => {
    e.preventDefault();

    createClassroom({ token, deptId: id, classroom: classroom })
      .then((status) => {
        if (status === 201) {
          department
            .fetchOne(token, id)
            .then(({ department }) => {
              setDepartment(department);
              setAdd(false);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <FormControl fullWidth>
          <TextField
            variant="outlined"
            label="class name"
            id="name"
            name="name"
            value={classroom.name}
            onChange={(e) =>
              setClassroom({ ...classroom, [e.target.name]: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth>
          <select
            onChange={(e) => {
              setClassroom({ ...classroom, [e.target.name]: e.target.value });
            }}
            name="homeRoomTeacher"
          >
            <option value={null}>Select homeRoomTeacher</option>
            {staff.map(({ _id: id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </FormControl>

        <FormControl fullWidth>
          <Button type="submit" variant="contained" color="primary">
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

export default NewClassroom;
