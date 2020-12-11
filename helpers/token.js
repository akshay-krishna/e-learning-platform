const { sign, verify } = require("jsonwebtoken");

const genToken = async (payload) => {
  try {
    return await sign(payload, process.env.SECRET);
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to generate the token");
  }
};

const verifyToken = async (token) => {
  try {
    const decoded = await verify(token, process.env.SECRET);
    return decoded;
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to verify the token");
  }
};

module.exports = { genToken, verifyToken };
