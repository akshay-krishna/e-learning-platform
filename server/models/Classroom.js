const { model, Schema } = require("mongoose");

const CourseSchema = new Schema({
  courseName: {
    type: Schema.Types.String,
    required: true,
  },
  teach: {
    type: Schema.Types.ObjectId,
    ref: "staffs",
    required: true,
  },
});

const ClassroomSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },

  description: {
    type: Schema.Types.String,
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "departments",
    required: true,
  },

  courses: [CourseSchema],

  homeRoomTeacher: {
    type: Schema.Types.ObjectId,
    ref: "staffs",
  },

  studentMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "students",
    },
  ],

  feeds: [
    {
      type: Schema.Types.ObjectId,
      ref: "feeds",
    },
  ],
});

module.exports = model("classrooms", ClassroomSchema);
