const { model, Schema } = require("mongoose");

const AssignmentSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },

  description: {
    type: Schema.Types.String,
    required: true,
  },

  due: {
    type: Schema.Types.Date,
    required: true,
  },

  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms",
    required: true,
  },
});

module.exports = model("assignments", AssignmentSchema);
