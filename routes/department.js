const { Router } = require("express");
const admin = require("../middleware/admin");
const deptHead = require("../middleware/deptHead");

// models
const Department = require("../models/Department");

const router = Router(); //initialize the router

/**
 *  *get all the departments
 *  @method GET
 *  ?route --> /departments
 *  @param none
 *  @access admin
 */

router.get("/", admin, async (req, res) => {
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
 *  *Create a new department
 *  @method POST
 *  ?route --> /departments
 *  @param {name: <department name>}
 *  @access admin
 */

router.post("/", admin, async (req, res) => {
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
 *  *get all the info of a specific department
 *  @method GET
 *  ?route --> /departments/:id
 *  @param none
 *  @access private
 */

router.get("/:id", deptHead, async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id)
      .populate({
        path: "staffMembers studentMembers classrooms head",
        select: "name eduMail",
      })
      .exec();
    if (!department) return res.sendStatus(404);
    res.json({ department });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *set department head
 *  @method PUT
 *  ?route --> /departments/:id/head
 *  @param {head: <id of staff>}
 */

router.put("/:id/head", async (req, res) => {
  const { id } = req.params;
  const { staffId } = req.body;
  try {
    const isDepartmentMember = await Department.exists({
      _id: id,
      staffMembers: staffId,
    });
    if (!isDepartmentMember) return res.sendStatus(400);
    const department = await Department.findById(id);
    department.head = staffId;
    await department.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * TODO: delete a department
 */

module.exports = router;
