const Classroom = require("../models/Classroom");

// checks weather if the user with passed in id is a homeroom teacher
const isHomeroomTeacher = async (id) => {
  try {
    return await Classroom.exists({ homeRoomTeacher: id });
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to query the database");
  }
};

module.exports = isHomeroomTeacher;
