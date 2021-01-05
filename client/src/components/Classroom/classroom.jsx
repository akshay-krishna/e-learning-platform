import { useContext, useEffect } from "react";
import { fetchOne } from "../../api/users";
import { userContext } from "../../context/userContext";

const Classroom = () => {
  const { deptId, token } = useContext(userContext).user;

  // useEffect(() => {
  //   fetchOne();
  // });
  return <div>test</div>;
};

export default Classroom;
