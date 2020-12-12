const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const Department = require("../models/Department");
const Student = require("../models/Student");

const router = Router();

//get all students
router.get("/", admin, async (req, res) => {
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
 * Create a student
 */
router.post("/:deptId", admin, async (req, res) => {
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
 ** Get the id of a student
 */
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findById(id, "-password");
    res.json({ student });
  } catch (err) {
    console.log(err.message);
    if (err.name === "CastError") {
      return res.sendStatus(404);
    }
    res.sendStatus(500);
  }
});

/**
 * *update a specific user
 */

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await Student.findByIdAndUpdate(id, body);
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
 * *Delete a specific user
 */

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
