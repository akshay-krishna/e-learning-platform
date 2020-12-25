import { useHistory, useParams } from "react-router-dom";

const DepartmentNav = ({ option }) => {
  const { id } = useParams();
  const history = useHistory();
  const navOnClick = (e) => {
    history.push(`/departments/${id}/${e.target.id}`);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      id={option.toLowerCase()}
      onClick={navOnClick}
    >
      {option.charAt(0).toUpperCase() + option.slice(1)}
    </div>
  );
};

export default DepartmentNav;
