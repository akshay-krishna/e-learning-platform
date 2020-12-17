const { Router } = require("express");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const Feed = require("../models/Feed");

const router = Router({ mergeParams: true });

router.post("/", auth, async (req, res) => {
  const { comment } = req.body;
  const { isStaff, uid } = req;
  const { fid } = req.params;
  const data = {
    body: comment,
    author: uid,
  };
  if (isStaff) {
    data.onModel = "staffs";
  } else {
    data.onModel = "students";
  }

  const newComment = new Comment(data);
  try {
    await newComment.save();
    const { comment } = await Feed.findById(fid);
    await Feed.findByIdAndUpdate(fid, { comment: [...comment, newComment.id] });
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
