const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const admin = require("../middleware/admin");
const Classroom = require("../models/Classroom");
const Department = require("../models/Department");
const Staff = require("../models/Staff");
const Student = require("../models/Student");
const router = Router();

router.use(admin);

/**
 * Create a student
 */

router.post("/:deptId/student", async (req, res) => {
  const { name, password, eduMail } = req.body;
  const { deptId } = req.params;
  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const student = new Student({
      eduMail,
      name,
      password,
      department: deptId,
    });
    const savedStudent = await student.save();
    department.studentMembers.push(savedStudent.id);
    await department.save();
    const payload = genPayload(savedStudent);
    const token = await genToken(payload);
    res.json({ token, id: savedStudent.id });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * *create a staff
 */
router.post("/:deptId/staff", async (req, res) => {
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
      res.status(409).json({ error: err.keyValue });
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

//get all students
router.get("/student", async (req, res) => {
  try {
    const students = await Student.find({}, "-password");
    if (!students) return res.sendStatus(404);
    res.json({ students });
  } catch (error) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * get all the staffs
 *
 */

router.get("/", async (req, res) => {
  try {
    const staffs = await Staff.find({}, "-password");
    if (!staffs) return res.sendStatus(404);
    res.json({ staffs });
  } catch (error) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// set the homeroom teacher
router.put("/:cid/homeroom", admin, async (req, res) => {
  const { cid } = req.params;
  const { teach } = req.body;
  try {
    const classroom = await Classroom.findById(cid);
    classroom.homeRoomTeacher = teach;
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
