const { Router } = require("express");
const saveToDb = require("../helpers/saveToDb");

// middleware
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

// models
const Department = require("../models/Department");
const Staff = require("../models/Staff");

const router = Router(); //initialize the router

/**
 *  *get all the staffs
 *  @method GET
 *  ?route --> /staffs
 *  @param none
 *  @access private
 */

router.get("/", admin, async (req, res) => {
  try {
    const staffs = await Staff.find({}, "-password");
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
 *  ?route --> /staffs
 *  @param {deptId: <id of department>, staffList: [<{name, password, eduMail}>]}
 *  @access private
 */

router.post("/", admin, async (req, res) => {
  const { staffList, deptId } = req.body;

  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const savedStaffs = staffList.map((staff) => {
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
 *  ?route --> /staffs/:id
 *  @param none
 *  @access private
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
 *  ?route --> /staffs/:id
 *  @param {body: contains the required updated data}
 *  @access private
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
 *  ?route --> /classrooms/:id
 *  @param none
 *  @access private
 *  TODO: delete the user from the department too
 */
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
