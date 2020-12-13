const { Router } = require("express");
const auth = require("../middleware/auth");
const Student = require("../models/Student");

const router = Router();

router.use(auth);

/**
 *  *Get a student info
 *  @method GET
 *  ?route --> /students/:id
 *  @param none
 *  @access private
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
 *  *update a specific student
 *  @method PUT
 *  ?route --> /students/:id
 *  @param {body: contains the required updated data}
 *  @access private
 *  TODO: update the user from the department too
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
 *  *Delete a specific student
 *  @method DELETE
 *  ?route --> /students/:id
 *  @param none
 *  @access private
 *  TODO: delete the user from the department too
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
