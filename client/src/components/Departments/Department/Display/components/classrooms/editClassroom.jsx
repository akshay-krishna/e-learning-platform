import {
  Button,
  Card,
  FormControl,
  IconButton,
  TextField,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { green } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";

import { useContext, useState } from "react";

import { userContext } from "@context/userContext";

import { update } from "@api/classroom";
import department from "@api/department";
const EditClassroom = ({ setEdit, classroom, staffs, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const [updateData, setUpdateData] = useState({
    name: classroom.name,
    homeRoomTeacher: classroom.homeRoomTeacher._id,
    teachName: classroom.homeRoomTeacher.name,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    update({ token, deptId, cid: classroom._id, updateData })
      .then(() => {
        department
          .fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            setEdit(false);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };

  const { name, homeRoomTeacher, teachName } = updateData;

  return (
    <div className="editClassroom">
      <Card>
        <div className="editClassroom__container">
          <div className="editClassroom__cancel">
            <IconButton onClick={() => setEdit(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={onSubmit}>
            <FormControl fullWidth>
              <TextField
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    [e.target.name]: e.target.value,
                  })
                }
                focused
                variant="outlined"
                value={name}
                name="name"
                label="name"
              />
            </FormControl>
            <FormControl fullWidth>
              <div className="select">
                <select
                  name="homeRoomTeacher"
                  onChange={(e) => {
                    setUpdateData({
                      ...updateData,
                      [e.target.name]: e.target.value,
                    });
                  }}
                >
                  <option value={homeRoomTeacher}>{teachName}</option>
                  {staffs?.map(({ name, _id: id, homeroom }) => {
                    if (homeroom) return null;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </FormControl>
            <FormControl fullWidth>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: green["A700"],
                  color: "#fff",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                }}
              >
                Save
              </Button>
            </FormControl>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default EditClassroom;
