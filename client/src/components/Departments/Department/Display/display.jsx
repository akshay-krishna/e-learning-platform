import Card from "@material-ui/core/Card";

import "./display.css";

import { useHistory, useParams } from "react-router-dom";
import { deleteOne } from "../../../../api/users";
import { useContext } from "react";
import { userContext } from "../../../../context/userContext";
import { getDepartment } from "../../../../api/department";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const Display = ({ department, setDepartment }) => {
  const { option, id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();
  const remove = (id) => {
    deleteOne(token, deptId, id, option)
      .then(() => {
        getDepartment(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${deptId}/${option}`);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return <ChooseComponent {...department} remove={remove} />;
};

const ChooseComponent = ({
  staffMembers,
  studentMembers,
  classrooms,
  remove,
}) => {
  const { option } = useParams();

  let data = [];
  switch (option) {
    case "staffs":
      data = staffMembers;
      break;
    case "students":
      data = studentMembers;
      break;
    default:
      data = classrooms;
      break;
  }

  const component =
    option === "classrooms" ? (
      <div className="classrooms">
        {data?.map(
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
    ) : (
      <div className="users">
        {data?.map(({ _id: id, name, eduMail, semester, classroom }) => (
          <Card key={id}>
            <div className="user__card">
              <div>{name}</div>
              <div>{classroom?.name}</div>
              <div>{eduMail}</div>
              <div>{semester}</div>
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

  return component;
};

export default Display;
