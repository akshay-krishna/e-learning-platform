import axios from "../libs/axios";

export const fetchAll = async (token, id, type) => {
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

export const create = async (token, id, data, type) => {
  try {
    const res = await axios.post(
      `/departments/${id}/${type}`,
      { list: data },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create ${type}`);
  }
};

export const fetchOne = async (token, deptId, id, type) => {
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

export const updateOne = async (token, deptId, id, type, data) => {
  try {
    const res = await axios.put(`/departments/${deptId}/${type}/${id}`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to update the ${type}`);
  }
};

export const deleteOne = async (token, deptId, id, type) => {
  try {
    const res = await axios.delete(`/departments/${deptId}/${type}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create ${type}`);
  }
};
