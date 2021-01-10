import { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";

import { userContext } from "../../../../context/userContext";
import { fetchOne } from "../../../../api/department";
import { destroy } from "../../../../api/staff";

const Staffs = ({ staffs, setDepartment }) => {
  const { id: deptId } = useParams();
  const { token } = useContext(userContext).user;
  const history = useHistory();

  const remove = (id) => {
    destroy({ token, deptId, staffId: id })
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

export default Staffs;
