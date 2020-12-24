import { createContext, useReducer } from "react";
import departmentReducer from "../reducers/departmentReducer";

export const departmentContext = createContext();

const DepartmentContextProvider = ({ children }) => {
  const [department, setDepartment] = useReducer(departmentReducer, {});
  return (
    <departmentContext.Provider value={{ department, setDepartment }}>
      {children}
    </departmentContext.Provider>
  );
};

export default DepartmentContextProvider;
