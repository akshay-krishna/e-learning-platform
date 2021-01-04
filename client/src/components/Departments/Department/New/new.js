import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { create } from "../../../../api/users";
import { userContext } from "../../../../context/userContext";
import NewClassroom from "./NewClassroom/newClassroom";
import "./new.css";
import NewStudent from "./NewStudent/newStudent";
import { getDepartment } from "../../../../api/department";
import NewStaff from "./NewStaff/newStaff";

const New = ({ setDepartment, staffMembers }) => {
  console.log(staffMembers);
  const { token } = useContext(userContext).user;
  const { option, id } = useParams();
  const history = useHistory();

  const onSubmit = (e, data) => {
    e.preventDefault();
    create(token, id, [data], option)
      .then(() => {
        getDepartment(token, id)
          .then(({ department }) => {
            setDepartment(department);
            history.replace(`/departments/${id}/${option}`);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="new">
      <div className="new__container">
        <ComponentSelector onSubmit={onSubmit} />
      </div>
    </div>
  );
};

const ComponentSelector = ({ onSubmit }) => {
  const { option } = useParams();
  let component = null;

  switch (option) {
    case "students":
      component = <NewStudent onSubmit={onSubmit} />;
      break;
    case "staffs":
      component = <NewStaff onSubmit={onSubmit} />;
      break;
    default:
      component = <NewClassroom onSubmit={onSubmit} />;
      break;
  }

  return component;
};

export default New;
