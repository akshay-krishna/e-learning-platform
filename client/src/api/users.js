import axios from "../libs/axios";

// get users
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

// create users
export const createUsers = async (token, id, data, type) => {
  console.log(data);
  try {
    const res = await axios.post(
      `/departments/${id}/${type}s`,
      { list: data },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create ${type}`);
  }
};

// get a user
export const getUser = async (token, deptId, id, type = "students") => {
  try {
    const res = await axios.get(`/departments/${deptId}/${type}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the ${type} with the id ${id}`);
  }
};

// update a user
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

// Delete a user
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
