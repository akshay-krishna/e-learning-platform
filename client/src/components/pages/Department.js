import { useContext, useEffect, useState } from "react";
import { getAll } from "../../api/department";
import { userContext } from "../../context/userContext";

const Department = () => {
  const { token, isAdmin } = useContext(userContext).user;
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchData = async (token) => {
      try {
        const { departments } = await getAll(token);
        setDepartments(departments);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData(token);
  }, []);
  console.log(isAdmin);
  return <div>Department</div>;
};

export default Department;
