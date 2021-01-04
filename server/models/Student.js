const { model, Schema } = require("mongoose");
const { genHash, compareHash } = require("../helpers/hash");

const StudentSchema = new Schema({
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
    unique: true,
    required: true,
  },
  mails: [
    {
      type: Schema.Types.String,
    },
  ],
  phone: [
    {
      type: Schema.Types.String,
      required: true,
    },
  ],
  semester: {
    type: Schema.Types.Number,
    default: 1,
  },

  department: {
    type: Schema.Types.ObjectId,
    ref: "departments",
    required: true,
  },

  classroom: {
    type: Schema.Types.ObjectId,
    ref: "classrooms",
    required: true,
  },
  //   admitNo: {
  //     type: Schema.Types.Number,
  //     unique: true,
  //   },
  //   rollNo: {
  //     type: Schema.Types.Number,
  //     unique: true,
  //   },
  //   regNo: {
  //     type: Schema.Types.Number,
  //     unique: true,
  //   },
});

StudentSchema.pre("save", async function () {
  try {
    this.password = await genHash(this.password);
  } catch (err) {
    console.error(err.message);
  }
});

StudentSchema.methods.isValidPassword = async function (plainText) {
  try {
    return await compareHash(plainText, this.password);
  } catch (err) {
    console.error(err.message);
    throw Error("Failed to check if password is valid");
  }
};

module.exports = model("students", StudentSchema);
