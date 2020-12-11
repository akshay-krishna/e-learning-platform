const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const router = Router();

/**
 * * authenticate a student
 * @param {eduMail, password}
 */

router.post("/student", async (req, res) => {
  const { eduMail, password } = req.body;
  try {
    const student = await Student.findOne({ eduMail });
    if (!student) return res.sendStatus(404);

    const isValidPassword = student.isValidPassword(password);
    if (!isValidPassword) return res.sendStatus(401);

    const payload = genPayload(student);
    const token = await genToken(payload);
    res.json({ token, id: student.id });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * *authenticate a staff
 *
 */
router.post("/staff", async (req, res) => {
  const { eduMail, password } = req.body;
  try {
    const staff = await Staff.findOne({ eduMail });
    if (!staff) return res.sendStatus(404);

    const isValidPassword = await staff.isValidPassword(password);
    if (!isValidPassword) return res.sendStatus(404);

    const payload = genPayload(staff);
    const token = await genToken(payload);
    res.json({ token, id: staff.id });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
