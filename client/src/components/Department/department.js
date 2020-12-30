import { Container } from "../Layout";
import Admin from "./components/Admin";
import Specific from "./components/Specific";
import "./department.css";

const Department = ({ specific }) => {
  return (
    <div className="department">
      <Container>{specific ? <Specific /> : <Admin />}</Container>
    </div>
  );
};

export default Department;
