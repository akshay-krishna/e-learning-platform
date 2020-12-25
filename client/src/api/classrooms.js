import axios from "../libs/axios";

export const createClassrooms = async (token, id, data) => {
  try {
    const res = await axios.post(`/departments/${id}/classrooms`, data, {
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
