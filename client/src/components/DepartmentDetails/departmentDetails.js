import { departmentContext } from "../../context/departmentContext";
import { userContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { getDepartment } from "../../api/department";
import { useHistory, useParams } from "react-router-dom";

import ChooseOption from "./ChooseOption/chooseOption";
import ShowMembers from "./ShowMembers/showMembers";
import AddMemberForm from "./AddMemberForm/addMemberForm";
import AddClassroomForm from "./AddClassroomForm/addClassroomForm";
import ShowClassrooms from "./ShowClassrooms/showClassrooms";

import "./departmentDetails.css";

const DepartmentDetails = () => {
  const { token } = useContext(userContext).user;
  const { department, setDepartment } = useContext(departmentContext);
  const { id } = useParams();

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

  return (
    <div className="departmentDetails">
      <div className="container">
        <div className="departmentDetail__header">
          <h1>{department.name}</h1>
          <div className="departmentDetail__nav">
            <Nav option="classrooms" />
            <Nav option="staffs" />
            <Nav option="students" />
          </div>
        </div>
        <Option />
      </div>
    </div>
  );
};

const Option = () => {
  const { option } = useParams();
  let component = null;
  switch (option) {
    case "staffs":
      component = <Staffs />;
      break;
    case "classrooms":
      component = <Classrooms />;
      break;
    case "students":
      component = <Students />;
      break;
  }
  return component;
};

const Staffs = () => {
  const { staffMembers } = useContext(departmentContext).department;
  const [all, setAll] = useState(true);

  return (
    <div className="staffs">
      <ChooseOption setAll={setAll} />
      {all ? <ShowMembers members={staffMembers} saved /> : <AddMemberForm />}
    </div>
  );
};

const Classrooms = () => {
  const { classrooms } = useContext(departmentContext).department;
  const [all, setAll] = useState(true);
  return (
    <div className="classrooms">
      <ChooseOption setAll={setAll} />
      {all ? <ShowClassrooms classrooms={classrooms} /> : <AddClassroomForm />}
    </div>
  );
};
const Students = () => {
  const { studentMembers } = useContext(departmentContext).department;
  const [all, setAll] = useState(true);

  return (
    <div className="students">
      <ChooseOption setAll={setAll} />
      {all ? <ShowMembers members={studentMembers} /> : <AddMemberForm />}
    </div>
  );
};

const Nav = ({ option }) => {
  const { id, option: selection } = useParams();
  const history = useHistory();
  const navOnClick = (e) => {
    history.push(`/departments/${id}/${e.target.id}`);
  };
  const style = {
    cursor: "pointer",
    fontWeight: "400",
  };
  if (selection === option) {
    style.color = "#7f50ff";
  }
  return (
    <div style={style} id={option.toLowerCase()} onClick={navOnClick}>
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </div>
  );
};

export default DepartmentDetails;
