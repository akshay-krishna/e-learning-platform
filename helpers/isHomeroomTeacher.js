const Classroom = require("../models/Classroom");

const isHomeroomTeacher = async (id) => {
  try {
    return await Classroom.exists({ homeRoomTeacher: id });
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to query the database");
  }
};

module.exports = isHomeroomTeacher;
