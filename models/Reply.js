const { Schema, model } = require("mongoose");

const ReplySchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
    required: true,
  },
  onModel: {
    type: Schema.Types.String,
    enum: ["staffs", "students"],
    default: "students",
  },
  body: {
    type: Schema.Types.String,
    required: true,
  },
});

module.exports = model("replies", ReplySchema);
