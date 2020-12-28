import { useParams } from "react-router-dom";
import "./option.css";

const Option = ({ setAll }) => {
  let { option } = useParams();
  const onClick = (e) => {
    const parent = e.target.parentNode;
    if (e.target === parent.firstChild) {
      parent.firstChild.classList.add("options__navItems--active");
      parent.lastChild.classList.remove("options__navItems--active");
      setAll(true);
    } else {
      parent.firstChild.classList.remove("options__navItems--active");
      parent.lastChild.classList.add("options__navItems--active");
      setAll(false);
    }
  };

  option = option.charAt(0).toUpperCase() + option.slice(1);

  return (
    <div className="options__nav">
      <div className="options__navContainer">
        <div
          style={{ cursor: "pointer" }}
          className="options__navItems--active"
          onClick={onClick}
        >
          All {option}
        </div>
        <div onClick={onClick} style={{ cursor: "pointer" }}>
          Add {option}
        </div>
      </div>
    </div>
  );
};

export default Option;
