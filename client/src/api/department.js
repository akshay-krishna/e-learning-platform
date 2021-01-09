import axios from "./lib/axios";

// get all departments
export const fetchAll = async (token, cancelToken) => {
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
export const create = async (token, data) => {
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
export const fetchOne = async (token, deptId, cancelToken) => {
  try {
    const res = await axios.get(`/departments/${deptId}`, {
      cancelToken: cancelToken,
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to fetch ${deptId}`);
  }
};

// update a department
export const update = async (token, deptId, data) => {
  try {
    const res = await axios.put(`/departments/${deptId}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to update the department ${deptId}`);
  }
};

// delete a department
export const destroy = async (token, deptId) => {
  try {
    const res = await axios.delete(`/departments/${deptId}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to delete the department ${deptId}`);
  }
};

const department = {
  fetchAll,
  create,
  fetchOne,
  update,
  destroy,
};

export default department;
