const { model, Schema } = require("mongoose");

const FeedSchema = new Schema({
  body: {
    type: Schema.Types.String,
    required: true,
  },

  title: {
    type: Schema.Types.String,
    required: true,
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

  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

module.exports = model("feeds", FeedSchema);
