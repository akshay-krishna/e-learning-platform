const { Router } = require("express");

// helpers
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");

// models
const Student = require("../models/Student");
const Staff = require("../models/Staff");

const router = Router(); //initialize the router

/**
 *  *authenticate a student
 *  @method POST
 *  ?route --> /auth/student
 *  @param {eduMail, password}
 *  @access public
 */

router.post("/students", async (req, res) => {
  const { eduMail, password } = req.body;
  try {
    const student = await Student.findOne({ eduMail });
    if (!student) return res.sendStatus(404);

    const isValidPassword = student.isValidPassword(password);
    if (!isValidPassword) return res.sendStatus(401);

    const payload = await genPayload(student);
    const token = await genToken(payload);
    payload.exp = undefined;
    payload.sub = undefined;
    payload.iat = undefined;

    payload.deptId = student.department;
    payload.cid = student.classroom;
    res.json({ token, id: student.id, ...payload });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *authenticate a staff
 *  @method POST
 *  ?route --> /auth/staff
 *  @param {eduMail, password}
 *  @access public
 */

router.post("/staffs", async (req, res) => {
  const { eduMail, password } = req.body;
  try {
    const staff = await Staff.findOne({ eduMail: eduMail });
    if (!staff) return res.sendStatus(404);
    const isValidPassword = await staff.isValidPassword(password);
    if (!isValidPassword) return res.sendStatus(401);

    const payload = await genPayload(staff);
    const token = await genToken(payload);
    payload.exp = undefined;
    payload.sub = undefined;
    payload.iat = undefined;
    payload.deptId = staff.department;
    payload.homeroom = staff.homeroom;
    res.json({ token, id: staff.id, ...payload });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
