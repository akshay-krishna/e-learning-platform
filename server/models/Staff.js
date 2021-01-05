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

  department: {
    type: Schema.Types.ObjectId,
    ref: "departments",
    required: true,
  },

  phone: {
    type: Schema.Types.String,
  },
  homeroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms",
  },
  classrooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "classrooms",
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

module.exports = model("staffs", StaffSchema);
