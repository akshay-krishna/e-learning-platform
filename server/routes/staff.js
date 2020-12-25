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
 *  ?route --> /departments/:deptId/staffs
 *  @param none
 *  @access admin
 */

router.get("/", admin, async (req, res) => {
  const { deptId } = req.params;
  try {
    const staffs = await Staff.find({ department: deptId }, "-password");
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
 *  ?route --> /departments/:deptId/staffs
 *  @param {deptId: <id of department>, list: [<{name, password, eduMail}>]}
 *  @access admin
 */

router.post("/", admin, async (req, res) => {
  const { list } = req.body;
  const { deptId } = req.params;

  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const savedStaffs = list.map((staff) => {
      const { name, password, eduMail } = staff;
      const newStaff = new Staff({
        eduMail,
        name,
        password,
        department: deptId,
      });

      saveToDb(newStaff);
      return newStaff.id;
    });
    department.staffMembers.push(...savedStaffs);
    const savedDept = await department.save();
    res.json({ savedDept });
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
 *  ?route --> /departments/:deptId/staffs/:id
 *  @param none
 *  @access auth
 */

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id, "-password");
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
 *  ?route --> /departments/:deptId/staffs/:id
 *  @param {body: contains the required updated data}
 *  @access auth
 *  TODO: only allow a staff to update only his/her data
 */

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await Staff.findByIdAndUpdate(id, body);
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
 *  ?route --> /departments/:deptId/staffs/:id
 *  @param none
 *  @access admin
 */

router.delete("/:id", admin, async (req, res) => {
  const { id, deptId } = req.params;
  try {
    const isHead = await Department.exists({ _id: deptId, head: id });
    if (isHead) return res.sendStatus(406);
    const department = await Department.findById(deptId);
    const staffIndex = department.staffMembers.indexOf(id);
    await Staff.findByIdAndDelete(id);
    department.staffMembers.splice(staffIndex, 1);
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
