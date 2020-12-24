import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartment } from "../../api/department";
import { userContext } from "../../context/userContext";
import { departmentContext } from "../../context/departmentContext";
import AddMemberForm from "../layout/AddMemberForm";
import ShowMembers from "../layout/ShowMembers";
import "./styles/departmentDetails.css";

const DepartmentDetails = () => {
  const { token } = useContext(userContext).user;
  const { department, setDepartment } = useContext(departmentContext);
  const { id } = useParams();
  const [option, setOption] = useState({
    type: "cls",
  });

  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const { department } = await getDepartment(token, id);
        setDepartment({ type: "set", data: department });
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
        <Option option={option} />
      </div>
    </div>
  );
};

const Option = ({ option }) => {
  const { type } = option;
  let component = null;
  switch (type) {
    case "staff":
      component = <Staffs />;
      break;
    case "cls":
      component = <Classrooms />;
      break;
    case "student":
      component = <Students />;
      break;
  }
  return component;
};

const Staffs = () => {
  const { staffMembers } = useContext(departmentContext).department;
  const [allStaffs, setAllStaffs] = useState(true);

  const onClick = (e) => {
    const parent = e.target.parentNode;
    if (e.target === parent.firstChild) {
      parent.firstChild.classList.add("staffs__navItems--active");
      parent.lastChild.classList.remove("staffs__navItems--active");
      setAllStaffs(true);
    } else {
      parent.firstChild.classList.remove("staffs__navItems--active");
      parent.lastChild.classList.add("staffs__navItems--active");
      setAllStaffs(false);
    }
  };

  return (
    <div className="staffs">
      <div className="staffs__nav">
        <div className="staffs__navContainer">
          <div
            className="staffs__navItems staffs__navItems--active"
            onClick={onClick}
          >
            All Staffs
          </div>
          <div onClick={onClick} className="staffs__navItems">
            Add Staffs
          </div>
        </div>
      </div>
      {allStaffs ? (
        <ShowMembers members={staffMembers} />
      ) : (
        <AddMemberForm setAll={setAllStaffs} type="staffs" />
      )}
    </div>
  );
};

const Classrooms = ({ department }) => {
  return <h1>classrooms</h1>;
};
const Students = () => {
  const { studentMembers } = useContext(departmentContext).department;
  const [allStaffs, setAllStudents] = useState(true);

  const onClick = (e) => {
    const parent = e.target.parentNode;
    if (e.target === parent.firstChild) {
      parent.firstChild.classList.add("staffs__navItems--active");
      parent.lastChild.classList.remove("staffs__navItems--active");
      setAllStudents(true);
    } else {
      parent.firstChild.classList.remove("staffs__navItems--active");
      parent.lastChild.classList.add("staffs__navItems--active");
      setAllStudents(false);
    }
  };
  return (
    <div className="staffs">
      <div className="staffs__nav">
        <div className="staffs__navContainer">
          <div
            className="staffs__navItems staffs__navItems--active"
            onClick={onClick}
          >
            All Students
          </div>
          <div onClick={onClick} className="staffs__navItems">
            Add Students
          </div>
        </div>
      </div>
      {allStaffs ? (
        <ShowMembers members={studentMembers} />
      ) : (
        <AddMemberForm setAll={setAllStudents} type="students" />
      )}
    </div>
  );
};

export default DepartmentDetails;
