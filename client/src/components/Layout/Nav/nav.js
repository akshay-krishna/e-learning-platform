import "./nav.css";

const Nav = (props) => {
  const { children, id } = props;

  return (
    <div className="nav" id={id}>
      <span className="navItems">{children}</span>
    </div>
  );
};

export default Nav;
