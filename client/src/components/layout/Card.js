import { useHistory } from "react-router-dom";
import "./styles/Card.css";

const Card = ({ department }) => {
  const history = useHistory();
  const onClick = () => {
    history.push(`/departments/${department._id}/classrooms`);
  };
  return (
    <div className="card" onClick={onClick}>
      <div className="card__banner">
        <div className="bg__img"></div>
      </div>
      <div className="card__content">
        <h5>{department.name}</h5>
        <p>{department.description}</p>
      </div>
    </div>
  );
};

export default Card;
