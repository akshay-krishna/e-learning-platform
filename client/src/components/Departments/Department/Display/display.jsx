import { useParams } from "react-router-dom";
import Staffs from "./components/staffs/staffs";
import Students from "./components/students/students";
import Classrooms from "./components/classrooms/classrooms";
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
        <Classrooms
          classrooms={classrooms}
          staffs={staffMembers}
          setDepartment={setDepartment}
        />
      );
      break;
  }

  return component;
};

export default Display;
