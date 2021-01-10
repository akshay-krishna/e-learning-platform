import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";

import { userContext } from "../../../../context/userContext";
import department from "../../../../api/department";
import staff from "../../../../api/staff";
import { destroy, fetchOne, update } from "../../../../api/classroom";
import { Button, FormControl, TextField } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
// const NewCourse = () => {
//   useEffect(() => {}, []);

//   return (
//     <form>
//       <TextField label="course name" />
//       <select
//         name="homeRoomTeacher"
//         onChange={(e) => {
//           setClassroom({ ...classroom, [e.target.name]: e.target.value });
//         }}
//       >
//         <option value={homeRoomTeacher}>{teachName}</option>
//         {staffs.map(({ name, _id: id }) => (
//           <option key={id} value={id}>
//             {name}
//           </option>
//         ))}
//       </select>
//       {courses?.map((course) => {
//         console.log(course);
//       })}
//     </form>
//   );
// };

const EditClassroom = ({ cid, setEdit, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();
  const [classroom, setClassroom] = useState({
    name: "",
    id: "",
    homeRoomTeacher: "",
    teachName: "",
  });
  const [staffs, setStaffs] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    update({ token, deptId, cid, updateData: classroom })
      .then(() => {
        department
          .fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${deptId}/classrooms`);
            setEdit({ editMode: false, cid: "" });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchOne({ token, deptId, cid })
      .then(({ classroom: { _id: id, homeRoomTeacher, name } }) => {
        setClassroom({
          name,
          id,
          homeRoomTeacher: homeRoomTeacher._id,
          teachName: homeRoomTeacher.name,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    staff
      .fetchAll({ token, deptId })
      .then(({ staffs }) => {
        setStaffs(staffs);
      })
      .catch((err) => console.log(err));
  }, [token, deptId, cid]);

  const { name, homeRoomTeacher, teachName, courses } = classroom;
  return (
    <div className="editClassroom">
      <Card>
        <div className="editClassroom__container">
          <div className="editClassroom__cancel">
            <IconButton onClick={() => setEdit({ editMode: false, cid: "" })}>
              <CloseIcon />
            </IconButton>
          </div>
          <form onSubmit={onSubmit}>
            <FormControl fullWidth>
              <TextField
                onChange={(e) =>
                  setClassroom({
                    ...classroom,
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
              <select
                name="homeRoomTeacher"
                onChange={(e) => {
                  setClassroom({
                    ...classroom,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value={homeRoomTeacher}>{teachName}</option>
                {staffs.map(({ name, _id: id }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
              </select>
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

const Classrooms = ({ classrooms, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();

  const [edit, setEdit] = useState({ editMode: false, cid: "" });

  const remove = (id) => {
    destroy({ token, deptId, cid: id })
      .then(() => {
        department
          .fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${deptId}/classrooms`);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const { editMode, cid } = edit;

  return (
    <div className="classrooms">
      {classrooms?.map(
        ({ _id: id, name, homeRoomTeacher: teach, studentMembers }) => (
          <Card key={id}>
            <div className="classroom__card">
              <div>{name}</div>
              <div>{teach.name}</div>
              <div>{studentMembers.length}</div>
              <div>
                <IconButton
                  onClick={() => {
                    setEdit({ editMode: true, cid: id });
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
              <div>
                <IconButton onClick={() => remove(id)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </div>
          </Card>
        )
      )}
      {editMode ? (
        <EditClassroom
          cid={cid}
          setEdit={setEdit}
          setDepartment={setDepartment}
        />
      ) : null}
    </div>
  );
};

export default Classrooms;
