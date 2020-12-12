const { model, Schema } = require("mongoose");

const DepartmentSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
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

module.exports = DepartmentModel = model("departments", DepartmentSchema);
