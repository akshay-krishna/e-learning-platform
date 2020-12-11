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

  //   mails: [
  //     {
  //       type: Schema.Types.String,
  //     },
  //   ],
  //   phoneNo: [
  //     {
  //       type: Schema.Types.String,
  //     },
  //   ],
  //   semester: {
  //     type: Schema.Types.Number,
  //   },
  //   department: {
  //     type: Schema.Types.String,
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
  }
};

module.exports = StudentModel = model("students", StudentSchema);
