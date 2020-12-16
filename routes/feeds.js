const { Router } = require("express");
const auth = require("../middleware/auth");
const Feed = require("../models/Feed");
const Classroom = require("../models/Classroom");
const Reply = require("../models/Reply");

const router = Router();

// /**
//  *  *get all the feeds
//  *  @method GET
//  *  ?route --> /classrooms/feeds
//  *  @param {cid: ObjectId}
//  *  @access private
//  */
// router.get("/", auth, async (req, res) => {
//   try {
//     const feeds = await Feed.find({}, "-replies")
//       .populate({ path: "author", select: "name" })
//       .exec();
//     res.json({ feeds });
//   } catch (err) {
//     console.error(err.message);
//     res.sendStatus(500);
//   }
// });

/**
 *  *create a feed
 *  @method POST
 *  ?route --> /feeds
 *  @param {title: String, body: String, cid: objectId}
 *  @access private
 */

router.post("/", auth, async (req, res) => {
  const { title, body, cid } = req.body;
  const { uid, isStaff } = req;

  // const data = {
  //   title,
  //   body,
  //   author: uid,
  // };

  // if (isStaff) {
  //   data.onModel = "staffs";
  // }

  // const feed = new Feed(data);
  // try {
  //   const classroom = await Classroom.findById(cid);
  //   classroom.feeds.push = feed.id;
  //   await feed.save();
  //   await classroom.save();
  // } catch (err) {
  //   console.error(err.message);
  //   res.sendStatus(500);
  // }
  res.sendStatus(200);
});

// /**
//  *  *get a feed
//  *  @method GET
//  *  ?route --> /feeds/:id
//  *  @access auth
//  */

// router.get("/:id", auth, async (req, res) => {
//   const { id } = req.params;

//   try {
//     const feed = await Feed.findById(id, "-onModel");
//     res.json({ feed });
//   } catch (err) {
//     console.error(err.message);
//     res.sendStatus(500);
//   }
// });

// /**
//  *  *update a feed
//  *  @method PUT
//  *  ?route --> /feeds/:id
//  *  @access auth
//  */

// /**
//  *  *delete feed
//  *  @method DELETE
//  *  ?route --> /feeds/:id
//  *  @access auth
//  *  TODO: feed delete route
//  */

// // Feed replies

// /**
//  *  *get all the replies to a feed
//  */

// router.get("/:fid/reply", auth, async (req, res) => {
//   const { fid } = req.params;
//   try {
//     const replies = await Feed.findById(fid, "replies")
//       .populate({
//         path: "replies",
//         populate: {
//           path: "author",
//           select: "eduMail name",
//           populate: {
//             path: "department",
//             select: "name",
//           },
//         },
//       })
//       .exec();
//     res.json({ replies });
//   } catch (err) {
//     console.error(err.message);
//     res.sendStatus(500);
//   }
// });

// /**
//  *  *create a feed reply
//  *  @method POST
//  *  ?route --> /feeds/:fid/reply
//  *  @access auth
//  */

// router.post("/:fid/reply", auth, async (req, res) => {
//   const { body } = req.body;
//   const { uid, isStaff } = req;
//   const { fid } = req.params;
//   const data = {
//     body,
//     author: uid,
//   };
//   if (isStaff) {
//     data.onModel = "staffs";
//   }
//   const reply = new Reply(data);
//   try {
//     const feed = await Feed.findById(fid);
//     if (!feed) return res.sendStatus(404);
//     feed.replies.push(reply.id);
//     await reply.save();
//     await feed.save();
//     res.sendStatus(200);
//   } catch (err) {
//     console.error(err.message);
//     res.sendStatus(500);
//   }
// });

module.exports = router;
