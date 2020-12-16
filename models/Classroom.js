const { model, Schema } = require("mongoose");

const ClassroomSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },

  homeRoomTeacher: {
    type: Schema.Types.ObjectId,
    ref: "staffs",
  },

  department: {
    type: Schema.Types.ObjectId,
    ref: "departments",
    required: true,
  },

  staffMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "staffs",
    },
  ],

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
