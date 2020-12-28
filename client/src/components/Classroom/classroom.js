import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getClassroom } from "../../api/classrooms";
import { getUsers } from "../../api/users";
import { userContext } from "../../context/userContext";
import "./classroom.css";

const Classroom = () => {
  const { id, cid } = useParams();
  const { token } = useContext(userContext).user;
  const [classroom, setClassroom] = useState({});
  useEffect(() => {
    const classroom = getClassroom(token, id, cid);
    classroom
      .then(({ classroom }) => {
        setClassroom(classroom);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getStaffList = () => {
    const data = getUsers(token, id, "students");
    data
      .then(({ staffs }) => {
        const addCourse = document.querySelector(".classroom__staffList");
        addCourse.classList.add("classroom__staffList--active");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const { name } = classroom;
  return (
    <div className="classroom">
      <div className="container">
        <div className="classroom__header">
          <h1>{name}</h1>
        </div>
        <div>
          {/*           <div className="add__courses">
            <button onClick={getStaffList}>Add Course</button>
          </div> */}
          <div className="add__homeroomTeacher">
            <button onClick={getStaffList}>Add Students</button>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Classroom;
