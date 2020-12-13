const { Router } = require("express");
const auth = require("../middleware/auth");
const Staff = require("../models/Staff");

const router = Router();

router.use(auth);

/**
 *  *get a staff info
 *  @method GET
 *  ?route --> /staffs/:id
 *  @param none
 *  @access private
 */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const staff = await Staff.findById(id, "-password");
    if (!staff) return res.sendStatus(404);
    res.json({ staff });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *update a staff
 *  @method PUT
 *  ?route --> /staffs/:id
 *  @param {body: contains the required updated data}
 *  @access private
 *  TODO: Change the use from the department collection too.
 */

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await Staff.findByIdAndUpdate(id, body);
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
 *  *delete a staff
 *  @method DELETE
 *  ?route --> /classrooms/:id
 *  @param none
 *  @access private
 *  TODO: delete the user from the department too
 */
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Staff.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
