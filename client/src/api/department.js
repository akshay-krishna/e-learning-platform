import axios from "../libs/axios";

export const getAll = async (token) => {
  try {
    const res = await axios.get("/departments", {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error("Failed to fetch data");
  }
};

export const createDepartment = async (token, data) => {
  try {
    const res = await axios.post("/departments", data, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error("Failed to create a department");
  }
};

export const getDepartment = async (token, id) => {
  try {
    const res = await axios.get(`/departments/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to fetch ${id}`);
  }
};
