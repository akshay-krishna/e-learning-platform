import axios from "./lib/axios";

// authenticate a user
const login = async (data, type) => {
  const URL = `/auth/${type ? "staffs" : "students"}`;
  try {
    return await axios.post(URL, data);
  } catch (err) {
    console.error(err.response);
  }
};

export default login;
