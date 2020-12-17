const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
  body: {
    type: Schema.Types.String,
  },
  author: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
    default: "students",
  },

  onModel: {
    type: Schema.Types.String,
    enum: ["students", "staffs"],
    required: true,
  },
});

module.exports = model("comments", CommentSchema);
