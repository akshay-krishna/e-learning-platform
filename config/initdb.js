const { genHash } = require("../helpers/hash");
const Admin = require("../models/Admin");
const Staff = require("../models/Staff");

const initDb = async () => {
  try {
    const isAdmin = await Staff.exists({ name: "root" });
    if (!isAdmin) {
      const newStaff = new Staff({
        name: "root",
        password: "root",
        eduMail: "root@edu.com",
      });
      await newStaff.save();
      const newAdmin = new Admin({ staffId: newStaff.id });
      await newAdmin.save();
      console.log("Created the root admin account");
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = initDb;
