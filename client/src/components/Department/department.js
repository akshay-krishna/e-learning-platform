import { Container } from "../Layout";
import Admin from "./components/Admin/Admin";
import Specific from "./components/Specific/Specific";
import "./department.css";

const Department = ({ specific }) => {
  return (
    <div className="department">
      <Container>{specific ? <Specific /> : <Admin />}</Container>
    </div>
  );
};

export default Department;
