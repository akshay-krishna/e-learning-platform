const { Schema, model } = require("mongoose");

const FeedSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  body: {
    type: Schema.Types.String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
  },
  onModel: {
    type: Schema.Types.String,
    enum: ["staffs", "students"],
    default: "students",
  },
});

module.exports = model("feeds", FeedSchema);
