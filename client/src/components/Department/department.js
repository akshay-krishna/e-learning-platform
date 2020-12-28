import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAll } from "../../api/department";
import { userContext } from "../../context/userContext";
import "./department.css";

const Department = () => {
  const history = useHistory();
  const { token } = useContext(userContext).user;
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const { departments } = await getAll(token);
        setDepartments(departments);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData(token);
  }, [token]);
  const onClick = (id) => {
    history.push(`/departments/${id}/classrooms`);
  };
  return (
    <div className="department">
      <div className="container">
        <div className="department__cards">
          {departments.map(({ name, _id: id }) => {
            return (
              <div
                key={id}
                className="department__card"
                onClick={() => onClick(id)}
              >
                <div className="department__cardContent">
                  <p>{name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Department;
