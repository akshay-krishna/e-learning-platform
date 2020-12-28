import { departmentContext } from "../../context/departmentContext";
import { userContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { getDepartment } from "../../api/department";
import { useHistory, useParams } from "react-router-dom";

import AddMemberForm from "./AddMemberForm/addMemberForm";
import AddClassroomForm from "./AddClassroomForm/addClassroomForm";
import { ShowClassrooms, ShowMembers } from "./Layout";
import { ChooseOption } from "../Layout";
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
  const { staffMembers, classrooms, studentMembers } = useContext(
    departmentContext
  ).department;
  const { option } = useParams();
  const [all, setAll] = useState(true);
  let component = null;

  switch (option) {
    case "staffs":
      component = (
        <div className="staffs">
          <ChooseOption setAll={setAll} />
          {all ? <ShowMembers members={staffMembers} /> : <AddMemberForm />}
        </div>
      );
      break;
    case "classrooms":
      component = (
        <div className="classrooms">
          <ChooseOption setAll={setAll} />
          {all ? (
            <ShowClassrooms classrooms={classrooms} />
          ) : (
            <AddClassroomForm />
          )}
        </div>
      );
      break;
    case "students":
      component = (
        <div className="students">
          <ChooseOption setAll={setAll} />
          {all ? <ShowMembers members={studentMembers} /> : <AddMemberForm />}
        </div>
      );
      break;
  }
  return component;
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
    style.color = "#0030ea";
  }
  return (
    <div style={style} id={option.toLowerCase()} onClick={navOnClick}>
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </div>
  );
};

export default DepartmentDetails;
