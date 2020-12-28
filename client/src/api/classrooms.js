import axios from "../libs/axios";

export const createClassrooms = async (token, deptId, data) => {
  try {
    const res = await axios.post(`/departments/${deptId}/classrooms`, data, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to create the classroom");
  }
};

export const getClassroom = async (token, deptId, cid) => {
  try {
    const res = await axios.get(`/departments/${deptId}/classrooms/${cid}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the classroom with id ${cid}`);
  }
};
