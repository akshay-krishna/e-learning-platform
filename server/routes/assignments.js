const { Router } = require("express");
const auth = require("../middleware/auth");
const Assignments = require("../models/Assignments");
const Classroom = require("../models/Classroom");
const router = Router({ mergeParams: true });

// get all assignments
router.get("/", auth, async (req, res) => {
  const { cid } = req.params;
  try {
    const assignments = await Classroom.findById(cid, "assignments")
      .populate("assignments")
      .exec();
    if (!assignments) return res.sendStatus(404);

    res.json(assignments);
  } catch (err) {}
});

// create an assignments
router.post("/", auth, async (req, res) => {
  const { cid } = req.params;
  const { title, description, due } = req.body;
  try {
    const classroom = await Classroom.findById(cid);
    if (!classroom) return res.sendStatus(404);
    const assignment = await Assignments.create({
      title,
      description,
      due,
      classroom: cid,
    });

    classroom.assignments.push(assignment.id);
    await assignment.save();
    await classroom.save();
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// get a specific assignment
router.get("/:aid", auth, async (req, res) => {
  const { aid } = req.params;
  try {
    const assignment = await Assignments.findById(aid);
    res.json({ assignment });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// update an assignment
router.put("/:aid", auth, async (req, res) => {
  const { aid } = req.params;
  const { body } = req;

  try {
    await Assignments.findByIdAndUpdate(aid, body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// delete an assignment
router.delete("/:aid", auth, async (req, res) => {
  const { cid, aid } = req.params;
  try {
    const classroom = await Classroom.findById(cid);
    if (!classroom) return res.sendStatus(404);
    const assignmentIndex = classroom.assignments.indexOf(cid);
    classroom.assignments.splice(assignmentIndex, 1);
    await Assignments.findByIdAndDelete(aid);
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});
module.exports = router;
