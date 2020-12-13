const Department = require("../models/Department");

const isDeptHead = async (id) => {
  try {
    return await Department.exists({ head: id });
  } catch (err) {
    console.error(err.message);
    throw Error("failed to query the database");
  }
};

module.exports = isDeptHead;
