const { model, Schema } = require("mongoose");
const { genHash, compareHash } = require("../helpers/hash");

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
  mails: [
    {
      type: Schema.Types.String,
    },
  ],
  phoneNo: [
    {
      type: Schema.Types.String,
    },
  ],
});

StaffSchema.pre("save", async function () {
  try {
    this.password = await genHash(this.password);
  } catch (err) {}
});

StaffSchema.methods.isValidPassword = async function (plainText) {
  try {
    return await compareHash(plainText, this.password);
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to check if password is valid");
  }
};

module.exports = StaffModel = model("staffs", StaffSchema);
