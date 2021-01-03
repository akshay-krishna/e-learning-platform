import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../Layout";

import "./display.css";
import { useHistory, useParams } from "react-router-dom";
import { deleteOne } from "../../../../api/users";
import { useContext } from "react";
import { userContext } from "../../../../context/userContext";
import { getDepartment } from "../../../../api/department";

const Display = ({
  staffMembers,
  studentMembers,
  classrooms,
  setDepartment,
}) => {
  const { option, id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();
  const remove = (id) => {
    deleteOne(token, deptId, id, option)
      .then(() => {
        getDepartment(token, deptId)
          .then(({ department }) => {
            setDepartment(department);
            console.log(department);
            history.replace(`/departments/${deptId}/${option}`);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

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
  return (
    <div className="users">
      {data?.map(({ _id: id, name, eduMail }) => (
        <Card key={id}>
          <div className="user__card">
            <div>{name}</div>
            <div>{eduMail}</div>
            <div>
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
            <div onClick={() => remove(id)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Display;
