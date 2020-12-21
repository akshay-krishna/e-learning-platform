import axios from "axios";

const axiosInit = () => {
  return axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export default axiosInit();
