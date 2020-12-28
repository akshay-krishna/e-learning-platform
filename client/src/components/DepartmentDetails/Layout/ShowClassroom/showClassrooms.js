import { useHistory, useParams } from "react-router-dom";
import "./showClassrooms.css";

const ShowClassrooms = ({ classrooms }) => {
  const history = useHistory();
  const { id: deptId } = useParams();
  return (
    <div className="showClassrooms">
      {classrooms?.map((classroom) => {
        const { name, description, _id: id } = classroom;
        return (
          <div
            key={id}
            className="showClassrooms__card"
            onClick={() => {
              history.push(`/departments/${deptId}/classrooms/${id}`);
            }}
          >
            <div className="showClassroom__cardContents">
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ShowClassrooms;
