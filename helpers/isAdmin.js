const Admin = require("../models/Admin");

const isAdmin = async (id) => {
  try {
    return await Admin.exists({ staffId: id });
  } catch (err) {
    console.error(err.message);
    throw Error("failed to query the database");
  }
};

module.exports = isAdmin;
