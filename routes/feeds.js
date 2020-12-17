const { Router } = require("express");
const auth = require("../middleware/auth");
const Feed = require("../models/Feed");
const Classroom = require("../models/Classroom");

const router = Router({ mergeParams: true });

/**
 *  *get all the feeds
 *  @method GET
 *  ?route --> /classrooms/:cid/feeds
 *  @param {cid: ObjectId}
 *  @access private
 */

router.get("/", auth, async (req, res) => {
  const { cid } = req.params;
  try {
    const feedList = await Classroom.findById(cid, "feeds");
    const feeds = await Feed.find({
      _id: {
        $in: feedList.feeds,
      },
    })
      .populate({ path: "author", select: "name eduMail" })
      .exec();

    res.json({ feeds });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *create a feed
 *  @method POST
 *  ?route --> /feeds
 *  @param {title: String, body: String, cid: objectId}
 *  @access private
 */

router.post("/", auth, async (req, res) => {
  const { title, body } = req.body;
  const { cid } = req.params;
  const { uid, isStaff } = req;

  const data = {
    title,
    body,
    author: uid,
  };

  if (isStaff) {
    data.onModel = "staffs";
  } else {
    data.onModel = "students";
  }

  const feed = new Feed(data);
  try {
    const classroom = await Classroom.findById(cid);
    if (!classroom) return res.sendStatus(404);
    classroom.feeds.push(feed.id);
    await feed.save();
    await classroom.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *get a feed
 *  @method GET
 *  ?route --> /feeds/:id
 *  @access auth
 */

router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const feed = await Feed.findById(id)
      .populate({ path: "author", select: "name eduMail" })
      .populate({
        path: "comment",
        populate: {
          path: "author",
          populate: "author",
          select: "name eduMail",
        },
      })
      .exec();
    res.json({ feed });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

/**
 *  *update a feed
 *  @method PUT
 *  ?route --> /feeds/:id
 *  @access auth
 */

// router.put("/:id", auth, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feed = await Feed.findById
//   } catch (err) {

//   }
// });

/**
 *  *delete feed
 *  @method DELETE
 *  ?route --> /feeds/:id
 *  @access auth
 *  TODO: feed delete route
 */

module.exports = router;
