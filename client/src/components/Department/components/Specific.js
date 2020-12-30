import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartment } from "../../../api/department";
import { userContext } from "../../../context/userContext";
import axios from "axios";
import "./specific.css";
import { Button, Input, Nav } from "../../Layout";

const Specific = () => {
  const { id } = useParams();
  const { token } = useContext(userContext).user;
  const [department, setDepartment] = useState([]);
  const [addForm, setAddForm] = useState(false);
  const initialOption = {
    staff: false,
    student: false,
    classroom: false,
  };
  const [option, setOption] = useState(initialOption);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const res = getDepartment(token, id, source.token);
    res
      .then(({ department }) => {
        setDepartment(department);
        setOption({ ...option, ["classroom"]: true });
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      source.cancel();
    };
  }, []);

  const { staff, student, classroom } = option;

  const onClick = (e) => {
    setOption({ ...initialOption, [e.target.id]: true });
  };

  const toggleAddForm = () => {
    setAddForm(!addForm);
  };

  return (
    <div>
      <div className="navBar">
        <Nav id="classroom" onClick={onClick} active>
          Classrooms
        </Nav>
        <Nav id="staff" onClick={onClick}>
          Staffs
        </Nav>
        <Nav id="student" onClick={onClick}>
          Students
        </Nav>
        <div className="nav__btn">
          <Button onClick={toggleAddForm}>Add</Button>
        </div>
      </div>
      {addForm ? <AddStaff setAddForm={setAddForm} /> : null}
      {staff ? <Staffs staff={department.staffMembers} /> : null}
    </div>
  );
};

const AddStaff = ({ setAddForm }) => {
  const initialState = {
    name: "",
    eduMail: "",
    phoneNo: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  const [users, setUsers] = useState([]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, user]);
    setUser(initialState);
  };

  const { name, eduMail, phoneNo, password } = user;
  return (
    <div className="addStaff">
      <div className="addStaff__container">
        <div className="addStaffForm">
          <h2>Add new Staff</h2>
          <form onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              placeholder="Name"
              id="name"
              name="name"
              value={name}
            />
            <Input
              onChange={onChange}
              placeholder="Mail"
              id="email"
              type="email"
              name="eduMail"
              value={eduMail}
            />
            <Input
              onChange={onChange}
              placeholder="Mobile"
              id="mobile"
              name="phoneNo"
              value={phoneNo}
            />
            <Input
              onChange={onChange}
              placeholder="password"
              id="password"
              type="password"
              name="password"
              value={password}
            />
            <div className="form__btn">
              <Button>ADD</Button>
              <Button onClick={() => setAddForm(false)} className="cancel">
                Cancel
              </Button>
            </div>
          </form>
        </div>
        <div className="addStaff__cards"></div>
      </div>
    </div>
  );
};

const Staffs = (props) => {
  const { staff } = props;
  console.log(staff);
  return <div>staffs</div>;
};

export default Specific;
