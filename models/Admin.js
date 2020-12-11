const { model, Schema } = require("mongoose");

const AdminSchema = new Schema({
  staffId: {
    type: Schema.Types.ObjectId,
    ref: "staffs",
  },
});

module.exports = AdminModel = model("admins", AdminSchema);
