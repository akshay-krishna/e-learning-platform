import axios from "./lib/axios";

export const fetchAll = async ({ token, cid }) => {
  try {
    const res = await axios.get(`/classrooms/${cid}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to get the courses under classroom ${cid}`);
  }
};

export const create = async ({ token, cid, course }) => {
  try {
    const res = await axios.post(
      `/classrooms/${cid}/courses`,
      { course },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return res.status;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to create a course for the classroom ${cid}`);
  }
};

export const fetchOne = async ({ token, cid, courseId }) => {
  try {
    const res = await axios.get(`/classroom/${cid}/courses/${courseId}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error(`Failed to fetch the course ${courseId}`);
  }
};

const course = { fetchAll, fetchOne, create };

export default course;
