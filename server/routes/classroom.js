const { Router } = require("express");

// middleware
const classCharge = require("../middleware/classCharge");
const deptHead = require("../middleware/deptHead");
const auth = require("../middleware/auth");

// models
const Classroom = require("../models/Classroom");
const Department = require("../models/Department");

const router = Router({ mergeParams: true }); //initialize the route

/**
 *  *get all the classrooms
 *  @method GET
 *  ?route -->/departments/:deptId/classrooms
 *  @param none
 *  @access deptHead
 */

router.get("/", deptHead, async (req, res) => {
  const { deptId } = req.params;
  try {
    const classrooms = await Classroom.find({ department: deptId });
    if (!classrooms) return res.sendStatus(404);
    res.json({ classrooms });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *create a classroom
 *  @method POST
 *  ?route --> /departments/:deptId/classrooms
 *  @param {name: <classroom name>}
 *  @access deptHead
 */

router.post("/", deptHead, async (req, res) => {
  const { deptId } = req.params;
  const { name } = req.body.list[0];
  try {
    const classroom = new Classroom({
      name,
      department: deptId,
    });
    const department = await Department.findById(deptId);
    department.classrooms.push(classroom.id);
    await classroom.save();
    await department.save();
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *get the details of a particular classroom
 *  @method GET
 *  ?route --> /departments/:deptId/classrooms/:id
 *  @param none
 *  @access auth
 */

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const classroom = await Classroom.findById(id)
      .populate({
        path: "homeRoomTeacher department studentMembers",
        select: "name",
      })
      .populate({
        path: "feeds",
        select: "title body",
      })
      .populate({
        path: "courses",
        populate: { path: "teach", select: "name" },
      })
      .exec();
    res.json({ classroom });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *update classroom
 *  @method PUT
 *  ?route --> /departments/:deptId/classrooms/:id
 *  @param {body: <update data>}
 *  @access private
 */

router.put("/:id", classCharge, async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;

  try {
    await Classroom.findByIdAndUpdate(id, body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Create a course under the classroom
 *  @method PUT
 *  ?route --> /departments/:deptId/classrooms/:id/courses
 *  @param {staffs: <array of staffs id>}
 *  @access deptHead
 */

router.put("/:id/courses", deptHead, async (req, res) => {
  const { course } = req.body;
  const { id, deptId } = req.params;
  try {
    const classroom = await Classroom.findById(id);
    classroom.courses.push(course);
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
 *  ?route --> /departments/:deptId/classrooms/:id/students
 *  @param {students: <array of students id>}
 *  @access classCharge
 */

router.put("/:id/students", classCharge, async (req, res) => {
  const { students } = req.body;
  const { id } = req.params;
  try {
    const classroom = await Classroom.findById(id);
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

/**
 *  *set the homeroom teacher
 *  @method PUT
 *  ?route --> /departments/:deptId/classrooms/:id/homeroom
 *  @param {staffId: <id of staff>}
 *  @access deptHead
 */

router.put("/:id/homeroom", deptHead, async (req, res) => {
  const { id } = req.params;
  const { staffId } = req.body;
  try {
    const isMemberOfClass = await Classroom.exists({
      _id: id,
      staffMembers: staffId,
    });
    if (!isMemberOfClass) return res.sendStatus(400);
    const classroom = await Classroom.findById(id);
    classroom.homeRoomTeacher = staffId;
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *delete a classroom
 *  @method DELETE
 *  ?route --> /departments/:deptId/classrooms/:id/
 *  @param none
 *  @access deptHead
 */

router.delete("/:id", deptHead, async (req, res) => {
  const { id, deptId } = req.params;
  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const classIndex = department.classrooms.indexOf(id);
    await Classroom.findByIdAndDelete(id);
    department.classrooms.splice(classIndex, 1);
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
