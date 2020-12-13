const { Router } = require("express");
const admin = require("../middleware/admin");
const classCharge = require("../middleware/classCharge");
const Classroom = require("../models/Classroom");

const router = Router();

/**
 *  *get all the classrooms
 *  @method GET
 *  ?route -->/classrooms
 *  @param none
 *  @access private
 */

router.get("/", admin, async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    if (!classrooms) return res.sendStatus(404);
    res.json({ classrooms });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *get the details of a particular classroom
 *  @method GET
 *  ?route --> /classrooms/:cid
 *  @param none
 *  @access private
 */

router.get("/:cid", classCharge, async (req, res) => {
  const { cid } = req.params;
  try {
    const classroom = await Classroom.findById(cid)
      .populate("department", "name")
      .populate("staffMembers studentMembers homeRoomTeacher", "-password")
      .exec();
    res.json({ classroom });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Add staffs to the classroom
 *  @method PUT
 *  ?route --> /classrooms/:cid/staffs
 *  @param {staffs: <array of staffs id>}
 *  @access private
 */

router.put("/:cid/staffs", async (req, res) => {
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

/**
 *  *Add students to the classroom
 *  @method PUT
 *  ?route --> /classrooms/:cid/students
 *  @param {students: <array of students id>}
 *  @access private
 */

router.put("/:cid/students", async (req, res) => {
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
