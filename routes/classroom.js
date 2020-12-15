const { Router } = require("express");

// middleware
const classCharge = require("../middleware/classCharge");
const deptHead = require("../middleware/deptHead");
const auth = require("../middleware/auth");

// models
const Classroom = require("../models/Classroom");
const Department = require("../models/Department");

const router = Router(); //initialize the route

/**
 *  *get all the classrooms
 *  @method GET
 *  ?route -->/classrooms
 *  @param none
 *  @access private
 */

router.get("/", deptHead, async (req, res) => {
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
 *  *create a classroom
 *  @method POST
 *  ?route --> /classrooms
 *  @param {name: <classroom name>, deptId: <department under which the class is being created>}
 *  @access private
 */

router.post("/", deptHead, async (req, res) => {
  const { name, deptId } = req.body;
  try {
    const classroom = new Classroom({
      name,
      department: deptId,
    });
    const department = await Department.findById(deptId);
    department.classrooms.push(classroom.id);
    await classroom.save();
    await department.save();
    res.sendStatus(200);
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

router.get("/:cid", auth, async (req, res) => {
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

router.put("/:cid/staffs", deptHead, async (req, res) => {
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

router.put("/:cid/students", classCharge, async (req, res) => {
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

/**
 *  *set the homeroom teacher
 *  @method PUT
 *  ?route --> /classrooms/:cid/homeroom
 *  @param {staffId: <id of staff>}
 *  @access private
 */

router.put("/:cid/homeroom", deptHead, async (req, res) => {
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
 * TODO: delete a classroom
 */

module.exports = router;
