import axios from "../libs/axios";

// get all the classrooms under a department
export const getClassrooms = async (token, deptId) => {
  try {
    const res = await axios.get(`/department/${deptId}/classrooms`, {
      headers: { Authorization: token },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(
      `Failed to fetch the classrooms under the department ${deptId}`
    );
  }
};

// create a classroom
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

// get a specific classroom
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

// update a classroom
export const updateClassroom = async (token, deptId, id, data) => {
  try {
    const res = await axios.put(
      `/departments/${deptId}/classrooms/${id}`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to update the classroom ${id}`);
  }
};
// delete a classroom

export const deleteClassroom = async (token, deptId, id) => {
  try {
    const res = await axios.delete(`/departments/${deptId}/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to delete the classroom ${id}`);
  }
};
