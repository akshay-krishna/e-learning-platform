const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const admin = require("../middleware/admin");
const Classroom = require("../models/Classroom");
const Department = require("../models/Department");
const Staff = require("../models/Staff");
const Student = require("../models/Student");
const router = Router();

// Every path in this route is only accessible to the admin
router.use(admin);

/**
 *  *Create a student
 *  @method POST
 *  ?route --> /admins/:deptId/student
 *  @param {name: String, password: String, eduMail: String}
 *  @access private
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
    const payload = await genPayload(savedStudent);
    const token = await genToken(payload);
    res.json({ token, id: savedStudent.id });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Create a staff
 *  @method POST
 *  ?route --> /admins/:deptId/staff
 *  @param {name: String, password: String, eduMail: String}
 *  @access private
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
    const payload = await genPayload(savedStaff);
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

/**
 *  *get all students
 *  @method GET
 *  ?route --> /admins/students
 *  @param none
 *  @access private
 */

router.get("/students", async (req, res) => {
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
 *  *get all the staffs
 *  @method GET
 *  ?route --> /admins/staffs
 *  @param none
 *  @access private
 */

router.get("/staffs", async (req, res) => {
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
 *  *set the homeroom teacher
 *  @method PUT
 *  ?route --> /admins/:cid/homeroom
 *  @param {staffId: <id of staff>}
 *  @access private
 */

router.put("/:cid/homeroom", admin, async (req, res) => {
  const { cid } = req.params;
  const { staffId } = req.body;
  try {
    const classroom = await Classroom.findById(cid);
    classroom.homeRoomTeacher = staffId;
    classroom.staffMembers.push(staffId);
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *set department head
 *  @method PUT
 *  ?route --> /admins/deptId/head
 *  @param {head: <id of staff>}
 */

router.put("/:deptId/head", admin, async (req, res) => {
  const { deptId } = req.params;
  const { staffId } = req.body;
  try {
    const department = await Department.findById(deptId);
    department.head = staffId;
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
