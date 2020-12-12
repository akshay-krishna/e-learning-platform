const { Router } = require("express");
const admin = require("../middleware/admin");
const Classroom = require("../models/Classroom");

const router = Router();

// get the details of a particular classroom
router.get("/:cid", admin, async (req, res) => {
  const { cid } = req.params;
  try {
    const classroom = await Classroom.findById(cid)
      .populate("department", "name")
      .populate("staffMembers studentMembers", "-password")
      .exec();
    res.json({ classroom });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Add staffs to the classroom
router.put("/:cid/staffs", admin, async (req, res) => {
  const { staffs } = req.body;
  const { cid } = req.params;
  try {
    const classroom = await Classroom.findById(cid);
    staffs.forEach((staff) => {
      classroom.staffMembers.push(staff);
    });
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// Add students to the classroom
router.put("/:cid/students", admin, async (req, res) => {
  const { students } = req.body;
  const { cid } = req.params;
  try {
    const classroom = await Classroom.findById(cid);
    students.forEach((student) => {
      classroom.studentMembers.push(student);
    });
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
