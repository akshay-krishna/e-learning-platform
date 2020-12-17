const Staff = require("../models/Staff");
const isStaff = async (id) => {
  try {
    return await Staff.exists({ _id: id });
  } catch (err) {
    console.error(err.message);
    throw Error("failed to query the database");
  }
};

module.exports = isStaff;
