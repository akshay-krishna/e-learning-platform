import { useHistory, useParams } from "react-router-dom";

const DepartmentNav = ({ option }) => {
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

export default DepartmentNav;
