import axios from "../libs/axios";

export const getUsers = async (token, id, type = "students") => {
  try {
    const res = await axios.get(`/departments/${id}/${type}`, {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the ${type} under ${id}`);
  }
};

export const createUsers = async (token, id, data, type = "students") => {
  try {
    const res = await axios.post(`/departments/${id}/${type}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create ${type}`);
  }
};

export const updateUsers = async (token, deptId, id, type, data) => {
  try {
    await axios.put(`/departments/${deptId}/${type}/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to update the ${type}`);
  }
};
export const deleteUsers = async (token, deptId, id, type) => {
  try {
    await axios.delete(`/departments/${deptId}/${type}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create ${type}`);
  }
};
