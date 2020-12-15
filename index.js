const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// create a connection to the database

require("dotenv").config();
require("./config/db")();
require("./config/initDb")();

app.use("/auth", require("./routes/auth"));
app.use("/students", require("./routes/student"));
app.use("/staffs", require("./routes/staff"));
app.use("/departments", require("./routes/department"));
app.use("/classrooms", require("./routes/classroom"));

app.listen(PORT, () => console.log(`The server started on port ${PORT}`));
