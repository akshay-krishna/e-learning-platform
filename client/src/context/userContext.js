import { createContext, useReducer } from "react";
import userReducer from "../reducers/userReducer";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {}, () => {
    const initialData = localStorage.getItem("user");
    return initialData ? JSON.parse(initialData) : { auth: false };
  });

  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
