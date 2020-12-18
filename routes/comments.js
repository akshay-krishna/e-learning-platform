const { Router } = require("express");

// middleware
const auth = require("../middleware/auth");

// models
const Comment = require("../models/Comment");
const Feed = require("../models/Feed");

const router = Router({ mergeParams: true }); //initialize the router

/**
 *  *create a comment for feed
 *  @method POST
 *  ?route --> /classrooms/:cid/feeds/:fid/comments
 *  @param {comment}
 *  @access auth
 */

router.post("/", auth, async (req, res) => {
  const { comment } = req.body;
  const { isStaff, uid } = req;
  const { fid } = req.params;
  const data = {
    body: comment,
    author: uid,
    feed: fid,
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
    res.sendStatus(201);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *get a specific comment
 *  @method POST
 *  ?route --> /classrooms/:cid/feeds/:fid/comments/:id
 *  @param none
 *  @access auth
 */

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const comments = await Comment.findById(id)
      .populate({
        path: "author",
        select: "name eduMail",
      })
      .exec();
    res.json({ comments });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *updated a specific comment
 *  @method PUT
 *  ?route --> /classrooms/:cid/feeds/:fid/comments/:id
 *  @param {comment}
 *  @access auth
 */

router.put("/:id", auth, async (req, res) => {
  const { update } = req.body;
  const { id } = req.params;
  const { uid } = req;
  try {
    const isOwner = await Comment.exists({ _id: id, author: uid });
    if (!isOwner) return res.sendStatus(401);
    await Comment.findByIdAndUpdate(id, update);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *delete a comment
 *  @method DELETE
 *  ?route --> /classrooms/:cid/feeds/:fid/comments/:id
 *  @param none
 *  @access auth
 */

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { uid } = req;
  try {
    const isOwner = await Comment.exists({ _id: id, author: uid });
    if (!isOwner) return res.sendStatus(401);
    await Comment.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

module.exports = router;
