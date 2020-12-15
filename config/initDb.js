const Admin = require("../models/Admin");
const Department = require("../models/Department");
const Staff = require("../models/Staff");

const initDb = async () => {
  try {
    const isAdmin = await Staff.exists({ name: "root" });
    if (!isAdmin) {
      let department = await Department.findOne({ name: "root" });
      if (!department) {
        department = new Department({
          name: "root",
        });
      }
      const staff = new Staff({
        name: "root",
        password: "root",
        eduMail: "root@edu.com",
        department: department.id,
      });
      await staff.save();
      department.staffMembers.push(staff.id);
      await department.save();
      const newAdmin = new Admin({ staffId: staff.id });
      await newAdmin.save();
      console.log("created the root department");
      console.log("Created the root admin account");
    }
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = initDb;
