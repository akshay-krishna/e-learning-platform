const Department = require("../models/Department");

// checks weather if the user with passed in id is a department head
const isDeptHead = async (id) => {
  try {
    return await Department.exists({ head: id });
  } catch (err) {
    console.error(err.message);
    throw Error("failed to query the database");
  }
};

module.exports = isDeptHead;
