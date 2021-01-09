import axios from "./lib/axios";

// Fetch all staffs
export const fetchAll = async ({ token, deptId }) => {
  try {
    const res = await axios.get(`/departments/${deptId}/staffs`, {
      headers: {
        authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to fetch staffs under the department ${deptId}`);
  }
};

// Create a staff
export const create = async ({ token, deptId, staffs }) => {
  try {
    const res = await axios.post(
      `/departments/${deptId}/staffs`,
      { list: staffs },
      {
        headers: {
          authorization: token,
          "content-type": "application/json",
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to create staffs under the department ${deptId}`);
  }
};

// Fetch one staff
export const fetchOne = async ({ token, deptId, staffId }) => {
  try {
    const res = await axios.get(`/departments/${deptId}/staffs/${staffId}`, {
      headers: {
        authorization: token,
        "content-type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to fetch staff ${staffId}`);
  }
};

// Update one staff
export const update = async ({ token, deptId, staffId, updateData }) => {
  try {
    const res = await axios.put(
      `/departments/${deptId}/staffs/${staffId}`,
      updateData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to update the ${staffId}`);
  }
};

// Delete on staff
export const destroy = async ({ token, deptId, staffId }) => {
  try {
    const res = await axios.delete(`/departments/${deptId}/staffs/${staffId}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to delete ${staffId}`);
  }
};

const staff = {
  fetchAll,
  create,
  fetchOne,
  update,
  destroy,
};

export default staff;
