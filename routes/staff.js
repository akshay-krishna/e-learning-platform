const { Router } = require("express");
const saveToDb = require("../helpers/saveToDb");

// middleware
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

// models
const Department = require("../models/Department");
const Staff = require("../models/Staff");

const router = Router({ mergeParams: true }); //initialize the router

/**
 *  *get all the staffs under a department
 *  @method GET
 *  ?route --> /departments/:id/staffs
 *  @param none
 *  @access private
 */

router.get("/", admin, async (req, res) => {
  const { id } = req.params;
  try {
    const staffs = await Staff.find({ department: id }, "-password");
    if (!staffs) return res.sendStatus(404);
    res.json({ staffs });
  } catch (error) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Create a staff
 *  @method POST
 *  ?route --> /departments/:id/staffs
 *  @param {deptId: <id of department>, staffList: [<{name, password, eduMail}>]}
 *  @access private
 */

router.post("/", admin, async (req, res) => {
  const { staffList } = req.body;
  const { id } = req.params;

  try {
    const department = await Department.findById(id);
    if (!department) return res.sendStatus(404);
    const savedStaffs = staffList.map((staff) => {
      const { name, password, eduMail } = staff;
      const newStaff = new Staff({
        eduMail,
        name,
        password,
        department: id,
      });

      saveToDb(newStaff);
      return newStaff.id;
    });
    department.staffMembers.push(...savedStaffs);
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    if (err.code == 11000) {
      res.status(409).json({ error: err.keyValue });
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *get a staff info
 *  @method GET
 *  ?route --> /departments/:id/staffs/:sid
 *  @param none
 *  @access private
 */

router.get("/:sid", auth, async (req, res) => {
  const { sid } = req.params;
  try {
    const staff = await Staff.findById(sid, "-password");
    if (!staff) return res.sendStatus(404);
    res.json({ staff });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *update a staff
 *  @method PUT
 *  ?route --> /departments/:id/staffs/:sid
 *  @param {body: contains the required updated data}
 *  @access private
 */

router.put("/:sid", auth, async (req, res) => {
  const { sid } = req.params;
  const { body } = req;
  try {
    await Staff.findByIdAndUpdate(sid, body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    res.sendStatus(500);
  }
});

/**
 *  *delete a staff
 *  @method DELETE
 *  ?route --> /departments/:id/staffs/:sid
 *  @param none
 *  @access private
 */

router.delete("/:sid", auth, async (req, res) => {
  const { sid, id } = req.params;

  try {
    const isHead = await Department.exists({ _id: id, head: sid });
    if (isHead) return res.sendStatus(406);
    const department = await Department.findById(id);
    const staffIndex = department.staffMembers.indexOf(sid);
    await Staff.findByIdAndDelete(sid);
    department.staffMembers.splice(staffIndex, 1);
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
