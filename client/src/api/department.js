import axios from "../libs/axios";

export const getAll = async (token) => {
  try {
    const res = await axios.get("/departments", {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err.response);
    throw Error("Failed to fetch data");
  }
};
