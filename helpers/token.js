const { sign, verify } = require("jsonwebtoken");

const genToken = async (payload) => {
  try {
    return await sign(payload, process.env.SECRET);
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to generate the token");
  }
};

module.exports = { genToken };
