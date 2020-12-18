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
 *  ?route -->/departments/:id/classrooms
 *  @param none
 *  @access detpHead
 */

router.get("/", deptHead, async (req, res) => {
  const { id } = req.params;
  try {
    const classrooms = await Classroom.find({ department: id });
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
 *  ?route --> /departments/:id/classrooms
 *  @param {name: <classroom name>, deptId: <department under which the class is being created>}
 *  @access deptHead
 */

router.post("/", deptHead, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const classroom = new Classroom({
      name,
      department: id,
    });
    const department = await Department.findById(id);
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
 *  ?route --> /departments/:id/classrooms/:cid
 *  @param none
 *  @access auth
 */

router.get("/:cid", auth, async (req, res) => {
  const { cid } = req.params;
  try {
    const classroom = await Classroom.findById(cid)
      .populate({
        path: "homeRoomTeacher department studentMembers staffMembers",
        select: "eduMail name",
      })
      .populate({
        path: "feeds",
        select: "title body",
      })
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
 *  ?route --> /departments/:id/classrooms/:cid/staffs
 *  @param {staffs: <array of staffs id>}
 *  @access deptHead
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
 *  ?route --> /departments/:id/classrooms/:cid/students
 *  @param {students: <array of students id>}
 *  @access classCharge
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
 *  ?route --> /departments/:id/classrooms/:cid/homeroom
 *  @param {staffId: <id of staff>}
 *  @access deptHead
 */

router.put("/:cid/homeroom", deptHead, async (req, res) => {
  const { cid } = req.params;
  const { staffId } = req.body;
  try {
    const isMemberOfClass = await Classroom.exists({
      _id: cid,
      staffMembers: staffId,
    });
    if (!isMemberOfClass) return res.sendStatus(400);
    const classroom = await Classroom.findById(cid);
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
 *  ?route --> /departments/:id/classrooms/:cid/
 *  @param none
 *  @access deptHead
 */

router.delete("/:cid", deptHead, async (req, res) => {
  const { id, cid } = req.params;

  try {
    const department = await Department.findById(id);
    if (!department) return res.sendStatus(404);
    const classIndex = department.classrooms.indexOf(cid);
    await Classroom.findByIdAndDelete(cid);
    department.classrooms.splice(classIndex, 1);
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
