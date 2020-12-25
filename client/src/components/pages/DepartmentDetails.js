import { departmentContext } from "../../context/departmentContext";
import { userContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { getDepartment } from "../../api/department";
import DepartmentNav from "../layout/DepartmentNav";
import ChooseOption from "../layout/ChooseOption";
import ShowMembers from "../layout/ShowMembers";
import { useParams } from "react-router-dom";
import AddMemberForm from "./AddMemberForm";
import AddClassroomForm from "./AddClasroomForm";

import "./styles/departmentDetails.css";

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
            <DepartmentNav option="classrooms" />
            <DepartmentNav option="staffs" />
            <DepartmentNav option="students" />
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
      {all ? <ShowMembers members={classrooms} /> : <AddClassroomForm />}
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

export default DepartmentDetails;
