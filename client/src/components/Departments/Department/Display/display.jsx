import { useParams } from "react-router-dom";
import Staffs from "./staffs";
import Students from "./students";
import Classrooms from "./classrooms";

import "./display.css";

const Display = ({ department, setDepartment }) => {
  const { option } = useParams();
  const { staffMembers, studentMembers, classrooms } = department;
  let component = null;
  switch (option) {
    case "staffs":
      component = (
        <Staffs staffs={staffMembers} setDepartment={setDepartment} />
      );
      break;
    case "students":
      component = (
        <Students students={studentMembers} setDepartment={setDepartment} />
      );
      break;
    default:
      component = (
        <Classrooms classrooms={classrooms} setDepartment={setDepartment} />
      );
      break;
  }

  return component;
};

export default Display;
