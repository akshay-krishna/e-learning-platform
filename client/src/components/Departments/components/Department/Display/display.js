import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../../../../Layout";

import "./display.css";
import { useParams } from "react-router-dom";

export default ({ staffMembers, studentMembers, classrooms }) => {
  const { option } = useParams();
  let data = [];
  switch (option) {
    case "staffs":
      data = staffMembers;
      break;
    case "students":
      data = studentMembers;
      break;
    case "classrooms":
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
            <div>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
