import axios from "./lib/axios";

export const fetchAll = async ({ token, deptId }) => {
  try {
    const res = await axios.get(`/departments/${deptId}/$students`, {
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the students under ${deptId}`);
  }
};

export const create = async ({ token, id, students, classroom }) => {
  try {
    const res = await axios.post(
      `/departments/${id}/students`,
      { list: students, cid: classroom },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to create students`);
  }
};

export const fetchOne = async ({ token, deptId, studentId }) => {
  try {
    const res = await axios.get(
      `/departments/${deptId}/students/${studentId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the student with the id ${studentId}`);
  }
};

export const update = async ({ token, deptId, studentId, updateData }) => {
  try {
    const res = await axios.put(
      `/departments/${deptId}/students/${studentId}`,
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
    throw Error(`Failed to update the student ${studentId}`);
  }
};

export const destroy = async ({ token, deptId, studentId }) => {
  try {
    const res = await axios.delete(
      `/departments/${deptId}/students/${studentId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`failed to delete student ${studentId}`);
  }
};
const student = {
  fetchAll,
  create,
  fetchOne,
  update,
  destroy,
};

export default student;
