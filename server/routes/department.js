const { Router } = require("express");
const admin = require("../middleware/admin");
const deptHead = require("../middleware/deptHead");
const Classroom = require("../models/Classroom");

// models
const Department = require("../models/Department");
const Staff = require("../models/Staff");
const Student = require("../models/Student");

const router = Router(); //initialize the router

/**
 *  *get all the departments
 *  @method GET
 *  ?route --> /departments
 *  @param none
 *  @access admin
 */

router.get("/", admin, async (req, res) => {
  try {
    const departments = await Department.find({ name: { $ne: "root" } });
    if (!departments) return res.sendStatus(404);
    console.log(departments);
    res.json({ departments });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Create a new department
 *  @method POST
 *  ?route --> /departments
 *  @param {name: <department name>}
 *  @access admin
 */

router.post("/", admin, async (req, res) => {
  let { name } = req.body;
  name = name.toLowerCase();
  try {
    const isPresent = await Department.exists({ name });
    if (isPresent) return res.sendStatus(409);
    const department = new Department({ name });
    await department.save();
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *get all the info of a specific department
 *  @method GET
 *  ?route --> /departments/:id
 *  @param none
 *  @access deptHead
 */

router.get("/:id", deptHead, async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id)
      .populate({
        path: "staffMembers studentMembers classrooms head",
        select: "name eduMail description",
      })
      .exec();
    if (!department) return res.sendStatus(404);
    res.json({ department });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *update a department
 *  @method PUT
 *  ?route --> /departments/:id/
 *  @param {body: <update data>}
 */

router.put("/:id", deptHead, async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    await Department.findByIdAndUpdate(id, body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *set department head
 *  @method PUT
 *  ?route --> /departments/:id/head
 *  @param {head: <id of staff>}
 *  @access admin
 */

router.put("/:id/head", admin, async (req, res) => {
  const { id } = req.params;
  const { staffId } = req.body;
  try {
    const isDepartmentMember = await Department.exists({
      _id: id,
      staffMembers: staffId,
    });
    if (!isDepartmentMember) return res.sendStatus(400);
    const department = await Department.findById(id);
    department.head = staffId;
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *delete a department
 *  @method DELETE
 *  ?route --> /departments/:id
 *  @param none
 *  @access admin
 */

router.delete("/:id", admin, async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    if (!department) return res.sendStatus(404);
    await Student.deleteMany({ department: id });
    await Staff.deleteMany({ department: id });
    await Classroom.deleteMany({ department: id });
    await Department.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
