const { Router } = require("express");
const genPayload = require("../helpers/payload");
const { genToken } = require("../helpers/token");
const auth = require("../middleware/auth");
const Staff = require("../models/Staff");

const router = Router();

/**
 * *create a staff
 */
router.post("/", async (req, res) => {
  const { name, password, eduMail } = req.body;

  try {
    const staff = new Staff({
      eduMail,
      name,
      password,
    });
    const savedStaff = await staff.save();
    const payload = genPayload(savedStaff);
    const token = await genToken(payload);

    res.json({ token, id: savedStaff.id });
  } catch (err) {
    console.error(err);
    if (err.code == 11000) {
      res.status(409).json(err.keyValue);
    }
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 * *get a staff info
 * TODO: allow only an authenticated user to access their own data
 */
router.get("/:id", auth, async (req, res) => {
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
 * *update a user
 * TODO: Only alow authenticated user to update their own data
 */
router.put("/:id", auth, async (req, res) => {
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
 * *delete a staff
 * TODO: only allow authenticated user to delete their own data
 */
router.delete("/:id", auth, async (req, res) => {
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
