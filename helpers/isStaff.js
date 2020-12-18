const Staff = require("../models/Staff");

// checks weather if the user with passed in id is a staff
const isStaff = async (id) => {
  try {
    return await Staff.exists({ _id: id });
  } catch (err) {
    console.error(err.message);
    throw Error("failed to query the database");
  }
};

module.exports = isStaff;
