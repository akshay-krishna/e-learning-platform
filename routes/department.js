const { Router } = require("express");
const admin = require("../middleware/admin");
const Classroom = require("../models/Classroom");
const Department = require("../models/Department");

const router = Router();
router.use(admin);

router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    if (!departments) return res.sendStatus(404);
    res.json({ departments });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * Create a new department
 */
router.post("/", async (req, res) => {
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
 * get all the info of a specific department
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id)
      .populate("classrooms staffMembers studentMembers", "-password")
      .exec();
    if (!department) return res.sendStatus(404);
    res.json({ department });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

// create a classroom under the department given by the id parameter
router.post("/:id/classroom", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const classroom = new Classroom({
      name,
      department: id,
    });
    const department = await Department.findById(id);
    department.classrooms.push(classroom.id);
    await department.save();
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
