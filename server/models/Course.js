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

  assignments: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "assignments",
    },
  ],
});

module.exports = model("courses", CourseSchema);
