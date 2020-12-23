import { useContext, useEffect, useState } from "react";
import { getAll } from "../../api/department";
import { userContext } from "../../context/userContext";
import Card from "../layout/Card";
import "./styles/department.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Department = () => {
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
  return (
    <div className="department">
      <div className="container">
        <div className="department__cards">
          {departments.map((department) => {
            return <Card key={department._id} department={department} />;
          })}
        </div>
      </div>
      <div className="department__addIcon">
        <FontAwesomeIcon icon={faPlus} size="3x" transform="shrink-4" />
      </div>
    </div>
  );
};

export default Department;
