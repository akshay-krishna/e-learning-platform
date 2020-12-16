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
 *  ?route --> /departments/:id/students
 *  @param none
 *  @access private
 */

router.get("/", admin, async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.find({ department: id }, "-password");
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
 *  ?route --> /departments/:id/students
 *  @param {studentList: [<{name, password, eduMail}>]}
 *  @access private
 */

router.post("/", admin, async (req, res) => {
  const { id } = req.params;
  const { studentList } = req.body;
  try {
    const department = await Department.findById(id);
    if (!department) return res.sendStatus(404);
    const savedStudents = studentList.map((student) => {
      const { name, password, eduMail } = student;
      const newStudent = new Student({
        eduMail,
        name,
        password,
        department: id,
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
 *  ?route --> /departments/:id/students/:sid
 *  @param none
 *  @access private
 */

router.get("/:sid", auth, async (req, res) => {
  const { sid } = req.params;
  try {
    const student = await Student.findById(sid, "-password");
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
 *  ?route --> /departments/:id/students/:sid
 *  @param {body: contains the required updated data}
 *  @access private
 */

router.put("/:sid", auth, async (req, res) => {
  const { sid } = req.params;
  const { body } = req;
  try {
    await Student.findByIdAndUpdate(sid, body);
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
 *  ?route --> /departments/:id/students/:sid
 *  @param none
 *  @access private
 *  TODO: delete the user from the department too
 */

router.delete("/:sid", auth, async (req, res) => {
  const { sid } = req.params;
  try {
    await Student.findByIdAndDelete(sid);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
