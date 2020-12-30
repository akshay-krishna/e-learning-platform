import axios from "../libs/axios";

// authenticate a user
const login = async (data) => {
  try {
    return await axios.post("/auth/staff", data);
  } catch (err) {
    console.error(err.response);
  }
};

export default login;
