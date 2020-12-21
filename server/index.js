const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
// create a connection to the database

require("dotenv").config();
require("./config/db")();
require("./config/initDb")();

const PORT = process.env.PORT || 5500;

app.use("/auth", require("./routes/auth"));
app.use("/departments", require("./routes/department"));
app.use("/departments/:deptId/staffs", require("./routes/staff"));
app.use("/departments/:deptId/students", require("./routes/student"));
app.use("/departments/:deptId/classrooms", require("./routes/classroom"));
app.use("/classrooms/:cid/feeds", require("./routes/feeds"));
app.use("/classrooms/:cid/feeds", require("./routes/feeds"));
app.use("/classrooms/:cid/feeds/:fid/comments", require("./routes/comments"));

app.listen(PORT, () => console.log(`The server started on port ${PORT}`));
