const { Router } = require("express");
const saveToDb = require("../helpers/saveToDb");

// middleware
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

// models
const Department = require("../models/Department");
const Student = require("../models/Student");

const router = Router(); //initialize the route

/**
 *  *get all students
 *  @method GET
 *  ?route --> /students
 *  @param none
 *  @access private
 */

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
 *  *Create a student
 *  @method POST
 *  ?route --> /students
 *  @param {deptId: <id of department>, studentList: [<{name, password, eduMail}>]}
 *  @access private
 */

router.post("/", admin, async (req, res) => {
  const { studentList, deptId } = req.body;
  try {
    const department = await Department.findById(deptId);
    if (!department) return res.sendStatus(404);
    const savedStudents = studentList.map((student) => {
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
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *Get a student info
 *  @method GET
 *  ?route --> /students/:id
 *  @param none
 *  @access private
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
 *  ?route --> /students/:id
 *  @param {body: contains the required updated data}
 *  @access private
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
 *  ?route --> /students/:id
 *  @param none
 *  @access private
 *  TODO: delete the user from the department too
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
