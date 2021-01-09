import { useState } from "react";
import { useContext, useEffect } from "react";
import { fetchOne } from "../../api/staff";
import { userContext } from "../../context/userContext";

import Container from "@material-ui/core/Container";

const Classroom = () => {
  const { deptId, token, homeroom } = useContext(userContext).user;
  const [classroom, setClassroom] = useState({});
  useEffect(() => {
    fetchOne(token, deptId, homeroom, "classrooms")
      .then(({ classroom }) => {
        setClassroom(classroom);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [deptId, homeroom, token]);
  const { name } = classroom;
  return (
    <Container>
      <h1>{name}</h1>
    </Container>
  );
};

export default Classroom;
