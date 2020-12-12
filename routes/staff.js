const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const Department = require("../models/Department");
const Staff = require("../models/Staff");

const router = Router();

/**
 * get all the staffs
 *
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
 * *create a staff
 */
router.post("/:deptId", admin, async (req, res) => {
  const { name, password, eduMail } = req.body;
  const { deptId } = req.params;
  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const staff = new Staff({
      eduMail,
      name,
      password,
      department: deptId,
    });
    const savedStaff = await staff.save();
    department.staffMembers.push(savedStaff.id);
    await department.save();
    const payload = genPayload(savedStaff);
    const token = await genToken(payload);

    res.json({ token, id: savedStaff.id });
  } catch (err) {
    console.error(err);
    if (err.code == 11000) {
      res.status(409).json(err.keyValue);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * *get a staff info
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
 * *update a user
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
 * *delete a staff
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
