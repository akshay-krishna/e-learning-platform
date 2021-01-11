import { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";

import { userContext } from "@context/userContext";
import department from "@api/department";
import { destroy } from "@api/classroom";
import Button from "@material-ui/core/Button";
import EditClassroom from "./editClassroom";
import AddCourse from "./addCourse";

const Classrooms = ({ classrooms, staffs, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const [classroom, setClassroom] = useState({});
  const [editMode, setEdit] = useState(false);
  const [courseMode, setCourse] = useState(false);

  const remove = (id) => {
    destroy({ token, deptId, cid: id })
      .then(() => {
        department
          .fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="classrooms">
      {classrooms?.map((classroom) => {
        const { homeRoomTeacher, name, _id: id } = classroom;
        return (
          <Card key={id}>
            <div className="classroom__card">
              <div>{name}</div>
              <div>{homeRoomTeacher.name}</div>
              <div>
                <Button
                  onClick={() => {
                    setCourse(true);
                  }}
                >
                  Add course
                </Button>
              </div>
              <div>
                <IconButton
                  onClick={() => {
                    setEdit(true);
                    setClassroom(classroom);
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
        );
      })}
      {editMode ? (
        <EditClassroom
          classroom={classroom}
          staffs={staffs}
          setEdit={setEdit}
          setDepartment={setDepartment}
        />
      ) : null}
      {courseMode ? (
        <AddCourse
          classroom={classroom}
          staffs={staffs}
          setCourse={setCourse}
          setDepartment={setDepartment}
        />
      ) : null}
    </div>
  );
};

export default Classrooms;
