import axios from "./lib/axios";

export const fetchAll = async ({ token, deptId }) => {
  try {
    const res = await axios.get(`/departments/${deptId}/classrooms`, {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the classrooms under ${deptId}`);
  }
};

export const create = async ({ token, deptId, classroom }) => {
  try {
    const res = await axios.post(
      `/departments/${deptId}/classrooms`,
      { classroom },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create classroom`);
  }
};

export const fetchOne = async ({ token, deptId, cid }) => {
  try {
    const res = await axios.get(`/departments/${deptId}/classrooms/${cid}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the classroom with the id ${cid}`);
  }
};

export const update = async ({ token, deptId, cid, updateData }) => {
  try {
    const res = await axios.put(
      `/departments/${deptId}/classrooms/${cid}`,
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
    throw Error(`Failed to update the classroom ${cid}`);
  }
};

export const destroy = async ({ token, deptId, cid }) => {
  try {
    const res = await axios.delete(`/departments/${deptId}/classrooms/${cid}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to delete classroom ${cid}`);
  }
};
const classroom = {
  fetchAll,
  create,
  fetchOne,
  update,
  destroy,
};

export default classroom;
