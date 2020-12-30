import "./button.css";

const Button = (props) => {
  const { onClick, className } = props;
  const onMouseDown = (e) => {
    e.stopPropagation();
    e.target.classList.add("btn--click");
  };

  const onMouseUp = (e) => {
    e.target.classList.remove("btn--click");
  };
  return (
    <div
      className={`btn ${className}`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <button onClick={onClick}>{props.children}</button>
    </div>
  );
};

export default Button;
