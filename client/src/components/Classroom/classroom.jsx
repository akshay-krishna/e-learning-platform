import { useState } from "react";
import { useContext, useEffect } from "react";

import { fetchOne } from "../../api/classroom";

import department from "../../api/department";
import courses from "../../api/course";
import { userContext } from "../../context/userContext";

import Container from "@material-ui/core/Container";
import { Button, Card, FormControl, TextField } from "@material-ui/core";

import "./classroom.css";
import { useParams } from "react-router-dom";

const Classroom = () => {
  const { deptId, token } = useContext(userContext).user;
  const { cid } = useParams();
  const [newCourse, setNewCourse] = useState(false);
  const [classroom, setClassroom] = useState({});
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    fetchOne({ token, deptId, cid })
      .then(({ classroom }) => {
        setClassroom(classroom);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [deptId, cid, token]);

  const { name, courses } = classroom;
  return (
    <Container maxWidth="md">
      <div className="classroom__header">
        <div>
          <h1>{name}</h1>
        </div>
        <div className="classroom__headerBtn">
          <select onChange={(e) => setCourseId(e.target.value)}>
            <option value={null}>Choose course</option>
            {courses?.map(({ _id: id, courseName }) => {
              return (
                <option key={id} value={id}>
                  {courseName}
                </option>
              );
            })}
          </select>
          <Button
            onClick={() => setNewCourse(!newCourse)}
            variant="contained"
            color={newCourse ? "secondary" : "default"}
            disableElevation
          >
            {newCourse ? "cancel" : "Add Course"}
          </Button>
        </div>
      </div>
      {newCourse ? <NewCourse /> : <Course courseId={courseId} />}
    </Container>
  );
};

const Course = ({ courseId }) => {
  console.log(courseId);
  return (
    <Container>
      <div>name</div>
    </Container>
  );
};

const NewCourse = () => {
  const { deptId, token } = useContext(userContext).user;
  const { cid } = useParams();
  const [course, setCourse] = useState({ courseName: "", teach: "" });
  const [staffs, setStaffs] = useState([]);

  const onSubmit = (e) => {
    courses
      .create({ token, cid, course })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error(err));
    e.preventDefault();
  };
  const { courseName, teach } = course;
  return (
    <div className="newCourse">
      <Card>
        <form onSubmit={onSubmit}>
          <FormControl>
            <TextField
              variant="outlined"
              label="course name"
              value={courseName}
              name="courseName"
              required
              onChange={(e) => {
                setCourse({ ...course, [e.target.name]: e.target.value });
              }}
            />
          </FormControl>
          <FormControl>
            <select
              required
              name="teach"
              onChange={(e) => {
                setCourse({ ...course, [e.target.name]: e.target.value });
              }}
            >
              <option value={teach}>Select course teach</option>
              {staffs?.map(({ _id: id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormControl>
            <Button type="submit">Create</Button>
          </FormControl>
        </form>
      </Card>
    </div>
  );
};

export default Classroom;
