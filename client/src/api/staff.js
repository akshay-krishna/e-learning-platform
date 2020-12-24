import axios from "../libs/axios";

export const createUsers = async (token, id, data, type = "students") => {
  try {
    const res = await axios.post(`/departments/${id}/${type}`, data, {
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
