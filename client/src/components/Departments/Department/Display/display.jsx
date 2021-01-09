import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";

import { userContext } from "../../../../context/userContext";
import { fetchOne } from "../../../../api/department";
import { destroy as deleteStaff } from "../../../../api/staff";
import { destroy as deleteClassroom } from "../../../../api/classroom";
import { destroy as deleteStudent } from "../../../../api/students";

import "./display.css";

const Display = ({ department, setDepartment }) => {
  const { option } = useParams();
  const { staffMembers, studentMembers, classrooms } = department;
  let component = null;
  switch (option) {
    case "staffs":
      component = (
        <Staffs staffs={staffMembers} setDepartment={setDepartment} />
      );
      break;
    case "students":
      component = (
        <Students students={studentMembers} setDepartment={setDepartment} />
      );
      break;
    default:
      component = (
        <Classrooms classrooms={classrooms} setDepartment={setDepartment} />
      );
      break;
  }

  return component;
};

const Classrooms = ({ classrooms, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();

  const remove = (id) => {
    deleteClassroom({ token, deptId, cid: id })
      .then(() => {
        fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${deptId}/classrooms`);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };
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
                    console.log("object");
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
    </div>
  );
};

const Staffs = ({ staffs, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();

  const remove = (id) => {
    deleteStaff({ token, deptId, staffId: id })
      .then(() => {
        fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${deptId}/staffs`);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="staffs">
      {staffs?.map(({ _id: id, name }) => (
        <Card key={id}>
          <div className="staffs__card">
            <div>{name}</div>
            <div>
              <IconButton
                onClick={() => {
                  console.log("object");
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
      ))}
    </div>
  );
};

const Students = ({ students, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();

  const remove = (id) => {
    deleteStudent({ token, deptId, studentId: id })
      .then(() => {
        fetchOne(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${deptId}/students`);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="students">
      {students?.map(({ _id: id, name }) => (
        <Card key={id}>
          <div className="students__card">
            <div>{name}</div>
            <div>
              <IconButton
                onClick={() => {
                  console.log("object");
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
      ))}
    </div>
  );
};

export default Display;
