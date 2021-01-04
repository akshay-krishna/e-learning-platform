import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../Layout";

import "./display.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteOne } from "../../../../api/users";
import { useContext } from "react";
import { userContext } from "../../../../context/userContext";
import { getDepartment } from "../../../../api/department";

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
            console.log(department);
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
        {data?.map(({ _id: id, name }) => (
          <Card key={id}>
            <div className="classroom__card">
              <div>{name}</div>
              <div onClick={() => remove(id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div
                onClick={() => {
                  console.log("object");
                }}
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    ) : (
      <div className="users">
        {data?.map(({ _id: id, name, eduMail }) => (
          <Card key={id}>
            <div className="user__card">
              <div>{name}</div>
              <div>{eduMail}</div>
              <div onClick={() => remove(id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <div>
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );

  return component;
};

export default Display;
