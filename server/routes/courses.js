const { Router } = require("express");
const deptHead = require("../middleware/deptHead");
const Classroom = require("../models/Classroom");
const Course = require("../models/Course");
const router = Router({ mergeParams: true });

// get all courses under a classroom
router.get("/", async (req, res) => {
  const { cid } = req.params;
  try {
    const courses = await Classroom.findById(cid, "courses")
      .populate("courses")
      .exec();

    if (!courses) return res.sendStatus(404);
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// create a course
router.post("/", deptHead, async (req, res) => {
  const { cid } = req.params;
  const { course } = req.body;
  try {
    const classroom = await Classroom.findById(cid);
    if (!classroom) return res.sendStatus(404);

    const newCourse = await Course.create(course);
    classroom.courses.push(newCourse.id);

    await newCourse.save();
    await classroom.save();

    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// get a specific course
router.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) return res.sendStatus(404);

    res.json({ course });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// update a course
router.put("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const { body } = req;
  try {
    await Course.findByIdAndUpdate(courseId, body);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// delete a course
router.delete("/:courseId", async (req, res) => {
  const { cid, courseId } = req.params;

  try {
    const classroom = await Classroom.findById(cid);
    if (!classroom) return res.sendStatus(404);

    const courseIndex = classroom.courses.indexOf(courseId);
    classroom.courses.splice(courseIndex, 1);
    await Course.findByIdAndDelete(courseId);
    await classroom.save();
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
