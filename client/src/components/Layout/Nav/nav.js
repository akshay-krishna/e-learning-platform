import "./nav.css";

const Nav = (props) => {
  const { children, id, onClick, active } = props;
  const focus = (e) => {
    e.stopPropagation();

    const bottomLines = document.querySelectorAll(".bottom__line");

    bottomLines.forEach((bottomLine) => {
      bottomLine.classList.remove("bottom__line--focus");
    });
    const { target } = e;

    const [_, bottomLine] = target.children;

    bottomLine.classList.add("bottom__line--focus");
  };
  const onMouseOver = (e) => {
    e.stopPropagation();
    const { target } = e;
    const [_, bottomLine] = target.children;
    bottomLine.classList.toggle("bottom__line--hover");
  };

  return (
    <div
      className="nav"
      id={id}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      onClick={(e) => {
        focus(e);
        onClick(e);
      }}
    >
      <span className="navItems">{children}</span>
      <span
        className={active ? "bottom__line--focus bottom__line" : "bottom__line"}
      ></span>
    </div>
  );
};

export default Nav;
