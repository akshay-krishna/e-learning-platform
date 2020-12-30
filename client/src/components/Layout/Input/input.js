import "./input.css";

const Input = (props) => {
  const { placeholder, onChange, value, type, name, id } = props;
  const onFocus = (e) => {
    const parent = e.target.parentNode;
    parent.children[0].classList.add("label--click");
    parent.classList.add("input--click");
  };
  const onBlur = (e) => {
    const parent = e.target.parentNode;
    const [label, input] = parent.children;

    if (input.value.length > 0) return;

    label.classList.remove("label--click");
    parent.classList.remove("input--click");
  };

  return (
    <div className="input__container">
      <label htmlFor={id}>{placeholder}</label>
      <input
        id={id}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        name={name}
        type={type || "text"}
      />
    </div>
  );
};

export default Input;
