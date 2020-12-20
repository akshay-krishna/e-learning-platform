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

// module.exports = model("courses", model(CourseSchema));

