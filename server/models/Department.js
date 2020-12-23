const { model, Schema } = require("mongoose");

const DepartmentSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  head: {
    type: Schema.Types.ObjectId,
    ref: "staffs",
  },
  staffMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "staffs",
    },
  ],
  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "classrooms",
    },
  ],
  studentMembers: [
    {
      type: Schema.Types.ObjectId,
      ref: "students",
    },
  ],
});

module.exports = model("departments", DepartmentSchema);
