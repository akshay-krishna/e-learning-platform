import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartment } from "../../api/department";
import { userContext } from "../../context/userContext";
import departmentOption from "../../reducers/departmentOption";
import "./styles/departmentDetails.css";

const DepartmentDetails = () => {
  const { token } = useContext(userContext).user;
  const { id } = useParams();

  const [department, setDepartment] = useState({});
  const [option, setOption] = useState({
    type: "cls",
  });

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const { department } = await getDepartment(token, id);
        setDepartment(department);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(token);
  }, [token, id]);

  const navOnClick = (e) => {
    setOption({ type: e.target.id });
  };
  return (
    <div className="departmentDetails">
      <div className="container departmentDetails__container">
        <div className="departmentDetail__header">
          <h1>{department.name}</h1>
        </div>
        <div className="departmentDetail__nav">
          <div className="nav__items" id="cls" onClick={navOnClick}>
            Classrooms
          </div>
          <div className="nav__items" id="staff" onClick={navOnClick}>
            Staffs
          </div>
          <div className="nav__items" id="student" onClick={navOnClick}>
            Students
          </div>
        </div>
        <Option option={option} department={department} />
      </div>
    </div>
  );
};

const Option = ({ option, department }) => {
  const { type } = option;
  let component = null;
  switch (type) {
    case "staff":
      component = <Staffs department={department} />;
      break;
    case "cls":
      component = <Classrooms department={department} />;
      break;
    case "student":
      component = <Students department={department} />;
      break;
  }
  return component;
};

const Staffs = ({ department }) => {
  return (
    <div>
      <form>
        <input type="text" name="" id="" />
      </form>
    </div>
  );
};

const Classrooms = ({ department }) => {
  return <h1>classrooms</h1>;
};
const Students = ({ department }) => {
  return <h1>students</h1>;
};

export default DepartmentDetails;
