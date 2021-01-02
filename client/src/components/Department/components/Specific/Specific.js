import { useContext, useEffect, useState } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { getDepartment } from "../../../../api/department";
import { userContext } from "../../../../context/userContext";
import axios from "axios";
import "./specific.css";
import { Button, Card, Nav } from "../../../Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const Specific = () => {
  const { id, option } = useParams();
  const { token } = useContext(userContext).user;
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const res = getDepartment(token, id, source.token);
    res
      .then(({ department }) => {
        setDepartment(department);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      source.cancel();
    };
  }, []);

  const { staffMembers, studentMembers } = department;

  return (
    <div>
      <div className="navBar">
        <Nav id="classroom">
          <Link to="classrooms">Classrooms</Link>
        </Nav>
        <Nav id="staff">
          <Link to="staffs">Staffs</Link>
        </Nav>
        <Nav id="student">
          <Link to="students">Students</Link>
        </Nav>
        <div className="nav__btn">
          <Link
            to={
              option === "classrooms" ? (
                <Redirect to="classrooms" />
              ) : (
                `${option}/add`
              )
            }
          >
            <Button>Add</Button>
          </Link>
        </div>
      </div>
      <>
        {option === "classrooms" ? null : (
          <Users users={option === "staffs" ? staffMembers : studentMembers} />
        )}
      </>
    </div>
  );
};

const Users = ({ users }) => {
  return (
    <div className="users">
      {users?.map(({ _id: id, name, eduMail }) => (
        <Card key={id}>
          <div className="user__card">
            <div>{name}</div>
            <div>{eduMail}</div>
            <div>
              <FontAwesomeIcon icon={faPencilAlt} />
            </div>
            <div>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Specific;
