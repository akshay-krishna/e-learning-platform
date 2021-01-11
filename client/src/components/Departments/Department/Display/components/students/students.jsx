import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";

import { userContext } from "@context/userContext";
import { fetchOne } from "@api/department";
import { destroy } from "@api/students";

const Students = ({ students, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();

  const remove = (id) => {
    destroy({ token, deptId, studentId: id })
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

export default Students;
