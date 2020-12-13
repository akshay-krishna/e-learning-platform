const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");
const router = Router();

/**
 *  *authenticate a student
 *  @method POST
 *  ?route --> /auth/student
 *  @param {eduMail, password}
 *  @access public
 */

router.post("/student", async (req, res) => {
  const { eduMail, password } = req.body;
  try {
    const student = await Student.findOne({ eduMail });
    if (!student) return res.sendStatus(404);

    const isValidPassword = student.isValidPassword(password);
    if (!isValidPassword) return res.sendStatus(401);

    const payload = await genPayload(student);
    const token = await genToken(payload);
    res.json({ token, id: student.id });
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

router.post("/staff", async (req, res) => {
  const { eduMail, password } = req.body;
  try {
    const staff = await Staff.findOne({ eduMail });
    if (!staff) return res.sendStatus(404);

    const isValidPassword = await staff.isValidPassword(password);
    if (!isValidPassword) return res.sendStatus(401);

    const payload = await genPayload(staff);
    const token = await genToken(payload);
    res.json({ token, id: staff.id });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
