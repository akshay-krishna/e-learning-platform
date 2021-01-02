import "./button.css";

const Button = (props) => {
  const { onClick, className, type, children } = props;
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
      <button type={type} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
