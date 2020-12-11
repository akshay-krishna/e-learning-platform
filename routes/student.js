const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const Student = require("../models/Student");

const router = Router();

/**
 * Create a student
 * TODO: Make it such that only an admin can create students
 */
router.post("/", async (req, res) => {
  const { name, password, eduMail } = req.body;

  try {
    const student = new Student({
      eduMail,
      name,
      password,
    });
    const savedStudent = await student.save();
    const payload = genPayload(savedStudent);
    const token = await genToken(payload);
    res.json({ token, id: savedStudent.id });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 ** Get the id of a student
 * TODO: Make it such that only an authenticated student can access their data
 */
router.get("/:id", async (req, res) => {
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
 * *update a specific user
 * TODO: Make it such that only an authenticated user can updated their data
 */

router.put("/:id", async (req, res) => {
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
 * *Delete a specific user
 * TODO: Make it that only an admin can delete a user
 */

router.delete("/:id", async (req, res) => {
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
