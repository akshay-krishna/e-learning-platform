const { model, Schema } = require("mongoose");

const ClassroomSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },

  department: {
    type: Schema.Types.ObjectId,
    ref: "departments",
    required: true,
  },

  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
  ],

  homeRoomTeacher: {
    type: Schema.Types.ObjectId,
    ref: "staffs",
    required: true,
  },

  studentMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "students",
    },
  ],
});

module.exports = model("classrooms", ClassroomSchema);
