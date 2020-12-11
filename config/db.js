const { connect } = require("mongoose");

const connectDb = async () => {
  try {
    await connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("connected to the DB.....");
  } catch (err) {
    console.error("Failed to connect to the database");
    throw Error(err);
  }
};

module.exports = connectDb;
