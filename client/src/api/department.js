import axios from "../libs/axios";

// get all departments
export const getAll = async (token, cancelToken) => {
  try {
    const res = await axios.get("/departments", {
      cancelToken: cancelToken,
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

// create a department
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

// get a department
export const getDepartment = async (token, id, cancelToken) => {
  try {
    const res = await axios.get(`/departments/${id}`, {
      cancelToken: cancelToken,
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

// update a department
export const updateDepartment = async (token, id, data) => {
  try {
    const res = await axios.put(`/departments/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to update the department ${id}`);
  }
};

// delete a department
export const deleteDepartment = async (token, id) => {
  try {
    const res = await axios.delete(`/departments/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to delete the department ${id}`);
  }
};
