const { connect } = require("mongoose");

/**
 * create a connection to the database
 */
const connectDb = async () => {
  try {
    await connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("connected to the DB.....");
  } catch (err) {
    console.error("Failed to connect to the database");
    throw Error(err);
  }
};

module.exports = connectDb;
