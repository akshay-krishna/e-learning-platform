const { model, Schema } = require("mongoose");
const { genHash } = require("../helpers/hash");

const StaffSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  password: {
    required: true,
    type: Schema.Types.String,
  },

  eduMail: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
});

StaffSchema.pre("save", async function () {
  try {
    this.password = await genHash(this.password);
  } catch (err) {}
});

module.exports = StaffModel = model("staffs", StaffSchema);
