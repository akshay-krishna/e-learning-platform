const { Router } = require("express");
const saveToDb = require("../helpers/saveToDb");

// middleware
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

// models
const Department = require("../models/Department");
const Student = require("../models/Student");

const router = Router({ mergeParams: true }); //initialize the route

/**
 *  *get all students
 *  @method GET
 *  ?route --> /departments/:deptId/students
 *  @param none
 *  @access admin
 */

router.get("/", admin, async (req, res) => {
  const { deptId } = req.params;
  try {
    const students = await Student.find({ department: deptId }, "-password");
    if (!students) return res.sendStatus(404);
    res.json({ students });
  } catch (error) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Create a student
 *  @method POST
 *  ?route --> /departments/:deptId/students
 *  @param {list: [<{name, password, eduMail}>]}
 *  @access admin
 */

router.post("/", admin, async (req, res) => {
  const { deptId } = req.params;
  const { list } = req.body;
  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const savedStudents = list.map((student) => {
      const { name, password, eduMail } = student;
      const newStudent = new Student({
        eduMail,
        name,
        password,
        department: deptId,
      });
      saveToDb(newStudent);
      return newStudent.id;
    });
    department.studentMembers.push(...savedStudents);
    const savedDept = await department.save();
    res.json({ savedDept });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Get a student info
 *  @method GET
 *  ?route --> /departments/:deptId/students/:id
 *  @param none
 *  @access auth
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
 *  *update a specific student
 *  @method PUT
 *  ?route --> /departments/:deptId/students/:id
 *  @param {body: contains the required updated data}
 *  @access auth
 *  TODO: only allow a student to update only his/her data
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
 *  *Delete a specific student
 *  @method DELETE
 *  ?route --> /departments/:deptId/students/:id
 *  @param none
 *  @access admin
 */

router.delete("/:id", admin, async (req, res) => {
  const { deptId, id } = req.params;
  try {
    const department = await Department.findById(deptId);
    const studentIndex = department.studentMembers.indexOf(id);

    await Student.findByIdAndDelete(id);
    department.studentMembers.splice(studentIndex, 1);
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
