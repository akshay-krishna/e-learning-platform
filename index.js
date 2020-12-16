const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// create a connection to the database

require("dotenv").config();
require("./config/db")();
require("./config/initDb")();

app.use("/auth", require("./routes/auth"));
app.use("/departments", require("./routes/department"));
app.use("/departments/:id/staffs", require("./routes/staff"));
app.use("/departments/:id/students", require("./routes/student"));
app.use("/departments/:id/classrooms", require("./routes/classroom"));
app.use("/classrooms/:cid/feeds", require("./routes/feeds"));

app.listen(PORT, () => console.log(`The server started on port ${PORT}`));
